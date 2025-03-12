@extends('Layout.app')
@section('title', 'Transactions')
@include('Components.NaBar.navbar')
@section('content')
    <div class="container-fluid py-4" style="background-color: #fff8e7; min-height: calc(100vh - 56px);">
        <div class="row">
            <!-- Main Transaction Table -->
            <div class="col-md-8">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="text-brown mb-0">Transaction History</h2>
                    <div class="d-flex gap-3">
                        <input type="text" id="searchInput" class="form-control" placeholder="Search transactions..."
                            style="width: 250px;">
                        <select id="sortOrder" class="form-select" style="width: 150px;">
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                </div>

                @if (count($transactions) > 0)
                    @foreach ($transactions as $transaction)
                        <div class="card shadow-sm mb-3">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h5 class="mb-1">
                                            <span class="badge bg-success ms-2">Completed</span>
                                            <button onclick="confirmCancel({{ $transaction->id }})"
                                                class="btn btn-sm btn-danger ms-2">
                                                <i class="fas fa-ban"></i> Cancel
                                            </button>
                                            <button onclick="openEditModal({{ $transaction->id }})"
                                                class="btn btn-sm btn-outline-brown ms-2">
                                                <i class="fas fa-edit"></i> Edit
                                            </button>
                                        </h5>
                                        <p class="text-muted mb-0">
                                            {{ $transaction->created_at->setTimezone('Asia/Manila')->format('M d, Y h:i A') }}
                                        </p>
                                    </div>
                                    <h5 class="text-success mb-0">₱{{ number_format($transaction->total_order, 2) }}</h5>
                                </div>

                                <div class="mt-3">
                                    <h6 class="mb-2">Order Details:</h6>
                                    <div class="table-responsive">
                                        <table class="table table-sm">
                                            <thead class="table-light">
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Qty</th>
                                                    <th>Price</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                @php
                                                    $orderList = json_decode($transaction->order_list, true);
                                                @endphp
                                                @foreach ($orderList as $item)
                                                    <tr>
                                                        <td>{{ $item['name'] }}</td>
                                                        <td>{{ $item['quantity'] }}</td>
                                                        <td>₱{{ number_format($item['price'], 2) }}</td>
                                                        <td>₱{{ number_format($item['price'] * $item['quantity'], 2) }}</td>
                                                    </tr>
                                                @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                    <p class="text-muted mb-0">Total Items: {{ $transaction->quantity }}</p>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @else
                    <div class="text-center py-5">
                        <i class="fas fa-receipt fa-3x text-muted mb-3"></i>
                        <h3 class="text-muted">No transactions found</h3>
                        <p class="text-muted">Transactions will appear here once sales are made.</p>
                    </div>
                @endif
            </div>

            <!-- Summary Section -->
            <div class="col-md-4">
                <div class="card shadow-lg border-0">
                    <div class="card-header bg-brown text-white py-3">
                        <h3 class="mb-0">Transaction Summary</h3>
                    </div>
                    <div class="card-body">
                        @php
                            $totalSales = 0;
                            $totalItems = 0;

                            foreach ($transactions as $transaction) {
                                $totalSales += $transaction->total_order;
                                $totalItems += $transaction->quantity;
                            }
                        @endphp

                        <div class="summary-item mb-4">
                            <h4 class="text-brown">Total Transactions</h4>
                            <p class="h2 mb-0">{{ count($transactions) }}</p>
                        </div>

                        <div class="summary-item mb-4">
                            <h4 class="text-brown">Total Revenue</h4>
                            <p class="h2 mb-0">₱{{ number_format($totalSales, 2) }}</p>
                        </div>

                        <div class="summary-item">
                            <h4 class="text-brown">Total Items Sold</h4>
                            <p class="h2 mb-0">{{ number_format($totalItems) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Transaction Modal -->
    <div class="modal fade" id="editTransactionModal" tabindex="-1" aria-labelledby="editTransactionModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="card-header bg-brown text-white">
                    <h3 class="mb-0">Edit Transaction</h3>
                </div>
                <div class="card-body">
                    <form id="editTransactionForm" method="POST">
                        @csrf
                        @method('PUT')

                        <div class="mb-4">
                            <h5>Current Order Items:</h5>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead class="table-light">
                                        <tr>
                                            <th>Item</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody id="currentOrderItems">
                                        <!-- Items will be populated via JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="mb-4">
                            <h5>Add New Items:</h5>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead class="table-light">
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Available Stock</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody id="availableProducts">
                                        <!-- Products will be populated via JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between">
                            <button type="button" class="btn btn-outline-brown" data-bs-dismiss="modal">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                            <button type="submit" class="btn btn-brown">
                                <i class="fas fa-save"></i> Update Transaction
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Cancel Transaction Modal -->
    <div class="modal fade" id="cancelTransactionModal" tabindex="-1" aria-labelledby="cancelTransactionModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="cancelTransactionModalLabel">Cancel Transaction</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to cancel this transaction?.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" id="confirmCancelButton">Cancel Transaction</button>
                </div>
            </div>
        </div>
    </div>

    <style>
        .bg-brown {
            background-color: #6b4226;
        }

        .text-brown {
            color: #6b4226;
        }

        .card {
            border-radius: 10px;
            border: none;
        }

        .summary-item {
            padding: 15px;
            border-radius: 10px;
            background-color: #fff8e7;
        }

        .summary-item h4 {
            font-size: 1.1rem;
            margin-bottom: 8px;
        }

        .table th {
            font-weight: 600;
            color: #4b3025;
        }

        .badge {
            padding: 0.5em 0.75em;
        }

        .form-control,
        .form-select {
            border-color: #d4b8a5;
        }

        .form-control:focus,
        .form-select:focus {
            border-color: #6b4226;
            box-shadow: 0 0 0 0.2rem rgba(107, 66, 38, 0.25);
        }

        .btn-brown {
            background-color: #6b4226;
            color: white;
            border: none;
        }

        .btn-brown:hover {
            background-color: #4b3025;
            color: white;
        }

        .btn-sm {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            border-radius: 0.2rem;
        }

        .btn-outline-brown {
            color: #6b4226;
            border-color: #6b4226;
        }

        .btn-outline-brown:hover {
            color: #fff;
            background-color: #6b4226;
            border-color: #6b4226;
        }
    </style>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('searchInput');
            const sortOrder = document.getElementById('sortOrder');
            const transactionCards = document.querySelectorAll('.card.shadow-sm.mb-3');
            const transactionContainer = transactionCards[0]?.parentElement;

            function filterAndSortTransactions() {
                const searchTerm = searchInput.value.toLowerCase();
                const isNewest = sortOrder.value === 'newest';

                let visibleTransactions = Array.from(transactionCards).filter(card => {
                    const orderDetails = card.textContent.toLowerCase();
                    return orderDetails.includes(searchTerm);
                });

                // Sort transactions
                visibleTransactions.sort((a, b) => {
                    const dateA = new Date(a.querySelector('.text-muted').textContent.trim());
                    const dateB = new Date(b.querySelector('.text-muted').textContent.trim());
                    return isNewest ? dateB - dateA : dateA - dateB;
                });

                // Clear and re-append sorted/filtered transactions
                transactionCards.forEach(card => card.style.display = 'none');
                visibleTransactions.forEach(card => {
                    card.style.display = 'block';
                    transactionContainer.appendChild(card);
                });
            }

            searchInput.addEventListener('input', filterAndSortTransactions);
            sortOrder.addEventListener('change', filterAndSortTransactions);
        });

        function openEditModal(transactionId) {
            // Reset form
            document.getElementById('editTransactionForm').reset();

            // Update form action URL
            const form = document.getElementById('editTransactionForm');
            form.action = `/transaction/${transactionId}`;

            // Fetch transaction details and products
            fetch(`/transaction/${transactionId}/edit`)
                .then(response => response.json())
                .then(data => {
                    // Populate current order items
                    const orderItems = JSON.parse(data.transaction.order_list);
                    const currentOrderItemsHtml = orderItems.map((item, index) => `
                        <tr id="order-row-${index}">
                            <td>${item.name}</td>
                            <td>
                                <div class="d-flex align-items-center gap-2">
                                    <input type="number" name="items[${index}][quantity]"
                                        value="${item.quantity}" class="form-control form-control-sm"
                                        min="0" style="width: 80px"
                                        onchange="updateSubtotal(${index}, this.value, ${item.price})">
                                    <button type="button" class="btn btn-sm btn-danger"
                                        onclick="removeOrderItem(${index})">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </td>
                            <td>₱${parseFloat(item.price).toFixed(2)}</td>
                            <td id="subtotal-${index}">₱${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    `).join('');
                    document.getElementById('currentOrderItems').innerHTML = currentOrderItemsHtml;

                    // Populate available products
                    const productsHtml = data.products.map(product => `
                        <tr>
                            <td>${product.product_name}</td>
                            <td>₱${parseFloat(product.product_price).toFixed(2)}</td>
                            <td>${product.product_stock}</td>
                            <td>
                                <input type="number" name="new_items[${product.product_id}][quantity]"
                                    value="0" class="form-control form-control-sm"
                                    min="0" max="${product.product_stock}">
                                <input type="hidden" name="new_items[${product.product_id}][product_id]"
                                    value="${product.product_id}">
                            </td>
                        </tr>
                    `).join('');
                    document.getElementById('availableProducts').innerHTML = productsHtml;
                });

            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('editTransactionModal'));
            modal.show();
        }

        document.getElementById('editTransactionForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const form = this;
            const formData = new FormData(form);

            fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        'Accept': 'application/json'
                    },
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Close modal
                        bootstrap.Modal.getInstance(document.getElementById('editTransactionModal')).hide();
                        // Refresh page to show updated data
                        location.reload();
                    } else {
                        alert(data.message || 'Error updating transaction');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while updating the transaction');
                });
        });

        let transactionToCancel = null;

        function confirmCancel(transactionId) {
            transactionToCancel = transactionId;
            const modal = new bootstrap.Modal(document.getElementById('cancelTransactionModal'));
            modal.show();
        }

        document.getElementById('confirmCancelButton').addEventListener('click', function() {
            if (transactionToCancel) {
                fetch(`/transaction/${transactionToCancel}/cancel`, {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: transactionToCancel
                        })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.success) {
                            // Close the modal
                            bootstrap.Modal.getInstance(document.getElementById('cancelTransactionModal'))
                                .hide();
                            // Show success message and reload
                            alert('Transaction cancelled successfully');
                            location.reload();
                        } else {
                            alert(data.message || 'Error canceling transaction');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('An error occurred while canceling the transaction');
                    });
            }
        });

        function updateSubtotal(index, quantity, price) {
            if (quantity <= 0) {
                removeOrderItem(index);
                return;
            }

            const subtotalElement = document.getElementById(`subtotal-${index}`);
            const subtotal = quantity * price;
            subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
        }

        function removeOrderItem(index) {
            const row = document.getElementById(`order-row-${index}`);
            if (row) {
                // Actually remove the row from the DOM
                row.remove();

                // Create a hidden input to track removed items
                const form = document.getElementById('editTransactionForm');
                const removedInput = document.createElement('input');
                removedInput.type = 'hidden';
                removedInput.name = `removed_items[]`;
                removedInput.value = index;
                form.appendChild(removedInput);
            }
        }
    </script>
@endsection
