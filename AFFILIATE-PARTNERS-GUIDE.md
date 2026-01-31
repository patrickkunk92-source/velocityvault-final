# 🤝 VelocityVault Affiliate Partners Guide

## ✅ CURRENT SETUP (January 2026)

Your site now links to WHERE SE BIKES ARE ACTUALLY SOLD with intelligent routing:

### **Active Affiliate Programs:**

1. **Amazon Associates** ✅ ACTIVE
   - Your Tag: `bicycles0b3-20`
   - Commission: 4-8%
   - Products: SE Wildman, SE Everyday, SE Gaudium
   - Status: Earning commissions NOW

2. **Albe's BMX** 📧 CONTACT NEEDED
   - Website: albes.com
   - Products: ALL SE Bikes (Big Ripper, Monster Ripper, Quad Series, etc.)
   - Status: Direct links active, need affiliate partnership
   - Contact: sales@albes.com | 248-951-2475

3. **SE Bikes Official** ✅ ACTIVE
   - Website: sebikes.com
   - Products: All SE Bikes
   - Commission: None (fallback option)
   - Status: Direct manufacturer links

---

## 🎯 HOW THE SYSTEM WORKS

### **Smart Link Priority:**

For each product, customers see buttons in this order:

**If available on Amazon:**
1. 💰 **"Buy on Amazon"** (you earn 4-8%)
2. 🛒 **"Shop at Albe's BMX"** (actual bike available)
3. 🔗 **"SE Bikes Official"** (manufacturer direct)

**If NOT on Amazon:**
1. 🛒 **"Shop at Albe's BMX"** (actual bike available)
2. 🔗 **"SE Bikes Official"** (manufacturer direct)

### **Current Product Mapping:**

| Product | Amazon | Albe's BMX | SE Official |
|---------|--------|------------|-------------|
| SE Wildman | ✅ Commission | ✅ Available | ✅ Available |
| SE Everyday | ✅ Commission | ✅ Available | ✅ Available |
| SE Gaudium | ✅ Commission | ✅ Available | ✅ Available |
| Big Ripper 29" | ❌ Not sold | ✅ Available | ✅ Available |
| Monster Ripper | ❌ Not sold | ✅ Available | ✅ Available |
| All Cruisers | ❌ Not sold | ✅ Available | ✅ Available |
| Quad Series | ❌ Not sold | ✅ Available | ✅ Available |

---

## 📧 NEXT STEPS TO MAXIMIZE COMMISSIONS

### **Step 1: Contact Albe's BMX (HIGH PRIORITY)**

**Why:** They have ALL SE Bikes that Amazon doesn't carry

**Email Template:**
```
Subject: Affiliate Partnership Inquiry - VelocityVault

Hi Albe's BMX Team,

I run VelocityVault.com, an SE Bikes-focused website promoting authentic SE Bikes to urban riders and BMX enthusiasts.

I'm currently linking to your products (Big Ripper, Monster Ripper, Quad Series, etc.) and would love to explore an affiliate partnership to earn commission on sales I refer.

My site: https://se-bikes-website.vercel.app
Traffic: [Your stats]
Audience: Urban BMX riders, SE Bikes enthusiasts

Do you have an affiliate program I can join? If so, what are the commission rates and how do I sign up?

Thank you,
[Your name]
VelocityVault
velocityvaultse@gmail.com
(580) 324-1069
```

**Expected Response:**
- Commission: 5-10% (industry standard for bike retailers)
- Cookie: 30-60 days
- Network: Direct or through affiliate platform

---

### **Step 2: Join More Bike Affiliate Programs**

**CJ Affiliate (Commission Junction)**
- Website: cj.com
- Sign up as Publisher
- Search for bike retailers
- Commission: 5-12%

**ShareASale / Awin**
- Website: awin.com
- Bike retailers available
- Commission: Varies by merchant

**Impact Radius**
- Website: impact.com
- Premium brands
- Commission: Varies

---

### **Step 3: Find Amazon Deals (DAILY TASK)**

**How to find SE Bikes deals on Amazon:**

1. Go to Amazon.com
2. Search: "SE Bikes BMX" or "SE Bikes cruiser"
3. Filter: Price Low to High
4. Look for: Clearance, Open Box, Used-Like New
5. Add to your site as featured deals

**Example Deals to Watch:**
- SE Wildman: Regular $399 → Sale $299? (25% off!)
- SE Everyday: Regular $429 → Sale $349? (19% off!)
- SE Gaudium: Regular $659 → Sale $499? (24% off!)

**When you find a deal:**
1. Copy the ASIN
2. Update your site with "DEAL ALERT" badge
3. Post on social media
4. Promote the savings!

---

## 💰 COMMISSION CALCULATOR

### **Current Earnings (Amazon Only):**
- 10 sales/month × $400 avg × 6% = **$240/month**

### **With Albe's BMX Partnership (5%):**
- 10 Amazon sales: $240
- 20 Albe's sales × $950 avg × 5% = **$950/month**
- **Total: $1,190/month**

### **With Multiple Affiliates:**
- Amazon: $240
- Albe's BMX: $950
- Other retailers: $200
- **Total: $1,390/month**

---

## 🔧 HOW TO UPDATE AFFILIATE LINKS

### **File Location:**
`js/affiliate-config.js`

### **To Add New Amazon Product:**
```javascript
'14': { // New product
    name: 'SE Blocks Flyer',
    amazon: 'B08XYZ1234', // Add ASIN here
    albesBMX: 'https://www.albes.com/products/...',
    sebikes: 'https://www.sebikes.com/products/...'
}
```

### **To Add Albe's Affiliate Link:**
Once you get their affiliate program:
```javascript
albesBMX: {
    tag: 'velocityvault-albes', // Their affiliate tag
    enabled: true
}
```

Then update product links:
```javascript
'3': {
    name: 'SE Big Ripper',
    albesBMX: 'https://www.albes.com/products/big-ripper?ref=velocityvault'
}
```

### **To Add New Retailer:**
1. Add to AFFILIATE_CONFIG
2. Add product URLs
3. Update getBuyLink() function
4. Redeploy site

---

## 📊 TRACKING YOUR COMMISSIONS

### **Amazon:**
- Dashboard: affiliate-program.amazon.com
- Check: Daily
- Reports: Orders, Clicks, Earnings

### **Albe's BMX (when approved):**
- Dashboard: [Their platform]
- Check: Weekly
- Reports: Sales referred

### **Google Analytics (Recommended):**
- Track which products get most clicks
- See which buy buttons perform best
- Optimize for conversions

---

## 🎯 PROMOTION STRATEGIES

### **1. Deal Alerts**
- Check Amazon daily for price drops
- Post to Instagram: "SE Wildman on sale! Save $100"
- Update site with deal banner

### **2. Product Comparisons**
- "SE Wildman vs SE Everyday - Which to Buy?"
- Include affiliate links to both

### **3. Seasonal Promotions**
- Spring: "New riding season deals"
- Black Friday: "Best SE Bikes sales"
- Summer: "Back to school BMX deals"

### **4. Social Media**
- Instagram: Bike photos + "Link in bio"
- TikTok: Bike reviews + affiliate link
- Facebook: Hudson, FL local groups

---

## ✅ CURRENT STATUS SUMMARY

**What's Working:**
- ✅ Amazon affiliate links active and earning
- ✅ All products link to real retailers
- ✅ Multiple buy options for customers
- ✅ Professional, legitimate setup

**Next Actions:**
1. 📧 Email Albe's BMX for partnership (THIS WEEK)
2. 🔍 Check Amazon daily for SE Bikes deals
3. 📱 Start promoting on social media
4. 💰 Track first month's Amazon commissions

---

## 📞 NEED HELP?

**Affiliate Questions:**
- Amazon: affiliate-program.amazon.com/help
- Albe's BMX: sales@albes.com

**Technical Updates:**
- File to edit: `js/affiliate-config.js`
- Deploy command: `vercel --prod --yes`

**Your Business:**
- VelocityVault
- Hudson, Florida
- (580) 324-1069
- velocityvaultse@gmail.com

---

**You're set up for legitimate affiliate income! Focus on driving traffic and contacting Albe's BMX. 🚀**
