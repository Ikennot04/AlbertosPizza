<?php

namespace App\Http\Controllers\Transaction\WEB;

use App\Http\Controllers\Controller;
use App\Infrastructure\Persistence\Eloquent\Sales\SalesModel;
use Illuminate\Support\Facades\Auth;

class CancelledTransactionController extends Controller
{
    public function index()
    {
        $cancelledTransactions = SalesModel::where('user_id', Auth::id())
            ->where('status', 'cancelled')
            ->orderBy('created_at', 'desc')
            ->get();

        return view('Pages.CancelledTransaction.index', compact('cancelledTransactions'));
    }
}