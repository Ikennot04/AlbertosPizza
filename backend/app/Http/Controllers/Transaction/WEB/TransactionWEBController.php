<?php

namespace App\Http\Controllers\Transaction\WEB;

use App\Http\Controllers\Controller;
use App\Infrastructure\Persistence\Eloquent\Sales\SalesModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionWEBController extends Controller
{
    public function index($user_id)
    {
        $transactions = SalesModel::where('user_id', $user_id)
            ->where(function($query) {
                $query->where('status', '!=', 'cancelled')
                      ->orWhereNull('status');
            })
            ->orderBy('created_at', 'desc')
            ->get();
        return view('Pages.Transaction.index', compact('transactions'));
    }

    public function edit($transaction)
    {
        $transaction = SalesModel::findOrFail($transaction);
        $products = DB::table('product')
            ->where('userID', $transaction->user_id)
            ->whereNull('deleted_at')
            ->select('product_id', 'product_name', 'product_price', 'product_stock')
            ->get();

        return response()->json([
            'transaction' => $transaction,
            'products' => $products
        ]);
    }

    public function update(Request $request, $transaction)
    {
        try {
            DB::beginTransaction();

            $transaction = SalesModel::findOrFail($transaction);
            $oldOrderList = json_decode($transaction->order_list, true);
            $newOrderList = [];

            // Return stock from old quantities
            foreach ($oldOrderList as $oldItem) {
                DB::table('product')
                    ->where('product_name', $oldItem['name'])
                    ->where('userID', $transaction->user_id)
                    ->increment('product_stock', $oldItem['quantity']);
            }

            // Update existing items
            foreach ($request->items as $index => $item) {
                $oldItem = $oldOrderList[$index];
                $newOrderList[] = [
                    'name' => $oldItem['name'],
                    'price' => $oldItem['price'],
                    'quantity' => $item['quantity']
                ];

                // Deduct new quantity from stock
                DB::table('product')
                    ->where('product_name', $oldItem['name'])
                    ->where('userID', $transaction->user_id)
                    ->decrement('product_stock', $item['quantity']);
            }

            // Add new items if any
            if ($request->new_items) {
                foreach ($request->new_items as $item) {
                    if ($item['quantity'] > 0) {
                        $product = DB::table('product')
                            ->where('product_id', $item['product_id'])
                            ->first();

                        if ($product->product_stock < $item['quantity']) {
                            throw new \Exception("Insufficient stock for {$product->product_name}");
                        }

                        $newOrderList[] = [
                            'name' => $product->product_name,
                            'price' => $product->product_price,
                            'quantity' => $item['quantity']
                        ];

                        // Deduct new item quantity from stock
                        DB::table('product')
                            ->where('product_id', $item['product_id'])
                            ->decrement('product_stock', $item['quantity']);
                    }
                }
            }

            // Recalculate total order
            $totalOrder = 0;
            $totalQuantity = 0;
            foreach ($newOrderList as $item) {
                $totalOrder += $item['price'] * $item['quantity'];
                $totalQuantity += $item['quantity'];
            }

            $transaction->order_list = json_encode($newOrderList);
            $transaction->total_order = $totalOrder;
            $transaction->quantity = $totalQuantity;
            $transaction->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Transaction updated successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Error updating transaction: ' . $e->getMessage()
            ], 500);
        }
    }

    public function cancel($id)
    {
        try {
            $transaction = SalesModel::findOrFail($id);

            // Return stock to inventory
            $orderList = json_decode($transaction->order_list, true);
            foreach ($orderList as $item) {
                DB::table('product')
                    ->where('product_name', $item['name'])
                    ->where('userID', $transaction->user_id)
                    ->increment('product_stock', $item['quantity']);
            }

            // Update transaction status
            $transaction->status = 'cancelled';
            $transaction->save();

            return response()->json([
                'success' => true,
                'message' => 'Transaction cancelled successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error cancelling transaction: ' . $e->getMessage()
            ], 500);
        }
    }
}
