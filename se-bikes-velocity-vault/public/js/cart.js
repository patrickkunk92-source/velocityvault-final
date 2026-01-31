/* ============================================
   SE Bikes - Velocity Vault Cart System
   Shopping Cart Functionality with LocalStorage
   ============================================ */

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.initializeEventListeners();
        this.updateCartUI();
    }

    // Load cart from localStorage
    loadCart() {
        const saved = localStorage.getItem('velocityVaultCart');
        return saved ? JSON.parse(saved) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('velocityVaultCart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(id, name, price, quantity = 1, referralCode = null) {
        const existingItem = this.items.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id,
                name,
                price: parseFloat(price),
                quantity,
                referralCode: referralCode || this.getReferralCode(),
                addedDate: new Date().toISOString()
            });
        }

        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${name} added to cart!`, 'success');
    }

    // Remove item from cart
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartUI();
    }

    // Update item quantity
    updateQuantity(id, quantity) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(id);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Get cart subtotal
    getSubtotal() {
        return this.getTotal();
    }

    // Calculate tax (8% default)
    getTax(taxRate = 0.08) {
        return this.getSubtotal() * taxRate;
    }

    // Calculate shipping (free over $100)
    getShipping() {
        const subtotal = this.getSubtotal();
        if (subtotal >= 100) return 0;
        if (subtotal >= 50) return 5.99;
        return 9.99;
    }

    // Get final total with tax and shipping
    getFinalTotal(taxRate = 0.08) {
        return this.getSubtotal() + this.getTax(taxRate) + this.getShipping();
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
    }

    // Get referral code (for monetization)
    getReferralCode() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('ref') || 'direct';
    }

    // Apply coupon/discount code
    applyCoupon(code) {
        const coupons = {
            'VELOCITY10': 0.10,
            'VAULT15': 0.15,
            'SPEED20': 0.20,
            'BIKES25': 0.25
        };
        
        if (coupons[code.toUpperCase()]) {
            localStorage.setItem('velocityVaultCoupon', code.toUpperCase());
            this.showNotification(`Coupon ${code} applied!`, 'success');
            return coupons[code.toUpperCase()];
        } else {
            this.showNotification('Invalid coupon code', 'danger');
            return 0;
        }
    }

    // Get applied coupon discount
    getCouponDiscount() {
        const coupon = localStorage.getItem('velocityVaultCoupon');
        const coupons = {
            'VELOCITY10': 0.10,
            'VAULT15': 0.15,
            'SPEED20': 0.20,
            'BIKES25': 0.25
        };
        return coupon && coupons[coupon] ? coupons[coupon] : 0;
    }

    // Update UI elements
    updateCartUI() {
        // Update cart count
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
        }

        // Update cart page if visible
        const cartContainer = document.getElementById('cart-container');
        if (cartContainer) {
            this.renderCartItems();
            this.renderCartSummary();
        }
    }

    // Render cart items
    renderCartItems() {
        const container = document.getElementById('cart-items');
        if (!container) return;

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="alert alert-info text-center">
                    <h4>Your cart is empty</h4>
                    <p>Continue shopping to add items to your cart.</p>
                    <a href="products.html" class="btn btn-primary">Continue Shopping</a>
                </div>
            `;
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="images/bike${item.id}.jpg" alt="${item.name}" class="cart-item-image" onerror="this.src='images/placeholder.jpg'">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <small class="text-muted">Ref: ${item.referralCode}</small>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-qty" data-id="${item.id}">−</button>
                    <input type="number" class="form-control qty-input" value="${item.quantity}" min="1" max="99" data-id="${item.id}" style="width: 60px; text-align: center;">
                    <button class="quantity-btn increase-qty" data-id="${item.id}">+</button>
                </div>
                <button class="btn btn-danger btn-sm cart-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        this.attachCartEventListeners();
    }

    // Render cart summary
    renderCartSummary() {
        const summary = document.getElementById('cart-summary');
        if (!summary) return;

        const subtotal = this.getSubtotal();
        const tax = this.getTax();
        const shipping = this.getShipping();
        const couponDiscount = this.getCouponDiscount();
        const discountAmount = subtotal * couponDiscount;
        const total = subtotal - discountAmount + tax + shipping;

        summary.innerHTML = `
            <h4><i class="fas fa-shopping-cart"></i> Cart Summary</h4>
            <div class="summary-row">
                <span>Subtotal:</span>
                <strong>$${subtotal.toFixed(2)}</strong>
            </div>
            ${couponDiscount > 0 ? `
                <div class="summary-row" style="color: var(--success);">
                    <span>Discount (${(couponDiscount * 100).toFixed(0)}%):</span>
                    <strong>-$${discountAmount.toFixed(2)}</strong>
                </div>
            ` : ''}
            <div class="summary-row">
                <span>Shipping:</span>
                <strong>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</strong>
            </div>
            <div class="summary-row">
                <span>Tax (8%):</span>
                <strong>$${tax.toFixed(2)}</strong>
            </div>
            <div class="summary-row total">
                <span>TOTAL:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            
            <div style="margin-top: 1.5rem;">
                <div class="form-group">
                    <label for="coupon-input" class="form-label">Apply Coupon Code</label>
                    <div style="display: flex; gap: 0.5rem;">
                        <input type="text" id="coupon-input" class="form-control" placeholder="e.g., VELOCITY10">
                        <button class="btn btn-outline-primary" id="apply-coupon-btn" style="white-space: nowrap;">Apply</button>
                    </div>
                </div>
            </div>

            <button class="btn btn-primary btn-lg w-100 mt-3" id="checkout-btn">
                <i class="fas fa-lock"></i> Proceed to Checkout
            </button>
            <button class="btn btn-outline-primary w-100 mt-2" id="continue-shopping-btn">
                <i class="fas fa-arrow-left"></i> Continue Shopping
            </button>
        `;

        this.attachSummaryEventListeners();
    }

    // Attach event listeners to cart items
    attachCartEventListeners() {
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = this.items.find(i => i.id === id);
                if (item) this.updateQuantity(id, item.quantity + 1);
            });
        });

        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = this.items.find(i => i.id === id);
                if (item) this.updateQuantity(id, item.quantity - 1);
            });
        });

        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = parseInt(e.target.dataset.id);
                const quantity = parseInt(e.target.value) || 1;
                this.updateQuantity(id, Math.max(1, quantity));
            });
        });

        document.querySelectorAll('.cart-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('button').dataset.id);
                this.removeItem(id);
            });
        });
    }

    // Attach event listeners to cart summary
    attachSummaryEventListeners() {
        const applyCouponBtn = document.getElementById('apply-coupon-btn');
        const couponInput = document.getElementById('coupon-input');

        if (applyCouponBtn) {
            applyCouponBtn.addEventListener('click', () => {
                const code = couponInput.value.trim();
                if (code) {
                    this.applyCoupon(code);
                }
            });
        }

        if (couponInput) {
            couponInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    applyCouponBtn.click();
                }
            });
        }

        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.proceedToCheckout();
            });
        }

        const continueBtn = document.getElementById('continue-shopping-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => {
                window.location.href = 'products.html';
            });
        }
    }

    // Proceed to checkout (integration point)
    proceedToCheckout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty!', 'warning');
            return;
        }

        // Prepare checkout data
        const checkoutData = {
            items: this.items,
            subtotal: this.getSubtotal(),
            tax: this.getTax(),
            shipping: this.getShipping(),
            discount: this.getCouponDiscount(),
            total: this.getFinalTotal(),
            timestamp: new Date().toISOString()
        };

        // Save to localStorage for checkout page
        localStorage.setItem('velocityVaultCheckout', JSON.stringify(checkoutData));

        // Redirect to checkout (or payment provider)
        // This can be extended to integrate with Shopify, Stripe, PayPal, etc.
        window.location.href = 'checkout.html';
    }

    // Show notification
    showNotification(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle"></i> ${message}
        `;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '80px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '9999';
        alertDiv.style.minWidth = '300px';
        alertDiv.style.animation = 'slideInDown 0.3s ease';

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    // Initialize event listeners on page load
    initializeEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // Add to cart buttons
            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    const name = e.target.dataset.name;
                    const price = parseFloat(e.target.dataset.price);
                    this.addItem(id, name, price);
                });
            });

            // Cart link
            const cartLink = document.getElementById('cart-link');
            if (cartLink) {
                cartLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = 'cart.html';
                });
            }
        });
    }
}

// Initialize cart on page load
const velocityVaultCart = new ShoppingCart();
