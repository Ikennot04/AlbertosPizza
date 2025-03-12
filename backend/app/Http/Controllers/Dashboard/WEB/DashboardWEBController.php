<?php

namespace App\Http\Controllers\Dashboard\WEB;

use App\Http\Controllers\Controller;
use App\Infrastructure\Persistence\Eloquent\Sales\SalesModel;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DashboardWEBController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $today = Carbon::today();

        // Daily Sales (excluding cancelled)
        $dailySales = SalesModel::where('user_id', $userId)
            ->where('status', '!=', 'cancelled')
            ->whereDate('created_at', $today)
            ->selectRaw('DATE(created_at) as date, SUM(total_order) as total_sales')
            ->groupBy('date')
            ->get();

        // Weekly Sales (excluding cancelled)
        $weeklySales = SalesModel::where('user_id', $userId)
            ->where('status', '!=', 'cancelled')
            ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
            ->selectRaw('DATE(created_at) as date, SUM(total_order) as total_sales')
            ->groupBy('date')
            ->get();

        // Monthly Sales (excluding cancelled)
        $monthlySales = SalesModel::where('user_id', $userId)
            ->where('status', '!=', 'cancelled')
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->selectRaw('DATE(created_at) as date, SUM(total_order) as total_sales')
            ->groupBy('date')
            ->get();

        // Yearly Sales (excluding cancelled)
        $yearlySales = SalesModel::where('user_id', $userId)
            ->where('status', '!=', 'cancelled')
            ->whereYear('created_at', Carbon::now()->year)
            ->selectRaw('DATE(created_at) as date, SUM(total_order) as total_sales')
            ->groupBy('date')
            ->get();

        return view('Pages.Dashboard.index', compact('dailySales', 'weeklySales', 'monthlySales', 'yearlySales'));
    }
}
