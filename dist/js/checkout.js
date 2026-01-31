/* ============================================
   Velocity Vault Checkout System
   Multi-Payment Processor Support
   ============================================ */

// PAYMENT CONFIGURATION
// ⚠️ REPLACE THESE WITH YOUR REAL CREDENTIALS ⚠️
const PAYMENT_CONFIG = {
    stripe: {
        publishableKey: 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE', // Get from stripe.com/dashboard
        enabled: true
    },
    paypal: {
        clientId: 'YOUR_PAYPAL_CLIENT_ID_HERE', // Get from paypal.com/developer
        enabled: true
    },
    cashapp: {
        cashtag: '$VelocityVault', // Your Cash App username
        enabled: true
    }
};

class CheckoutSystem {
    constructor() {
        this.checkoutData = this.loadCheckoutData();
        this.selectedPaymentMethod = 'stripe';
        this.stripe = null;
        this.cardElement = null;

        this.init();
    }

    // Initialize checkout system
    init() {
        if (!this.checkoutData || !this.checkoutData.items || this.checkoutData.items.length === 0) {
            this.showEmptyCart();
            return;
        }

        this.renderOrderSummary();
        this.setupPaymentMethodToggle();
        this.initializeStripe();
        this.initializePayPal();
        this.initializeCashApp();
    }

    // Load checkout data from localStorage
    loadCheckoutData() {
        const data = localStorage.getItem('velocityVaultCheckout');
        return data ? JSON.parse(data) : null;
    }

    // Show empty cart message
    showEmptyCart() {
        document.querySelector('.container').innerHTML = `
            <div class="alert alert-warning text-center my-5">
                <h3><i class="fas fa-exclamation-triangle"></i> Your cart is empty</h3>
                <p>Please add items to your cart before checking out.</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
    }

    // Render order summary
    renderOrderSummary() {
        const { items, subtotal, tax, shipping, discount, total } = this.checkoutData;

        // Render items
        const itemsContainer = document.getElementById('order-items');
        itemsContainer.innerHTML = items.map(item => `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <strong>${item.name}</strong><br>
                    <small class="text-muted">Qty: ${item.quantity}</small>
                </div>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        // Update summary values
        document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('summary-tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('summary-shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
        document.getElementById('cashapp-amount').textContent = `$${total.toFixed(2)}`;

        if (discount > 0) {
            const discountAmount = subtotal * discount;
            document.getElementById('discount-row').style.display = 'flex';
            document.getElementById('summary-discount').textContent = `-$${discountAmount.toFixed(2)}`;
        }
    }

    // Setup payment method toggle
    setupPaymentMethodToggle() {
        const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');

        paymentMethods.forEach(method => {
            method.addEventListener('change', (e) => {
                this.selectedPaymentMethod = e.target.value;
                this.togglePaymentForms(e.target.value);
            });
        });

        // Initialize first payment method
        this.togglePaymentForms('stripe');
    }

    // Toggle payment forms
    togglePaymentForms(method) {
        document.getElementById('stripe-payment').style.display = method === 'stripe' ? 'block' : 'none';
        document.getElementById('paypal-payment').style.display = method === 'paypal' ? 'block' : 'none';
        document.getElementById('cashapp-payment').style.display = method === 'cashapp' ? 'block' : 'none';
    }

    // Initialize Stripe
    initializeStripe() {
        if (!PAYMENT_CONFIG.stripe.enabled) return;

        try {
            this.stripe = Stripe(PAYMENT_CONFIG.stripe.publishableKey);
            const elements = this.stripe.elements();

            this.cardElement = elements.create('card', {
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#32325d',
                        '::placeholder': {
                            color: '#aab7c4'
                        }
                    },
                    invalid: {
                        color: '#fa755a',
                        iconColor: '#fa755a'
                    }
                }
            });

            this.cardElement.mount('#card-element');

            // Handle real-time validation errors
            this.cardElement.on('change', (event) => {
                const displayError = document.getElementById('card-errors');
                if (event.error) {
                    displayError.textContent = event.error.message;
                } else {
                    displayError.textContent = '';
                }
            });

            // Handle form submission
            document.getElementById('stripe-submit-btn').addEventListener('click', () => {
                this.processStripePayment();
            });
        } catch (error) {
            console.error('Stripe initialization error:', error);
            alert('Stripe is not configured. Please add your publishable key in checkout.js');
        }
    }

    // Process Stripe payment
    async processStripePayment() {
        const btn = document.getElementById('stripe-submit-btn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

        // Validate customer info
        const customerInfo = this.getCustomerInfo();
        if (!customerInfo) {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-lock"></i> Pay Securely with Stripe';
            return;
        }

        try {
            // In production, you need a backend to create a payment intent
            // For now, this is a client-side demo
            alert('⚠️ DEMO MODE\n\nTo accept real payments:\n1. Set up a backend server\n2. Create Stripe Payment Intent on server\n3. Add your Stripe publishable key\n4. Complete the payment flow\n\nOrder would be: $' + this.checkoutData.total.toFixed(2));

            // Simulate success
            this.completeOrder('stripe', 'DEMO_' + Date.now());

        } catch (error) {
            console.error('Payment error:', error);
            document.getElementById('card-errors').textContent = error.message;
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-lock"></i> Pay Securely with Stripe';
        }
    }

    // Initialize PayPal
    initializePayPal() {
        if (!PAYMENT_CONFIG.paypal.enabled) return;

        try {
            paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: this.checkoutData.total.toFixed(2),
                                currency_code: 'USD',
                                breakdown: {
                                    item_total: { value: this.checkoutData.subtotal.toFixed(2), currency_code: 'USD' },
                                    tax_total: { value: this.checkoutData.tax.toFixed(2), currency_code: 'USD' },
                                    shipping: { value: this.checkoutData.shipping.toFixed(2), currency_code: 'USD' }
                                }
                            },
                            description: 'Velocity Vault - SE Bikes Order',
                            items: this.checkoutData.items.map(item => ({
                                name: item.name,
                                unit_amount: { value: item.price.toFixed(2), currency_code: 'USD' },
                                quantity: item.quantity.toString()
                            }))
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        this.completeOrder('paypal', details.id);
                    });
                },
                onError: (err) => {
                    console.error('PayPal error:', err);
                    alert('Payment failed. Please try again or use a different payment method.');
                }
            }).render('#paypal-button-container');
        } catch (error) {
            console.error('PayPal initialization error:', error);
        }
    }

    // Initialize Cash App
    initializeCashApp() {
        if (!PAYMENT_CONFIG.cashapp.enabled) return;

        document.getElementById('cashapp-submit-btn').addEventListener('click', () => {
            const customerInfo = this.getCustomerInfo();
            if (!customerInfo) return;

            const confirmed = confirm(
                `Have you sent $${this.checkoutData.total.toFixed(2)} to ${PAYMENT_CONFIG.cashapp.cashtag}?\n\n` +
                `Please include your order number in the payment note!\n\n` +
                `We'll verify your payment and process your order.`
            );

            if (confirmed) {
                this.completeOrder('cashapp', 'PENDING_VERIFICATION');
            }
        });
    }

    // Get customer info from form
    getCustomerInfo() {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
        const state = document.getElementById('state').value.trim();
        const zip = document.getElementById('zip').value.trim();

        if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zip) {
            alert('Please fill in all required fields.');
            return null;
        }

        return {
            firstName, lastName, email, phone,
            address, city, state, zip,
            address2: document.getElementById('address2').value.trim()
        };
    }

    // Complete order
    completeOrder(paymentMethod, transactionId) {
        const customerInfo = this.getCustomerInfo();
        const orderNumber = 'VV' + Date.now();

        const orderData = {
            orderNumber,
            transactionId,
            paymentMethod,
            customer: customerInfo,
            items: this.checkoutData.items,
            pricing: {
                subtotal: this.checkoutData.subtotal,
                tax: this.checkoutData.tax,
                shipping: this.checkoutData.shipping,
                discount: this.checkoutData.discount,
                total: this.checkoutData.total
            },
            timestamp: new Date().toISOString(),
            status: paymentMethod === 'cashapp' ? 'pending_payment' : 'processing'
        };

        // Save order to localStorage (in production, send to backend)
        const orders = JSON.parse(localStorage.getItem('velocityVaultOrders') || '[]');
        orders.push(orderData);
        localStorage.setItem('velocityVaultOrders', JSON.stringify(orders));

        // Send order confirmation email (implement backend endpoint)
        this.sendOrderConfirmation(orderData);

        // Clear cart
        localStorage.removeItem('velocityVaultCart');
        localStorage.removeItem('velocityVaultCheckout');

        // Redirect to confirmation page
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        window.location.href = 'order-confirmation.html';
    }

    // Send order confirmation (implement backend)
    sendOrderConfirmation(orderData) {
        // In production, send this to your backend API
        console.log('Order confirmation:', orderData);

        // Example backend call:
        /*
        fetch('/api/orders/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        */
    }
}

// Initialize checkout when page loads
document.addEventListener('DOMContentLoaded', () => {
    const checkout = new CheckoutSystem();
});
