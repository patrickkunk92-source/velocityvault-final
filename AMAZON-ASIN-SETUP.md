# 🔗 Amazon ASIN Setup Guide

Your Amazon affiliate tag is **ACTIVE**: `bicycles0b3-20`

Now you need to add the Amazon product IDs (ASINs) for each SE Bike to complete the affiliate setup.

---

## What is an ASIN?

**ASIN** = Amazon Standard Identification Number

It's a unique 10-character code that identifies each product on Amazon.

**Example:** B08XYZ1234

---

## How to Find ASINs (5 minutes per bike)

### Method 1: From Product URL (EASIEST)

1. Go to Amazon.com
2. Search for "SE Wildman bike"
3. Click on a product
4. Look at the URL in your browser:
   ```
   https://www.amazon.com/SE-Bikes-Wildman/dp/B08XYZ1234/ref=...
                                             ^^^^^^^^^^
                                             This is the ASIN!
   ```
5. Copy the 10 characters after `/dp/`

### Method 2: From Product Details

1. Go to product page
2. Scroll down to "Product Information" section
3. Look for "ASIN: B08XYZ1234"
4. Copy that code

---

## 📋 ASIN Checklist

Search Amazon for each bike and copy the ASIN:

### Freestyle BMX Bikes:
- [ ] **SE Wildman** - Search: "SE Bikes Wildman BMX"
- [ ] **SE Everyday** - Search: "SE Bikes Everyday BMX"
- [ ] **SE Gaudium** - Search: "SE Bikes Gaudium"

### Retro Cruisers:
- [ ] **SE Big Ripper 29"** - Search: "SE Bikes Big Ripper 29"
- [ ] **SE Monster Ripper** - Search: "SE Bikes Monster Ripper"
- [ ] **SE Fast Ripper** - Search: "SE Bikes Fast Ripper"
- [ ] **SE OM Flyer** - Search: "SE Bikes OM Flyer"
- [ ] **SE Colossal Ripper** - Search: "SE Bikes Colossal Ripper"

### Quad Series:
- [ ] **SE Fat Quad** - Search: "SE Bikes Fat Quad"
- [ ] **SE Killer Quad** - Search: "SE Bikes Killer Quad"
- [ ] **SE Quadangle Looptail** - Search: "SE Bikes Quadangle"

---

## 📝 How to Add ASINs to Your Site

### Step 1: Open the config file
```bash
Open: js/affiliate-config.js
```

### Step 2: Find the AMAZON_PRODUCTS section
It starts at line 16 and looks like this:
```javascript
const AMAZON_PRODUCTS = {
    '1': 'B08XYZ1234', // SE Wildman - REPLACE WITH REAL ASIN
    '2': 'B08XYZ5678', // SE Everyday - REPLACE WITH REAL ASIN
    ...
};
```

### Step 3: Replace placeholder ASINs with real ones

**Before:**
```javascript
'1': 'B08XYZ1234', // SE Wildman - REPLACE WITH REAL ASIN
```

**After (example):**
```javascript
'1': 'B0CKLM3V4R', // SE Wildman - Real Amazon ASIN
```

### Step 4: Save the file

### Step 5: Deploy
```bash
cd se-bikes-website
vercel --prod --yes
```

---

## 🎯 What Happens When ASINs are Added

**Before:** Only "Add to Cart" button shows

**After:** You'll see BOTH buttons:
- 🛒 "Add to Cart" (for your checkout)
- 📦 "Buy on Amazon" (affiliate link with YOUR commission)

---

## 💰 Earnings Calculator

Once ASINs are added, here's what you earn:

### Per Click Through:
- Customer clicks "Buy on Amazon"
- Goes to Amazon with your affiliate tag: `bicycles0b3-20`
- Any purchase within 24 hours = you earn commission!

### Commission Rates:
- **Bikes:** 4-8% ($36-$72 per $899 bike)
- **Accessories:** 4-8% (helmets, locks, etc.)
- **Other items:** Up to 10% (if they buy anything else)

### Example Day:
- 5 people click your Amazon links
- 2 buy bikes ($899 each) = $72 commission
- 1 buys helmet ($80) = $6 commission
- **Total: $78 for one day!**

---

## ⚠️ Important Notes

### Amazon's 24-Hour Cookie:
When someone clicks your affiliate link, you have **24 hours** to earn commission on ANY purchase they make on Amazon. Even if they don't buy the bike but buy something else, you still earn!

### Product Availability:
If a specific SE Bike model isn't on Amazon:
1. Find similar model
2. Use that ASIN instead
3. Update product description on your site

### Multiple Options:
If there are multiple colors/sizes:
- Pick the most popular one
- Or add multiple ASINs (I can help set that up)

---

## 🚀 Quick Start (Do This Now)

### 5-Minute Setup:
1. Open Amazon.com
2. Search "SE Big Ripper 29"
3. Copy ASIN from URL
4. Open `js/affiliate-config.js`
5. Replace line 18: `'3': 'B08XYZ9012'` with real ASIN
6. Save and deploy

**Test it:**
- Go to your site
- See "Buy on Amazon" button
- Click it → Should go to Amazon with `bicycles0b3-20` in URL
- ✅ You're earning commissions!

---

## 📞 Need Help?

Finding ASINs is easy but if you get stuck:

**Email:** velocityvaultse@gmail.com
**Phone:** (580) 324-1069

I can help you find the ASINs or we can do it together!

---

## 🎉 Once ASINs Are Added

You're **100% operational** and earning affiliate commissions!

Every "Buy on Amazon" click = potential commission.

Start driving traffic and watch the commissions roll in! 💰
