/* ============================================
   SE Bikes - Velocity Vault Main JavaScript
   General Functionality & Utilities
   ============================================ */

// Velocity Vault Main App
class VelocityVault {
    constructor() {
        this.init();
        this.setupScrollEffects();
        this.setupResponsive();
    }

    // Initialize app
    init() {
        this.setupNavbar();
        this.setupReferralTracking();
        this.setupAnalytics();
        this.setupContactForm();
        this.setupProductDetail();
    }

    // Setup navbar functionality
    setupNavbar() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        // Update active nav link based on current page
        window.addEventListener('load', () => {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(255, 107, 53, 0.15)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Setup referral tracking (monetization)
    setupReferralTracking() {
        // Get referral code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');

        if (refCode) {
            // Store referral code in session
            sessionStorage.setItem('velocityVaultRef', refCode);
            
            // Track to analytics
            this.trackEvent('referral_click', {
                ref_code: refCode,
                timestamp: new Date().toISOString()
            });

            // Show referral notification
            this.showReferralNotification(refCode);
        }

        // Add referral links to affiliate buttons
        document.querySelectorAll('[data-affiliate]').forEach(link => {
            const platform = link.dataset.affiliate;
            const ref = refCode || 'direct';
            this.addAffiliateLink(link, platform, ref);
        });
    }

    // Add affiliate link based on platform
    addAffiliateLink(element, platform, refCode) {
        const affiliateLinks = {
            'amazon': `https://www.amazon.com/s?k=bicycle&tag=velocityvault-20&ref=${refCode}`,
            'ebay': `https://www.ebay.com/sch/i.html?_nkw=bicycle&_affsub=${refCode}`,
            'shopify': `https://velocity-vault-bikes.myshopify.com?ref=${refCode}`,
            'walmart': `https://www.walmart.com/search?q=bicycle&ref=${refCode}`,
            'bestbuy': `https://www.bestbuy.com/site/searchpage.jsp?st=bicycle&ref=${refCode}`
        };

        if (affiliateLinks[platform]) {
            element.href = affiliateLinks[platform];
            element.target = '_blank';
            element.rel = 'noopener noreferrer';
        }
    }

    // Show referral notification
    showReferralNotification(refCode) {
        const notification = document.createElement('div');
        notification.className = 'alert alert-info';
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            left: 20px;
            right: 20px;
            max-width: 500px;
            z-index: 9999;
            animation: slideInDown 0.3s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-link"></i> 
            <strong>Referral Code Applied: ${refCode.toUpperCase()}</strong>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">You're earning commission on this purchase!</p>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideInUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Setup analytics tracking
    setupAnalytics() {
        // Track page view
        this.trackPageView();

        // Track user interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                this.trackEvent('add_to_cart', {
                    product_id: e.target.dataset.id,
                    product_name: e.target.dataset.name,
                    price: e.target.dataset.price
                });
            }

            if (e.target.classList.contains('btn-primary') || e.target.closest('.btn-primary')) {
                const button = e.target.classList.contains('btn-primary') ? e.target : e.target.closest('.btn-primary');
                if (button && !button.classList.contains('add-to-cart')) {
                    this.trackEvent('button_click', {
                        button_text: button.textContent.trim()
                    });
                }
            }
        });
    }

    // Track page view
    trackPageView() {
        const data = {
            page: window.location.pathname,
            timestamp: new Date().toISOString(),
            referrer: document.referrer,
            userAgent: navigator.userAgent
        };

        // Send to analytics (local storage for now)
        const analytics = JSON.parse(localStorage.getItem('velocityVaultAnalytics') || '[]');
        analytics.push({...data, type: 'pageview'});
        localStorage.setItem('velocityVaultAnalytics', JSON.stringify(analytics.slice(-100))); // Keep last 100
    }

    // Track event
    trackEvent(eventName, eventData = {}) {
        const data = {
            event: eventName,
            ...eventData,
            timestamp: new Date().toISOString()
        };

        const analytics = JSON.parse(localStorage.getItem('velocityVaultAnalytics') || '[]');
        analytics.push({...data, type: 'event'});
        localStorage.setItem('velocityVaultAnalytics', JSON.stringify(analytics.slice(-100)));

        // Log to console in development
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            console.log('Event:', eventName, eventData);
        }
    }

    // Setup contact form
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Collect form data
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                phone: document.getElementById('contact-phone').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value,
                timestamp: new Date().toISOString()
            };

            // Validate email
            if (!this.validateEmail(formData.email)) {
                this.showAlert('Please enter a valid email address', 'danger');
                return;
            }

            // Store locally and show success
            const contacts = JSON.parse(localStorage.getItem('velocityVaultContacts') || '[]');
            contacts.push(formData);
            localStorage.setItem('velocityVaultContacts', JSON.stringify(contacts));

            // Track event
            this.trackEvent('contact_form_submit', {
                subject: formData.subject
            });

            // Show success message
            this.showAlert('Thank you! Your message has been received. We\'ll be in touch soon!', 'success');

            // Reset form
            contactForm.reset();

            // In production, send email via service
            await this.sendContactEmail(formData);
        });
    }

    // Send contact email (integration point)
    async sendContactEmail(formData) {
        // This would integrate with a backend service or email API
        // Examples: SendGrid, Mailgun, AWS SES, or custom backend
        
        try {
            // Example: Send to backend endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).catch(() => {
                // Offline or endpoint not available - that's ok for now
                console.log('Email API not available - form data saved locally');
            });

            if (response && response.ok) {
                console.log('Email sent successfully');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    // Setup product detail page
    setupProductDetail() {
        const productId = this.getProductIdFromURL();
        if (!productId) return;

        if (productManager) {
            const product = productManager.getProductById(productId);
            if (product) {
                this.renderProductDetail(product);
                this.renderRelatedProducts(productId);
            }
        }
    }

    // Render product detail
    renderProductDetail(product) {
        const container = document.getElementById('product-detail-container');
        if (!container) return;

        const relatedProducts = productManager ? productManager.getRelatedProducts(product.id) : [];

        container.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="product-gallery">
                        <div class="product-main-image">
                            <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
                        </div>
                        <div class="product-thumbnails">
                            <div class="product-thumb" style="background: #f5f5f5; display: flex; align-items: center; justify-content: center;">
                                <img src="${product.image}" alt="${product.name}" style="height: 100%; width: 100%; object-fit: cover;">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="product-info">
                        <span class="speed-indicator"><i class="fas fa-bolt"></i> Velocity Vault Exclusive</span>
                        <h1 style="font-size: 2.2rem; margin-bottom: 1rem;">${product.name}</h1>
                        
                        <div class="product-rating">
                            <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                            <span>${product.rating} / 5.0 (${product.reviews} reviews)</span>
                        </div>

                        <div class="product-sku">
                            <strong>SKU:</strong> ${product.sku}
                        </div>

                        <h2 style="font-size: 2rem; color: var(--primary-accent); margin-bottom: 1.5rem; border: none;">$${product.price.toFixed(2)}</h2>

                        <p class="product-description">${product.description}</p>

                        <div class="product-specs">
                            <h5><i class="fas fa-cog"></i> Specifications</h5>
                            ${Object.entries(product.specs).map(([key, value]) => `
                                <div class="spec-item">
                                    <strong style="text-transform: capitalize;">${key}:</strong>
                                    <span>${value}</span>
                                </div>
                            `).join('')}
                        </div>

                        <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                            <button class="btn btn-primary btn-lg add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" style="flex: 1;">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                            <button class="btn btn-outline-primary btn-lg" id="wishlist-btn" style="width: 60px;">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>

                        <div style="background: #f5f5f5; padding: 1.5rem; border-radius: 8px;">
                            <h5 style="margin-bottom: 1rem;"><i class="fas fa-shipping-fast"></i> Free Shipping</h5>
                            <p style="margin-bottom: 0.5rem;">🚚 Free shipping on orders over $100</p>
                            <p style="margin-bottom: 0.5rem;">✅ 30-day return guarantee</p>
                            <p style="margin-bottom: 0.5rem;">🛡️ 100% authentic</p>
                        </div>
                    </div>
                </div>
            </div>

            ${relatedProducts.length > 0 ? `
                <div style="margin-top: 4rem; padding-top: 3rem; border-top: 2px solid #e0e0e0;">
                    <h2>Related Products</h2>
                    <div class="row">
                        ${relatedProducts.map(p => `
                            <div class="col-md-4 mb-4">
                                <div class="card h-100">
                                    <img src="${p.image}" class="card-img-top" alt="${p.name}" height="200" onerror="this.src='images/placeholder.jpg'">
                                    <div class="card-body">
                                        <h5 class="card-title">${p.name}</h5>
                                        <p class="fw-bold text-accent">$${p.price.toFixed(2)}</p>
                                        <a href="product-detail.html?id=${p.id}" class="btn btn-outline-primary w-100">View Details</a>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;

        // Re-attach cart listeners
        if (velocityVaultCart) {
            velocityVaultCart.initializeEventListeners();
        }

        // Setup wishlist button
        const wishlistBtn = document.getElementById('wishlist-btn');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', () => {
                this.addToWishlist(product.id, product.name);
                wishlistBtn.classList.toggle('active');
            });
        }
    }

    // Render related products
    renderRelatedProducts(productId) {
        // Handled in renderProductDetail
    }

    // Add to wishlist
    addToWishlist(productId, productName) {
        const wishlist = JSON.parse(localStorage.getItem('velocityVaultWishlist') || '[]');
        const index = wishlist.findIndex(item => item.id === productId);

        if (index === -1) {
            wishlist.push({id: productId, name: productName, addedDate: new Date().toISOString()});
            this.showAlert(`${productName} added to wishlist!`, 'success');
            this.trackEvent('add_to_wishlist', {product_id: productId});
        } else {
            wishlist.splice(index, 1);
            this.showAlert(`${productName} removed from wishlist`, 'info');
        }

        localStorage.setItem('velocityVaultWishlist', JSON.stringify(wishlist));
    }

    // Setup scroll effects
    setupScrollEffects() {
        // Fade in elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.5s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.card, .section-title, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // Setup responsive
    setupResponsive() {
        // Handle mobile menu
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close menu on mobile
                if (window.innerWidth < 992) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                        navbarToggler.click();
                    }
                }
            });
        });
    }

    // Get product ID from URL
    getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    // Validate email
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Show alert
    showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-circle' : 'info-circle'}"></i> ${message}
        `;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '80px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '9999';
        alertDiv.style.minWidth = '300px';
        alertDiv.style.animation = 'slideInDown 0.3s ease';

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.style.animation = 'slideInUp 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        }, 4000);
    }
}

// Initialize Velocity Vault
let velocityVault = null;

document.addEventListener('DOMContentLoaded', () => {
    velocityVault = new VelocityVault();
});

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}
