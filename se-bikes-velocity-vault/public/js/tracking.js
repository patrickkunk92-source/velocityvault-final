/**
 * VelocityVault Tracking System
 * Handles: Affiliate clicks, Referral tracking, Email captures, Commission calculations
 */

class VelocityVaultTracker {
    constructor() {
        this.STORAGE_PREFIX = 'vv_';
        this.COMMISSION_RATE = 0.05; // 5% base affiliate rate
        this.MEMBER_BONUS = 0.01; // Additional 1% for members (6% total)
        this.initializeTracking();
        this.syncToRemote(); // Sync with backend
    }

    initializeTracking() {
        // Set or get user ID
        if (!this.getLocalStorage('user_id')) {
            const userId = this.generateUserId();
            this.setLocalStorage('user_id', userId);
        }

        // Set or get referral code
        if (!this.getLocalStorage('user_referral_code')) {
            const referralCode = this.generateReferralCode();
            this.setLocalStorage('user_referral_code', referralCode);
        }

        // Initialize tracking data structure
        if (!this.getLocalStorage('tracking_data')) {
            this.setLocalStorage('tracking_data', {
                affiliate_clicks: [],
                referral_clicks: [],
                email_captures: [],
                commission_earnings: 0,
                total_clicks: 0,
                total_conversions: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            });
        }

        // Check for referral code in URL
        this.checkReferralCode();
    }

    // ====== UNIQUE ID GENERATION ======
    generateUserId() {
        return `vv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    generateReferralCode() {
        // 6-character alphanumeric code
        return Math.random().toString(36).substr(2, 6).toUpperCase();
    }

    // ====== AFFILIATE TRACKING ======
    trackAffiliateClick(brand, product, price, source = 'organic') {
        const clickData = {
            timestamp: new Date().toISOString(),
            user_id: this.getLocalStorage('user_id'),
            brand,
            product,
            price,
            source,
            utm_source: this.getUrlParam('utm_source') || 'velocityvault',
            utm_medium: this.getUrlParam('utm_medium') || 'affiliate',
            utm_campaign: this.getUrlParam('utm_campaign') || 'bmx_bikes',
            ref_code: this.getLocalStorage('tracking_referral_code') || null,
            user_is_member: this.isUserMember()
        };

        // Store locally
        const trackingData = this.getTrackingData();
        trackingData.affiliate_clicks.push(clickData);
        trackingData.total_clicks += 1;
        trackingData.updated_at = new Date().toISOString();
        this.setLocalStorage('tracking_data', trackingData);

        // Send to remote
        this.sendBeacon('affiliate_click', clickData);
        
        console.log('📊 Affiliate Click Tracked:', {product, price, source});
        return clickData;
    }

    // ====== REFERRAL PROGRAM ======
    trackReferralClick(referralCode, product = null) {
        const referralData = {
            timestamp: new Date().toISOString(),
            referral_code: referralCode,
            referred_by: this.getUserIdFromReferralCode(referralCode),
            referred_user_id: this.getLocalStorage('user_id'),
            product,
            source_url: window.location.href,
            utm_params: {
                utm_source: this.getUrlParam('utm_source'),
                utm_medium: this.getUrlParam('utm_medium'),
                utm_campaign: this.getUrlParam('utm_campaign')
            }
        };

        const trackingData = this.getTrackingData();
        trackingData.referral_clicks.push(referralData);
        trackingData.updated_at = new Date().toISOString();
        this.setLocalStorage('tracking_data', trackingData);

        // Store referral code for session
        this.setSessionStorage('tracking_referral_code', referralCode);

        this.sendBeacon('referral_click', referralData);
        console.log('🔗 Referral Click Tracked:', {referralCode});
        return referralData;
    }

    getReferralLink(referralCode = null) {
        const code = referralCode || this.getLocalStorage('user_referral_code');
        const baseUrl = window.location.origin;
        return `${baseUrl}/products.html?ref=${code}&utm_source=referral&utm_medium=social`;
    }

    // ====== EMAIL CAPTURE ======
    captureEmail(email, source = 'newsletter') {
        if (!this.validateEmail(email)) {
            console.error('Invalid email:', email);
            return null;
        }

        const emailData = {
            timestamp: new Date().toISOString(),
            email,
            user_id: this.getLocalStorage('user_id'),
            source, // newsletter, signup, checkout, etc.
            user_is_member: this.isUserMember(),
            referral_code: this.getLocalStorage('user_referral_code'),
            device_info: this.getDeviceInfo()
        };

        // Store locally
        const trackingData = this.getTrackingData();
        trackingData.email_captures.push(emailData);
        trackingData.updated_at = new Date().toISOString();
        this.setLocalStorage('tracking_data', trackingData);

        // Send to remote
        this.sendBeacon('email_capture', emailData);
        
        console.log('📧 Email Captured:', {email, source});
        return emailData;
    }

    // ====== MEMBERSHIP TRACKING ======
    createMember(email, name) {
        const memberData = {
            timestamp: new Date().toISOString(),
            user_id: this.getLocalStorage('user_id'),
            email,
            name,
            membership_status: 'active',
            points_balance: 0,
            commission_rate: this.COMMISSION_RATE + this.MEMBER_BONUS, // 6%
            referral_code: this.getLocalStorage('user_referral_code')
        };

        this.setLocalStorage('member_data', memberData);
        this.setLocalStorage('is_member', 'true');

        this.sendBeacon('member_signup', memberData);
        console.log('👤 Member Created:', {email, name});
        return memberData;
    }

    // ====== COMMISSION CALCULATIONS ======
    calculateCommission(purchaseAmount, isMember = false) {
        const rate = isMember ? (this.COMMISSION_RATE + this.MEMBER_BONUS) : this.COMMISSION_RATE;
        const commission = purchaseAmount * rate;
        return {
            gross_amount: purchaseAmount,
            commission_rate: (rate * 100) + '%',
            commission_earned: commission.toFixed(2),
            net_amount: (purchaseAmount - commission).toFixed(2)
        };
    }

    recordCommission(brand, product, purchaseAmount, transactionId) {
        const commission = this.calculateCommission(purchaseAmount, this.isUserMember());
        
        const commissionData = {
            timestamp: new Date().toISOString(),
            user_id: this.getLocalStorage('user_id'),
            transaction_id: transactionId,
            brand,
            product,
            purchase_amount: purchaseAmount,
            commission_earned: parseFloat(commission.commission_earned),
            commission_rate: commission.commission_rate,
            is_member: this.isUserMember(),
            status: 'pending' // pending, approved, paid
        };

        const trackingData = this.getTrackingData();
        trackingData.commission_earnings += parseFloat(commission.commission_earned);
        trackingData.total_conversions += 1;
        trackingData.updated_at = new Date().toISOString();
        this.setLocalStorage('tracking_data', trackingData);

        this.sendBeacon('commission_recorded', commissionData);
        console.log('💰 Commission Recorded:', commission);
        return commissionData;
    }

    // ====== MEMBER POINTS/REWARDS ======
    addPoints(points, reason) {
        const memberData = this.getLocalStorage('member_data') || {};
        memberData.points_balance = (memberData.points_balance || 0) + points;
        memberData.last_points_update = new Date().toISOString();

        this.setLocalStorage('member_data', memberData);
        
        this.sendBeacon('points_awarded', {
            user_id: this.getLocalStorage('user_id'),
            points,
            reason,
            new_balance: memberData.points_balance
        });

        console.log('⭐ Points Added:', {points, reason, balance: memberData.points_balance});
        return memberData;
    }

    // ====== ANALYTICS & REPORTING ======
    getAnalyticsDashboard() {
        const trackingData = this.getTrackingData();
        const memberData = this.getLocalStorage('member_data') || {};

        return {
            user_id: this.getLocalStorage('user_id'),
            is_member: this.isUserMember(),
            member_info: memberData,
            total_clicks: trackingData.total_clicks,
            total_conversions: trackingData.total_conversions,
            conversion_rate: trackingData.total_clicks > 0 ? 
                ((trackingData.total_conversions / trackingData.total_clicks) * 100).toFixed(2) + '%' : '0%',
            total_earnings: trackingData.commission_earnings.toFixed(2),
            referral_code: this.getLocalStorage('user_referral_code'),
            referral_link: this.getReferralLink(),
            affiliate_clicks: trackingData.affiliate_clicks.length,
            referral_clicks: trackingData.referral_clicks.length,
            email_captures: trackingData.email_captures.length,
            created_at: trackingData.created_at,
            updated_at: trackingData.updated_at
        };
    }

    exportAnalytics() {
        const dashboard = this.getAnalyticsDashboard();
        const trackingData = this.getTrackingData();
        
        return {
            dashboard,
            full_data: trackingData,
            exported_at: new Date().toISOString()
        };
    }

    // ====== HELPER METHODS ======
    checkReferralCode() {
        const refCode = this.getUrlParam('ref');
        if (refCode) {
            this.trackReferralClick(refCode);
        }
    }

    getUrlParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    getDeviceInfo() {
        return {
            user_agent: navigator.userAgent,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            platform: navigator.platform
        };
    }

    getUserIdFromReferralCode(code) {
        // In a real system, this would query the backend
        // For now, just return the code as a placeholder
        return `user_${code}`;
    }

    isUserMember() {
        return this.getLocalStorage('is_member') === 'true';
    }

    getTrackingData() {
        const data = this.getLocalStorage('tracking_data');
        return data || {};
    }

    // ====== STORAGE METHODS ======
    setLocalStorage(key, value) {
        try {
            localStorage.setItem(this.STORAGE_PREFIX + key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage write failed:', e);
        }
    }

    getLocalStorage(key) {
        try {
            const value = localStorage.getItem(this.STORAGE_PREFIX + key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.warn('LocalStorage read failed:', e);
            return null;
        }
    }

    setSessionStorage(key, value) {
        try {
            sessionStorage.setItem(this.STORAGE_PREFIX + key, JSON.stringify(value));
        } catch (e) {
            console.warn('SessionStorage write failed:', e);
        }
    }

    getSessionStorage(key) {
        try {
            const value = sessionStorage.getItem(this.STORAGE_PREFIX + key);
            return value ? JSON.parse(value) : null;
        } catch (e) {
            console.warn('SessionStorage read failed:', e);
            return null;
        }
    }

    // ====== REMOTE SYNC ======
    sendBeacon(eventType, eventData) {
        // Use sendBeacon for reliability
        if (navigator.sendBeacon) {
            const payload = JSON.stringify({
                event_type: eventType,
                event_data: eventData,
                timestamp: new Date().toISOString()
            });
            
            // Send to tracking endpoint (configurable)
            const trackingEndpoint = window.VELOCITY_VAULT_TRACKING_ENDPOINT || 
                'https://api.velocityvault.pro/track';
            
            try {
                navigator.sendBeacon(trackingEndpoint, payload);
            } catch (e) {
                console.log('Beacon send failed (non-critical):', e);
            }
        }
    }

    syncToRemote() {
        // Periodic sync of local tracking data to remote
        if (window.VELOCITY_VAULT_API_ENABLED !== false) {
            setInterval(() => {
                const trackingData = this.getTrackingData();
                if (trackingData.affiliate_clicks.length > 0 || trackingData.referral_clicks.length > 0) {
                    this.sendBeacon('sync_batch', trackingData);
                }
            }, 60000); // Sync every minute
        }
    }

    clearAllData() {
        // WARNING: This clears all tracking data
        if (confirm('Are you sure? This will clear all tracking data.')) {
            localStorage.clear();
            sessionStorage.clear();
            console.log('✓ All tracking data cleared');
        }
    }
}

// Initialize global tracker
const velocityVaultTracker = new VelocityVaultTracker();

// Export for use in other scripts
function trackEvent(eventType, eventData) {
    switch(eventType) {
        case 'affiliate_click':
            return velocityVaultTracker.trackAffiliateClick(
                eventData.brand, eventData.product, eventData.price, eventData.source
            );
        case 'referral_click':
            return velocityVaultTracker.trackReferralClick(eventData.code, eventData.product);
        case 'email_capture':
            return velocityVaultTracker.captureEmail(eventData.email, eventData.source);
        case 'member_signup':
            return velocityVaultTracker.createMember(eventData.email, eventData.name);
        case 'commission':
            return velocityVaultTracker.recordCommission(
                eventData.brand, eventData.product, eventData.amount, eventData.transactionId
            );
        case 'add_points':
            return velocityVaultTracker.addPoints(eventData.points, eventData.reason);
        default:
            console.warn('Unknown event type:', eventType);
    }
}

function getAnalyticsDashboard() {
    return velocityVaultTracker.getAnalyticsDashboard();
}

function getReferralLink() {
    return velocityVaultTracker.getReferralLink();
}

console.log('✓ VelocityVault Tracker Initialized');
console.log('User ID:', velocityVaultTracker.getLocalStorage('user_id'));
console.log('Referral Code:', velocityVaultTracker.getLocalStorage('user_referral_code'));
