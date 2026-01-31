/* ============================================
   VelocityVault Amazon Affiliate System
   SE Bike Style BMX bikes available on Amazon
   ============================================ */

// Your Amazon Affiliate Tag
const AMAZON_TAG = 'bicycles0b3-20';

// SE Bike Lookalike Products on Amazon (REAL ASINs - IN STOCK)
const AMAZON_PRODUCTS = {
    // 16" BMX (Kids 3-7 years)
    '1': 'B0183SEV3W',  // Mongoose Skid 16" BMX - Entry level kids
    '2': 'B0DY1XWFVQ',  // Dynacraft Sunset 16" BMX - Girls style

    // 18" BMX (Kids 5-7 years)
    '3': 'B0CYMBBFK8',  // Mongoose Switch 18" - Mag wheels

    // 20" Freestyle BMX (SE Wildman/Everyday style)
    '4': 'B0F9WZ75SB',  // WEIZE Freestyle BMX 20" - SE Wildman style
    '5': 'B0BWQ8X8FZ',  // Hiland 20" Freestyle BMX - SE Everyday style
    '6': 'B0GCMRHHXH',  // RoyalBaby 20" BMX Freestyle - Street style
    '7': 'B0C95Q1W12',  // Elite BMX Freestyle 20" - Pro style
    '8': 'B0CNK4RSP3',  // JOYSTAR 20" Freestyle - Youth style
    '9': 'B09239HYM8',  // Elite BMX Stealth 20" - Stealth style
    '10': 'B0FH5TCJMV', // vollsch Freestyle 20" - Multi-color
    '11': 'B0DKFDBRBJ', // cubsala Syzygy 20" - Street style
    '12': 'B0D367N8BT', // Kent PRO 20 - Durable frame
    '13': 'B0CV4XYV83', // Mongoose Legion Kids 20" - Intermediate
    '14': 'B0BBBN5D4W', // Mongoose Legion L80 - Advanced riders
    '15': 'B07G1N7237', // Mongoose Legion 20" - Classic
    '16': 'B0BBQNCPTR', // Mongoose Legion L20 - Park/Street
    '17': 'B0CXT5G5CN', // Schwinn Koen 20" - SmartStart design
    '18': 'B08BCB2K9D', // Schwinn Predator 20" - Retro design
    '19': 'B07LC4W949', // Schwinn Twister 20" - Classic BMX

    // 24" BMX (Teen/Adult transition)
    '20': 'B09QM5DD95', // Hiland 24" BMX - Teen/Adult
    '21': 'B07RB7GP4N', // Schwinn SX1000 24" - Retro cruiser

    // 26" Cruisers (SE Ripper style)
    '22': 'B0CPC7X4LT', // R4 Pro 26" Cruiser Matte Grey - Big Ripper style
    '23': 'B0FVBFXNFR', // R4 Pro 26" White/Purple - Retro cruiser style
    '24': 'B07BZK15V4', // Redline PL 26 BMX Cruiser - Classic style

    // 29" Adult Cruisers (SE Big Ripper style)
    '25': 'B074WHRM5V', // Gravity 29er Single Speed - Big Ripper lookalike
};

// Generate Amazon affiliate link
function getAmazonLink(productId) {
    const asin = AMAZON_PRODUCTS[productId];
    if (!asin) return null;

    return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
}

// Add "Buy on Amazon" buttons to all products
function addAmazonButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        const productId = button.getAttribute('data-id');
        const amazonLink = getAmazonLink(productId);

        if (amazonLink) {
            // Create Amazon button
            const amazonBtn = document.createElement('a');
            amazonBtn.href = amazonLink;
            amazonBtn.target = '_blank';
            amazonBtn.rel = 'nofollow sponsored';
            amazonBtn.className = 'btn btn-success w-100 mt-2';
            amazonBtn.innerHTML = '<i class="fab fa-amazon"></i> Buy on Amazon 💰';

            // Insert after cart button
            button.parentElement.appendChild(amazonBtn);
        }
    });
}

// Add affiliate disclosure
function addAffiliateDisclosure() {
    if (document.querySelector('.affiliate-disclosure')) return;

    const disclosure = document.createElement('div');
    disclosure.className = 'alert alert-info affiliate-disclosure';
    disclosure.style.cssText = 'margin: 20px 0; font-size: 0.9rem; border-left: 4px solid #0dcaf0;';
    disclosure.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <strong>Disclosure:</strong> VelocityVault participates in the Amazon Associates Program.
        We earn commissions from qualifying purchases at no additional cost to you.
        All bikes shown are SE Bike-style BMX bikes available on Amazon.
    `;

    const mainContent = document.querySelector('.py-5:nth-of-type(2)');
    if (mainContent) {
        mainContent.querySelector('.container').insertBefore(
            disclosure,
            mainContent.querySelector('.container').firstChild
        );
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    addAmazonButtons();
    addAffiliateDisclosure();
    console.log('Amazon Affiliate Active:', AMAZON_TAG);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AMAZON_TAG, AMAZON_PRODUCTS, getAmazonLink };
}
