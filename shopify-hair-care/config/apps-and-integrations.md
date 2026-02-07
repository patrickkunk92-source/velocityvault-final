# CrownKinetics Shopify Store - Apps & Integrations Guide

> Comprehensive app recommendations, configuration guides, and integration architecture
> for the CrownKinetics ethnic hair care Shopify store.

---

## Table of Contents

1. [Required Apps (Install Immediately)](#required-apps-install-immediately)
2. [Recommended Apps (Phase 2)](#recommended-apps-phase-2)
3. [Integration Architecture](#integration-architecture)
4. [Installation Priority & Timeline](#installation-priority--timeline)
5. [Monthly Cost Summary](#monthly-cost-summary)

---

## Required Apps (Install Immediately)

These apps form the operational backbone of the CrownKinetics store. Install and configure
them before launch to ensure a complete customer experience from day one.

---

### 1. PageFly - Landing Page Builder

**Shopify App Store:** [PageFly Landing Page Builder](https://apps.shopify.com/pagefly)

**Why CrownKinetics Needs This:**
Custom collection pages, landing pages for seasonal campaigns, and a dedicated hair quiz
page design are essential for an ethnic hair care brand. The default Shopify theme editor
is limited when it comes to rich storytelling layouts that educate customers about hair
types, ingredients, and routines. PageFly provides drag-and-drop control over every section
of the store without touching code.

**Configuration Guide:**

1. **Set Up Custom Homepage Sections**
   - Install PageFly and connect it to your active theme.
   - Create a custom homepage layout with the following sections:
     - **Hero Banner:** Rotating carousel featuring campaign imagery (e.g., "Wash Day Essentials," "Protective Style Season").
     - **Hair Quiz CTA Block:** A prominent mid-page section that drives visitors to the Octane AI quiz. Use copy like "Find Your Perfect Routine in 60 Seconds."
     - **Best Sellers Grid:** Dynamic product grid pulling from a "Best Sellers" collection.
     - **Education Block:** Rich content section with blog post previews (e.g., "Understanding Your Curl Pattern," "How to Start Locs").
     - **UGC / Reviews Carousel:** Pull in Judge.me reviews with customer photos.
     - **Bundle Spotlight:** Feature 2-3 top bundles with savings callouts.
     - **Email Signup Section:** Klaviyo-embedded form offering 15% off first order.
   - Set the PageFly homepage as the default homepage in Shopify theme settings.

2. **Create Hair Type Collection Landing Pages**
   - Build dedicated landing pages for each hair type collection:
     - **Type 3 (Curly):** Products, tips, and routine recommendations for 3A-3C curl patterns.
     - **Type 4 (Coily/Kinky):** Products, tips, and routine recommendations for 4A-4C curl patterns.
     - **Locs & Twists:** Specialized products for loc maintenance, twist-outs, and starter locs.
     - **Protective Styles:** Products for braids, wigs, weaves, and crochet styles.
     - **Transitioning Hair:** Products and education for customers transitioning from relaxed to natural.
   - Each landing page should include:
     - An educational header explaining the hair type and its unique needs.
     - A curated product grid filtered to that collection.
     - A "Recommended Routine" section showing products in order of use (cleanse, condition, style, protect).
     - Customer testimonials and photos specific to that hair type.
     - A CTA to take the hair quiz for personalized recommendations.

3. **Build Seasonal Campaign Pages**
   - Create reusable templates for recurring campaigns:
     - **Summer Humidity Collection:** Anti-frizz, moisture-sealing products.
     - **Winter Moisture Collection:** Deep conditioners, heavy butters, oil treatments.
     - **Back-to-School Protective Style Collection:** Quick-style products and accessories.
     - **Holiday Gift Guide:** Curated bundles and gift sets.
   - Each campaign page should include countdown timers, discount callouts, and urgency-driven copy.
   - Save templates for reuse each season to reduce build time.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Free | $0/month | 1 published page, all page types, SEO optimized |
| Pay as you go | $24/month | Unlimited pages, all sections, priority support |
| Enterprise | $199/month | All features, dedicated support, custom development |

**Recommended Plan:** Start with Free during setup, upgrade to Pay as you go ($24/month) at launch.

---

### 2. Klaviyo - Email & SMS Marketing

**Shopify App Store:** [Klaviyo: Email Marketing & SMS](https://apps.shopify.com/klaviyo-email-marketing)

**Why CrownKinetics Needs This:**
Klaviyo is the industry-leading email and SMS platform for Shopify stores, and its
segmentation capabilities are critical for a hair care brand. CrownKinetics customers
have vastly different needs based on their hair type, porosity, and styling preferences.
Klaviyo allows you to send highly personalized content -- a customer with 4C coily hair
should receive completely different product recommendations and care tips than a customer
with 3A loose curls. The Octane AI quiz integration feeds hair type data directly into
Klaviyo segments, powering a personalization engine that drives repeat purchases.

**Configuration Guide:**

1. **Import Email Flow Templates**
   Set up the following automated email flows immediately:

   - **Welcome Series (5 emails over 14 days):**
     - Email 1 (Immediate): Welcome + 15% off first order code + brand story.
     - Email 2 (Day 2): "Discover Your Hair Type" -- link to the quiz.
     - Email 3 (Day 5): Educational content -- "5 Ingredients to Look For (and 5 to Avoid)."
     - Email 4 (Day 9): Social proof -- top-reviewed products + UGC photos.
     - Email 5 (Day 14): Reminder of 15% off code expiring soon + best sellers.

   - **Abandoned Cart Series (3 emails over 48 hours):**
     - Email 1 (1 hour): "You left something behind" + product image + direct cart link.
     - Email 2 (24 hours): Social proof -- reviews for the abandoned product.
     - Email 3 (48 hours): 10% off incentive to complete purchase.

   - **Win-Back Series (3 emails, triggered 60 days after last purchase):**
     - Email 1 (Day 60): "We miss you" + new arrivals since last purchase.
     - Email 2 (Day 75): "Your hair routine might need a refresh" + restock reminders.
     - Email 3 (Day 90): 20% off win-back offer.

   - **Post-Purchase Series (4 emails):**
     - Email 1 (Delivery + 1 day): "How to use your new products" -- routine guide based on purchased items.
     - Email 2 (Delivery + 7 days): "How is wash day going?" + tips for best results.
     - Email 3 (Delivery + 14 days): Review request via Judge.me integration.
     - Email 4 (Delivery + 30 days): Replenishment reminder based on average product usage timeline.

   - **Browse Abandonment (1 email, triggered when a user views a product but does not add to cart):**
     - "Still thinking about [Product Name]?" + reviews + similar product recommendations.

2. **Set Up Segments**
   Create the following customer segments:

   - **By Hair Type (from Octane AI Quiz):**
     - Type 3A-3C (Curly)
     - Type 4A-4C (Coily/Kinky)
     - Locs & Twists
     - Protective Styles
     - Transitioning
     - Not Yet Quizzed (target with quiz CTA emails)

   - **By Purchase History:**
     - First-time buyers
     - Repeat buyers (2+ orders)
     - VIP customers (5+ orders or $500+ lifetime spend)
     - Lapsed customers (no purchase in 90+ days)
     - High AOV customers ($75+ average order)

   - **By Engagement:**
     - Highly engaged (opened 3+ emails in last 30 days)
     - Moderately engaged (opened 1-2 emails in last 30 days)
     - Disengaged (no opens in 60+ days)
     - SMS subscribers
     - Non-subscribers (visited site but not on list)

3. **Configure SMS Consent Collection**
   - Add SMS opt-in checkbox to all Klaviyo signup forms.
   - Create a dedicated SMS-only welcome offer (e.g., "Text CROWN to 55555 for 20% off").
   - Set up compliance language and double opt-in for SMS.
   - Configure SMS flows:
     - Welcome SMS (immediate after opt-in): "Welcome to the CrownKinetics family! Here is your 20% off code: TEXTCROWN20"
     - Abandoned cart SMS (2 hours after abandonment): Short, direct link to cart.
     - Shipping notification SMS: "Your CrownKinetics order is on the way!"
     - Back-in-stock SMS: Priority notification for waitlisted products.

4. **Set Up Product Recommendation Engine**
   - Enable Klaviyo's predictive analytics and product recommendation blocks.
   - Configure recommendation logic:
     - "Customers who bought [Product] also bought..." (collaborative filtering).
     - "Complete your routine" -- recommend products from the same hair type collection that the customer has not yet purchased.
     - "Trending in your hair type" -- popular products within the customer's quiz-determined hair type segment.
   - Insert dynamic product recommendation blocks into all email templates.

5. **Create Dynamic Content Blocks Based on Hair Type**
   - Use Klaviyo's conditional content (Show/Hide) blocks in email templates:
     - If customer hair type = "4C Coily": Show deep conditioning tips and heavy butter product recs.
     - If customer hair type = "3A Curly": Show lightweight gel and mousse product recs.
     - If customer hair type = "Locs": Show loc retwist product recs and maintenance tips.
     - If hair type = unknown: Show quiz CTA and general best sellers.
   - Apply dynamic content to: newsletter campaigns, seasonal promotions, product launch announcements.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Free | $0/month | Up to 250 contacts, 500 email sends/month, built-in CDP |
| Email | $20/month+ | 251-500 contacts, scales with list size |
| Email + SMS | $35/month+ | Email + SMS, scales with list + SMS credits |

**Recommended Plan:** Start with Free, expect to move to Email plan ($20-45/month) within the first 3 months as the list grows. Add SMS ($35+/month) once the subscriber base justifies the cost.

---

### 3. Judge.me - Product Reviews

**Shopify App Store:** [Judge.me Product Reviews](https://apps.shopify.com/judgeme)

**Why CrownKinetics Needs This:**
Social proof is critical in the hair care space. Customers want to see real results on
real hair before purchasing. Photo and video reviews from customers with similar hair
types build trust and drive conversions. Judge.me also generates SEO-rich review content
that helps product pages rank for long-tail keywords like "best deep conditioner for 4C
hair." The Q&A feature reduces pre-purchase friction by answering common questions
directly on product pages.

**Configuration Guide:**

1. **Enable Photo/Video Reviews**
   - In Judge.me settings, turn on photo and video upload for all review submissions.
   - Set maximum file sizes: Photos up to 10MB, Videos up to 50MB.
   - Enable automatic photo display in review widgets.
   - Configure the review form to prompt:
     - "What is your hair type?" (dropdown: 3A, 3B, 3C, 4A, 4B, 4C, Locs, Other)
     - "Upload a photo of your results!" (optional but encouraged)
   - Moderate photo reviews before publishing to ensure quality and appropriateness.
   - Create a "Customer Gallery" section on the homepage pulling the best UGC photos.

2. **Set Up Automated Review Request Emails (14 Days Post-Delivery)**
   - Configure the review request timing: 14 days after delivery (not shipment).
   - Customize the review request email:
     - Subject line: "How is your [Product Name] working for your hair?"
     - Include product image and direct "Leave a Review" button.
     - Mention the photo upload option prominently.
     - Include the review incentive (see step 5).
   - Set up a reminder email: 7 days after first request if no review submitted.
   - Exclude customers who have already reviewed from reminder sequence.

3. **Configure Review Carousel for Homepage**
   - Add the Judge.me "Reviews Carousel" widget to the homepage via PageFly or theme editor.
   - Filter carousel to show only 4-5 star reviews with photos.
   - Set carousel to auto-rotate every 5 seconds.
   - Display customer name, hair type (from custom field), star rating, and review excerpt.
   - Link each review to its full product page review section.

4. **Enable Q&A Section on Product Pages**
   - Activate the Judge.me Q&A widget on all product pages.
   - Position it below reviews but above "You May Also Like" recommendations.
   - Pre-populate Q&A with common questions for each product category:
     - "Is this product safe for color-treated hair?"
     - "What hair types is this best for?"
     - "How often should I use this product?"
     - "Is this product sulfate-free / silicone-free?"
     - "Can I use this on my child's hair?"
   - Set up email notifications for new questions so the CrownKinetics team can respond within 24 hours.
   - Allow verified purchasers to answer questions (community-driven support).

5. **Set Up Review Incentives (10% Off Next Order)**
   - Configure Judge.me to send an automatic 10% off coupon code after a review is published.
   - Coupon settings:
     - Unique, single-use codes.
     - Valid for 30 days.
     - Minimum order value: $25 (to protect margins).
     - Applicable to non-sale items only.
   - For photo/video reviews: Offer 15% off instead of 10% to incentivize UGC.
   - Track coupon redemption rates monthly to measure ROI of the incentive program.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Free Forever | $0/month | Unlimited reviews, review request emails, SEO snippets |
| Awesome | $15/month | Photo/video reviews, Q&A, coupons, Google Shopping, custom forms |

**Recommended Plan:** Start with Awesome ($15/month) from day one. The photo reviews, Q&A, and coupon features are essential for CrownKinetics.

---

### 4. Bundler - Product Bundles

**Shopify App Store:** [Bundler - Product Bundles](https://apps.shopify.com/bundler-product-bundles)

**Why CrownKinetics Needs This:**
Hair care is inherently routine-based. Customers do not buy a single product -- they buy a
wash day routine, a styling routine, or a maintenance routine. Bundling products into curated
routines increases Average Order Value (AOV) by 20-35% while providing genuine value to the
customer. Bundles also simplify the purchasing decision for new customers who may feel
overwhelmed by product selection.

**Configuration Guide:**

1. **Create "Wash Day Bundle" (Shampoo + Conditioner + Deep Conditioner)**
   - Bundle Name: "The Complete Wash Day Bundle"
   - Included Products:
     - Clarifying / Moisturizing Shampoo (customer selects variant)
     - Daily Rinse-Out Conditioner (customer selects variant)
     - Deep Conditioning Hair Mask (customer selects variant)
   - Bundle Discount: 20% off combined retail price.
   - Display: Show original price crossed out with bundle price and "You Save $XX" callout.
   - Create variants by hair type:
     - "Wash Day Bundle - Curly Hair (Type 3)"
     - "Wash Day Bundle - Coily Hair (Type 4)"
   - Add a "How to Use" card with step-by-step wash day instructions included as a free bonus item.

2. **Create "Loc Starter Kit" (Loc Gel + Oil + Bonnet)**
   - Bundle Name: "The Loc Starter Kit"
   - Included Products:
     - Loc Retwist Gel
     - Lightweight Loc Oil / Scalp Oil
     - Satin-Lined Bonnet (for nighttime loc protection)
   - Bundle Discount: 15% off combined retail price.
   - Add bonus: Include a digital "Loc Journey Guide" PDF (delivered via email post-purchase through Klaviyo).
   - Position as a gift option: "Perfect for anyone starting their loc journey."

3. **Create "Protective Style Care Kit" (Braid Spray + Edge Control + Satin Bonnet)**
   - Bundle Name: "The Protective Style Care Kit"
   - Included Products:
     - Moisturizing Braid Spray / Wig Refresh Spray
     - Edge Control Gel (extra hold)
     - Satin Bonnet or Satin Pillowcase
   - Bundle Discount: 15% off combined retail price.
   - Create seasonal variants:
     - Summer: Add a UV-protecting hair mist.
     - Winter: Add a heavy moisture sealant.

4. **Set Bundle Discounts (15-20% Off)**
   - Standard bundle discount: 15% off.
   - Premium bundle discount (4+ products): 20% off.
   - "Build Your Own Bundle" option:
     - Allow customers to pick any 3 products for 15% off or any 5 products for 20% off.
     - Restrict eligible products (exclude accessories under $10 from bundle eligibility).
   - Set up automatic discount application at checkout (no coupon code needed).
   - Ensure bundle discounts do not stack with other promotional codes.

5. **Display Savings on Product Pages**
   - On individual product pages, show a "Save More in a Bundle" callout:
     - "This product is included in the [Bundle Name]. Save [X]%!"
     - Link directly to the bundle product page.
   - On collection pages, pin bundles to the top of relevant collections.
   - On the homepage, feature a "Shop by Routine" section with bundle cards.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Free Forever | $0/month | Unlimited bundles, bundle discounts |
| Premium | $6.99/month | Mix & match, tiered discounts, funnel upsells |
| Executive | $9.99/month | All features + custom design |

**Recommended Plan:** Start with Free, upgrade to Premium ($6.99/month) when you want "Build Your Own Bundle" (mix and match) functionality.

---

### 5. ReConvert - Upsell & Cross-Sell

**Shopify App Store:** [ReConvert Upsell & Cross-Sell](https://apps.shopify.com/reconvert-upsell-cross-sell)

**Why CrownKinetics Needs This:**
The post-purchase moment -- right after a customer completes checkout -- is the highest-intent
moment in the entire shopping journey. The customer has already committed to buying and has
their payment information entered. ReConvert capitalizes on this by presenting relevant upsell
and cross-sell offers on the thank you page and in post-purchase flows. For CrownKinetics,
this means turning a single-product purchase into a complete routine.

**Configuration Guide:**

1. **Upsell Complementary Products (Shampoo -> Conditioner)**
   - Set up product-specific upsell rules:
     - If purchased Shampoo -> Upsell matching Conditioner at 10% off.
     - If purchased Conditioner -> Upsell Deep Conditioning Mask at 10% off.
     - If purchased Styling Gel -> Upsell Finishing Oil/Serum at 10% off.
     - If purchased Edge Control -> Upsell Edge Brush + Scarf combo at 15% off.
   - Configure "Complete Your Routine" upsell widget:
     - Show the full recommended routine based on the purchased product.
     - Highlight which products the customer already has and which are missing.
     - Offer a one-click "Add Missing Products" button.

2. **Cross-Sell Accessories (Any Product -> Satin Bonnet)**
   - Set up universal cross-sell rules for accessories:
     - Every order -> Satin Bonnet cross-sell (if not already in cart).
     - Every order -> Satin Pillowcase cross-sell.
     - Every order -> Wide-tooth Detangling Comb cross-sell.
     - Orders over $50 -> Free satin scrunchie with "Add to Order" one-click button.
   - Position accessories as "Protect Your Investment" -- educate customers on why satin accessories preserve hair health and style longevity.

3. **Thank You Page Product Recommendations**
   - Customize the thank you page with the following sections:
     - **Order Summary** (default, always shown).
     - **"Complete Your Routine" Upsell** (product-specific, see above).
     - **"Customers Also Loved"** cross-sell carousel (4-6 products).
     - **Birthday Collector:** "When is your birthday? We will send you something special!" -- captures birthday for Klaviyo segment.
     - **Social Follow CTA:** "Follow us on Instagram for hair tips and tutorials" with social buttons.
     - **Referral CTA:** "Share CrownKinetics with a friend and you both get 15% off" (integrates with Smile.io in Phase 2).
     - **Hair Quiz CTA** (for customers who have not taken the quiz): "Get personalized recommendations -- take our 60-second hair quiz."

4. **One-Click Upsell for Bundles**
   - After checkout, present a one-click upsell pop-up:
     - "You just bought [Product]. Upgrade to the [Bundle Name] and save 20%!"
     - Show the bundle with the already-purchased product checked off.
     - Display the incremental cost (not the full bundle price).
     - One-click "Yes, Upgrade My Order" button -- no need to re-enter payment.
   - Set upsell acceptance timeout: 5 minutes (creates urgency without annoying the customer).
   - Cap upsell offers at 2 per transaction to avoid overwhelming the customer.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Free | $0/month | Up to 49 orders/month, basic thank you page editor |
| Upsell Basic | $4.99/month | Up to 99 orders/month, 1-click upsells |
| Upsell Premium | $7.99/month | Up to 199 orders/month, full customization |
| Upsell Premium Pro | $14.99/month | Up to 499 orders/month, all features |

**Recommended Plan:** Start with Upsell Basic ($4.99/month), upgrade as order volume grows. Move to Premium ($7.99/month) once you exceed 99 orders/month.

---

### 6. Octane AI - Quiz & Personalization

**Shopify App Store:** [Octane AI: Quiz & Survey Tools](https://apps.shopify.com/octane-ai)

**Why CrownKinetics Needs This:**
A hair type quiz is the single most important conversion tool for an ethnic hair care brand.
Customers often feel overwhelmed by product selection and unsure which products suit their
specific hair type, porosity, and goals. The quiz solves this by guiding customers through a
personalized assessment and recommending a curated product routine. It also captures
zero-party data (hair type, goals, preferences) that feeds directly into Klaviyo for
hyper-personalized email campaigns. Stores with product quizzes see 4-5x higher conversion
rates from quiz-takers compared to non-quiz visitors.

**Configuration Guide:**

1. **Build 8-Question Hair Type Quiz**
   Design the quiz with the following questions:

   - **Question 1: "What is your hair's curl pattern?"**
     - Options (with images): Wavy (Type 2), Curly (Type 3), Coily/Kinky (Type 4), Locs, I am not sure
   - **Question 2: "How does your hair feel after washing and air-drying?"**
     - Options: Very dry and frizzy, Somewhat dry, Balanced/Normal, Oily at roots and dry at ends
   - **Question 3: "What is your hair's porosity?"** (include a quick "float test" explanation graphic)
     - Options: Low porosity (takes forever to dry), Normal porosity, High porosity (dries very fast), I do not know
   - **Question 4: "What is your primary hair goal?"**
     - Options: Moisture and hydration, Length retention, Curl/coil definition, Scalp health, Loc maintenance, Protective style care, Transitioning from relaxed to natural
   - **Question 5: "How often do you wash your hair?"**
     - Options: Daily, 2-3 times per week, Once a week, Every 2 weeks, Once a month
   - **Question 6: "Which of these is your biggest hair challenge?"**
     - Options: Dryness/breakage, Frizz, Tangles/knots, Thinning/shedding, Scalp issues (dandruff/itchiness), Shrinkage, Lack of definition
   - **Question 7: "What is your current styling routine?"**
     - Options: Wash and go, Twist-out/braid-out, Protective styles (braids, wigs, weaves), Locs/twists, Blow-out/straightening, I do not have a set routine
   - **Question 8: "What ingredient preferences do you have?"**
     - Options: All-natural/organic only, Sulfate-free, Silicone-free, No preference

2. **Map Results to Product Collections**
   Create a results matrix that maps quiz answers to product recommendations:

   | Quiz Result Profile | Recommended Products | Collection |
   |---|---|---|
   | Type 4 + Dry + Moisture goal | Heavy cream, deep conditioner, oil sealant | "Intense Moisture" |
   | Type 3 + Frizz + Definition goal | Lightweight gel, curl cream, leave-in | "Curl Definition" |
   | Locs + Scalp health goal | Loc oil, scalp treatment, retwist gel | "Loc Care" |
   | Any type + Protective style | Braid spray, edge control, satin bonnet | "Protective Style Care" |
   | Any type + Transitioning | Protein treatment, moisturizer, gentle shampoo | "Transitioning" |
   | Low porosity + Any goal | Lightweight products, heat-activated treatments | "Low Porosity" |
   | High porosity + Any goal | Heavy butters, protein-rich products, sealants | "High Porosity" |

   - Display results as a "Your Personalized Routine" page with:
     - Step 1: Cleanse (recommended shampoo)
     - Step 2: Condition (recommended conditioner)
     - Step 3: Treat (recommended treatment/mask)
     - Step 4: Style (recommended styling product)
     - Step 5: Protect (recommended accessory)
   - Include an "Add All to Cart" button with a 10% quiz-taker discount.

3. **Capture Email/SMS at Quiz Completion**
   - Before showing results, require email capture:
     - "Enter your email to see your personalized hair care routine."
     - Optional SMS opt-in: "Get exclusive hair tips and deals via text."
   - Set up a unique Klaviyo list: "Quiz Completers."
   - Pass the following data to Klaviyo as custom properties:
     - `hair_type` (e.g., "4C Coily")
     - `hair_porosity` (e.g., "High")
     - `hair_goal` (e.g., "Moisture and hydration")
     - `hair_challenge` (e.g., "Dryness/breakage")
     - `styling_routine` (e.g., "Protective styles")
     - `ingredient_preference` (e.g., "Sulfate-free")
     - `quiz_result_collection` (e.g., "Intense Moisture")

4. **Integrate with Klaviyo for Segmented Campaigns**
   - Use quiz data to trigger the following Klaviyo automations:
     - **Quiz Result Email (Immediate):** "Here is your personalized routine, [Name]!" with full product recommendations and direct purchase links.
     - **Quiz Follow-Up (3 days later):** Educational content tailored to their hair type (e.g., "5 Tips for Maintaining Moisture in 4C Hair").
     - **Quiz Abandonment (1 hour after starting but not completing):** "You are so close to finding your perfect routine! Finish your quiz here."
   - Use quiz properties in all future email campaigns for dynamic content personalization.
   - Create a Klaviyo dashboard segment for "Quizzed but Not Purchased" to target with specific offers.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Octane | $50/month | Quiz, product recommendations, Klaviyo integration |
| Octane Plus | $200/month | Advanced AI recommendations, A/B testing, analytics |

**Recommended Plan:** Start with Octane ($50/month). This is the most expensive required app, but the quiz-driven conversion lift and zero-party data collection justify the investment.

**Alternative Options (Lower Budget):**
- **Prehook: Quiz Funnel Builder** ($45/month) -- Similar quiz functionality at a slightly lower price.
- **Shop Quiz: Product Recommender** (Free plan available) -- More limited but functional for basic quizzes.
- **Typeform + Zapier + Shopify** (DIY approach) -- More manual but achievable on a tight budget.

---

### 7. SEO Manager / Plug in SEO

**Shopify App Store:** [Plug in SEO](https://apps.shopify.com/plug-in-seo)

**Why CrownKinetics Needs This:**
Organic search is a critical acquisition channel for hair care brands. Customers frequently
search for terms like "best deep conditioner for 4C hair," "natural hair care for coily hair,"
and "how to moisturize locs." Ranking for these terms drives free, high-intent traffic.
An SEO app automates the tedious but essential optimization tasks: meta tags, structured data,
image alt text, URL redirects, and sitemap management. Without it, maintaining SEO health
across hundreds of product pages becomes unmanageable.

**Configuration Guide:**

1. **Set Up Automated Meta Tag Templates**
   - Configure meta title templates by page type:
     - **Products:** `[Product Name] - [Product Type] for [Hair Type] | CrownKinetics`
       - Example: "Moisture Surge Deep Conditioner - Hair Mask for Type 4 Hair | CrownKinetics"
     - **Collections:** `[Collection Name] - Natural Hair Care Products | CrownKinetics`
       - Example: "Type 4 Coily Hair Products - Natural Hair Care | CrownKinetics"
     - **Blog Posts:** `[Post Title] | CrownKinetics Hair Care Blog`
   - Configure meta description templates:
     - **Products:** "Shop [Product Name] by CrownKinetics. [Key Benefit]. Made for [Hair Type]. [Key Ingredient]. Free shipping on orders over $50."
     - **Collections:** "Explore CrownKinetics [Collection Name]. Curated products for [Hair Type/Goal]. Shop now for healthy, beautiful hair."
   - Set character limits: Title (60 chars max), Description (155 chars max).
   - Review and manually customize meta tags for top 20 products and all collections.

2. **Configure URL Redirect Rules**
   - Set up automatic 301 redirects when product URLs change.
   - Create redirect rules for:
     - Old product URLs (if migrating from another platform).
     - Seasonal collection URLs (redirect expired campaign URLs to evergreen collections).
     - Common misspellings and alternate URL patterns.
   - Monitor and fix any 404 errors weekly using the SEO app's broken link detector.
   - Set up a custom 404 page with search functionality and links to popular collections.

3. **Enable JSON-LD Structured Data**
   - Configure structured data for the following schema types:
     - **Product Schema:** Name, description, price, availability, brand, reviews/rating, SKU, images.
     - **Organization Schema:** CrownKinetics business name, logo, social profiles, contact info.
     - **BreadcrumbList Schema:** Home > Collection > Product navigation path.
     - **Article Schema:** For blog posts -- author, publish date, featured image.
     - **FAQ Schema:** For FAQ pages and product Q&A sections.
     - **Review/AggregateRating Schema:** Pull from Judge.me review data.
   - Validate structured data using Google's Rich Results Test tool after configuration.
   - Monitor Google Search Console for structured data errors weekly.

4. **Set Up Image Alt Text Automation**
   - Configure automatic alt text generation for product images:
     - Template: "[Product Name] - [Product Type] by CrownKinetics - [Variant if applicable]"
     - Example: "Moisture Surge Deep Conditioner - Hair Mask by CrownKinetics - 12oz"
   - Manually review and enhance alt text for hero images and lifestyle photos:
     - Include descriptive, keyword-rich alt text (e.g., "Woman with 4C natural hair applying CrownKinetics deep conditioner").
   - Set up bulk alt text editing for existing product images.
   - Ensure all new product uploads have alt text populated automatically.

5. **Monitor SEO Health Score**
   - Set up the SEO health dashboard and configure alerts for:
     - Duplicate meta titles or descriptions.
     - Missing alt text on images.
     - Broken links (internal and external).
     - Pages with thin content (fewer than 300 words).
     - Slow-loading pages (Core Web Vitals issues).
     - Missing structured data.
   - Schedule weekly SEO health report emails to the CrownKinetics team.
   - Set a target SEO health score of 90% or higher.
   - Prioritize fixes: Broken links > Missing meta tags > Missing alt text > Thin content.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Plug in SEO Free | $0/month | Basic SEO checks, meta tag editing |
| Plug in SEO Plus | $29.99/month | Auto-fix, JSON-LD, bulk editing, redirects |

**Alternative:** SEO Manager ($20/month) -- Similar feature set with a slightly different UI.

**Recommended Plan:** Start with Plug in SEO Plus ($29.99/month) for the auto-fix and JSON-LD structured data capabilities. SEO is a long-term investment and the automation saves significant manual effort.

---

## Recommended Apps (Phase 2)

Install these apps after launch once the store has established initial traffic and revenue.
Phase 2 typically begins 2-3 months post-launch.

---

### 8. Smile.io - Loyalty & Rewards

**Shopify App Store:** [Smile.io: Loyalty & Rewards](https://apps.shopify.com/smile-io)

**Why CrownKinetics Needs This:**
Hair care is a replenishment-driven business. Customers who find products they love reorder
every 4-8 weeks. A loyalty program incentivizes repeat purchases, increases customer lifetime
value (CLV), and reduces reliance on paid acquisition. The referral program component turns
satisfied customers into brand ambassadors.

**Configuration Guide:**

- **Points System:**
  - Earn 1 point per $1 spent.
  - Earn 50 points for account creation.
  - Earn 100 points for completing the hair quiz.
  - Earn 25 points for writing a product review.
  - Earn 50 points for a photo/video review.
  - Earn 10 points per social media follow (Instagram, TikTok, YouTube).
  - Earn 15 points for sharing a product on social media.

- **Points Redemption:**
  - 100 points = $5 off.
  - 200 points = $10 off.
  - 500 points = $30 off.
  - 750 points = Free product (from a curated selection of travel-size items).

- **Referral Program:**
  - Referrer gets: 200 points (worth $10).
  - Referred friend gets: 15% off first order.
  - Unique referral link and shareable social graphics.
  - Referral tracked via cookies (30-day attribution window).

- **VIP Tiers:**
  - **Seed (0-499 points):** Base tier, standard points earning.
  - **Sprout (500-1499 points):** 1.25x points multiplier, early access to new products.
  - **Bloom (1500-2999 points):** 1.5x points multiplier, free shipping on all orders, birthday bonus (100 points).
  - **Crown (3000+ points):** 2x points multiplier, free shipping, birthday gift box, exclusive products, VIP-only sales.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Free | $0/month | Basic points, referral, 200 monthly orders |
| Starter | $49/month | Branding, advanced points, nudges |
| Growth | $199/month | VIP tiers, analytics, integrations |

**Recommended Plan:** Start with Free, upgrade to Starter ($49/month) when order volume justifies the investment.

---

### 9. Gorgias - Customer Support

**Shopify App Store:** [Gorgias: Helpdesk & Live Chat](https://apps.shopify.com/helpdesk)

**Why CrownKinetics Needs This:**
As order volume grows, managing customer inquiries across email, social media, and live chat
becomes unmanageable without a dedicated helpdesk. Gorgias centralizes all support channels,
integrates directly with Shopify order data, and enables automation of common responses.

**Configuration Guide:**

- **Help Desk Setup:**
  - Connect email (support@crownkinetics.com), Instagram DMs, Facebook Messenger, and live chat.
  - Set up ticket auto-tagging: Order issues, Product questions, Returns/exchanges, Shipping inquiries.
  - Create canned responses (macros) for the 20 most common questions.

- **Live Chat Configuration:**
  - Enable live chat widget on all pages.
  - Set business hours (e.g., Mon-Fri 9am-6pm EST).
  - Configure after-hours auto-response: "Thanks for reaching out! We will respond within 24 hours. In the meantime, check our FAQ: [link]."
  - Set up quick-reply buttons: "Where is my order?", "I need to return a product", "Product recommendation."

- **FAQ Automation:**
  - Build a self-service FAQ widget with common questions:
    - Shipping times and costs.
    - Return/exchange policy.
    - Product ingredient lists.
    - Hair type guidance.
    - Bundle customization questions.
  - Enable intent detection: Automatically suggest FAQ articles before a customer submits a ticket.

- **Shopify Integration:**
  - Display full order history in the support ticket sidebar.
  - Enable one-click actions: Refund, cancel order, resend tracking, edit shipping address.
  - Set up automated order status responses using Shopify order data.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Starter | $10/month | 3 support agents, 50 tickets/month |
| Basic | $60/month | Unlimited agents, 300 tickets/month |
| Pro | $360/month | Unlimited agents, 2000 tickets/month, automation |

**Recommended Plan:** Start with Starter ($10/month). Upgrade to Basic ($60/month) when ticket volume exceeds 50/month.

---

### 10. Stamped.io - Loyalty + Reviews (Alternative to Judge.me + Smile.io)

**Shopify App Store:** [Stamped.io: Reviews & Loyalty](https://apps.shopify.com/stamped-io)

**Why Consider This:**
If you prefer a single platform managing both reviews and loyalty (rather than separate
Judge.me + Smile.io apps), Stamped.io offers an all-in-one solution. This reduces app
conflicts, simplifies management, and often costs less than running two separate apps.

**Configuration Overview:**

- **Reviews Module:**
  - Photo/video reviews with hair type custom fields.
  - Automated review request emails.
  - Review carousel and product page widgets.
  - Google Shopping review syndication.
  - Community Q&A.

- **Loyalty Module:**
  - Points for purchases, reviews, referrals, social follows.
  - VIP tiers with escalating rewards.
  - Referral program with unique links and tracking.
  - Points redemption for discounts and free products.

- **Key Advantage:** Unified customer profile -- see a customer's reviews, loyalty points, referral history, and purchase data in one place.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Reviews Free | $0/month | Basic reviews |
| Reviews Premium | $49/month | Full review suite |
| Reviews + Loyalty | $99/month | All-in-one platform |

**Recommended Approach:** If you have already set up Judge.me (Required App #3), stick with it and add Smile.io in Phase 2. Only switch to Stamped.io if you want to consolidate and are willing to migrate existing reviews.

---

### 11. Back In Stock - Restock Alerts

**Shopify App Store:** [Back In Stock: Restock Alerts](https://apps.shopify.com/back-in-stock)

**Why CrownKinetics Needs This:**
Popular hair care products (especially limited runs, seasonal items, or viral products) will
go out of stock. Without restock alerts, you lose that customer to a competitor. This app
captures demand signals for out-of-stock products and automatically notifies customers via
email and SMS when items are restocked.

**Configuration Guide:**

- **Email Notifications:**
  - Add "Notify Me When Available" button to all out-of-stock product pages.
  - Customize the signup form: Collect email + optional SMS number.
  - Configure the restock notification email:
    - Subject: "[Product Name] is Back in Stock -- Get It Before It Sells Out Again!"
    - Include product image, direct purchase link, and urgency language.
    - Send notification within 1 hour of restocking.

- **SMS Notifications:**
  - Enable SMS alerts for customers who opt in.
  - SMS fires 30 minutes before email to give SMS subscribers first access (VIP perk).

- **Demand Reporting:**
  - Monitor the waitlist dashboard to identify high-demand products.
  - Use waitlist size data to inform reorder quantities and production decisions.
  - Flag products with 50+ waitlist signups for priority restocking.

- **Klaviyo Integration:**
  - Sync waitlist subscribers to a Klaviyo segment: "Waiting for Restock."
  - Trigger a Klaviyo flow when the product is restocked (for more customized email design).
  - Send a follow-up email 3 days after restock notification if the customer has not purchased.

**Cost:**
| Plan | Price | Features |
|------|-------|----------|
| Free | $0/month | Email alerts, basic dashboard |
| Startup | $19/month | SMS alerts, Klaviyo integration, analytics |

**Recommended Plan:** Start with Free, upgrade to Startup ($19/month) when you add SMS capabilities.

---

### 12. Shopify Inbox - Live Chat

**Shopify App Store:** Built-in (no installation required)

**Why CrownKinetics Needs This:**
Shopify Inbox is a free, native live chat tool that provides basic customer support
functionality without any additional cost. It is an excellent stopgap before investing in
Gorgias (Phase 2, App #9). Even after installing Gorgias, Shopify Inbox can remain as a
secondary channel.

**Configuration Guide:**

- **Enable Shopify Inbox** from the Shopify admin panel (Sales Channels > Inbox).
- **Customize Chat Widget:**
  - Set brand colors to match CrownKinetics color palette.
  - Write a welcome message: "Hi there! Welcome to CrownKinetics. How can we help with your hair care journey today?"
  - Set up quick reply buttons:
    - "Help me find the right products"
    - "Where is my order?"
    - "Tell me about your bundles"
    - "I need to make a return"

- **Automated Responses:**
  - Set up FAQ-based auto-responses for common questions.
  - Configure product recommendation sharing directly in chat.
  - Enable order status lookup within the chat interface.

- **Response Time:**
  - Set business hours for live responses.
  - Configure after-hours messaging: "We're currently offline but will respond within 24 hours. For immediate help, check our FAQ: [link]."

- **Mobile App:**
  - Install the Shopify Inbox mobile app to respond to customers on the go.
  - Enable push notifications for new messages.

**Cost:** Free (included with all Shopify plans).

---

## Integration Architecture

Understanding how these apps connect and share data is critical for maximizing their
collective value. The following architecture ensures seamless data flow across the entire
CrownKinetics tech stack.

### Data Flow Diagram

```
                           +------------------+
                           |   SHOPIFY STORE   |
                           |  (Central Hub)    |
                           +--------+---------+
                                    |
            +-----------------------+-----------------------+
            |                       |                       |
     +------v------+        +------v------+         +------v------+
     |   Octane AI  |        |   Klaviyo    |         |   Judge.me   |
     |  (Hair Quiz) |------->| (Email/SMS)  |<--------|  (Reviews)   |
     +------+------+        +------+------+         +------+------+
            |                       |                       |
            |                       |                       |
     +------v------+        +------v------+         +------v------+
     |   Bundler    |        |  ReConvert   |         |   PageFly    |
     |  (Bundles)   |------->| (Upsells)    |         | (Pages)      |
     +-------------+        +------+------+         +-------------+
                                    |
                             +------v------+
                             |   Plug in    |
                             |   SEO        |
                             +-------------+
```

### Klaviyo as Central Customer Data Hub

Klaviyo serves as the single source of truth for all customer data. Every app feeds data
into Klaviyo, and Klaviyo uses that data to power personalized communications.

| Data Source | Data Sent to Klaviyo | How It Is Used |
|---|---|---|
| Octane AI (Quiz) | Hair type, porosity, goals, challenges, preferences | Email segmentation, dynamic content, product recommendations |
| Judge.me (Reviews) | Review submitted events, review content, ratings | Post-review thank you flows, review request timing |
| Shopify (Orders) | Purchase history, order value, product categories | Purchase-based segmentation, replenishment reminders, win-back flows |
| ReConvert (Upsells) | Upsell acceptance/decline data | Optimize future upsell offers, understand cross-sell preferences |
| Bundler (Bundles) | Bundle purchase data | Recommend complementary bundles, track routine adoption |
| Back In Stock | Waitlist signups, restock events | Restock notification flows, demand-based product recommendations |
| Smile.io (Loyalty) | Points balance, tier status, referral data | Loyalty-triggered emails, VIP-exclusive campaigns, tier upgrade celebrations |

### Quiz -> Klaviyo Segments -> Email Flows

This is the most important integration pipeline in the CrownKinetics tech stack.

**Step 1: Customer Takes Quiz (Octane AI)**
- Customer answers 8 questions about hair type, goals, and preferences.
- Octane AI calculates a result profile and recommends products.

**Step 2: Quiz Data Syncs to Klaviyo**
- Octane AI sends customer properties to Klaviyo via native integration:
  - `hair_type`: "4C Coily"
  - `hair_porosity`: "High"
  - `primary_goal`: "Moisture and hydration"
  - `biggest_challenge`: "Dryness/breakage"
  - `styling_routine`: "Twist-out/braid-out"
  - `ingredient_preference`: "Sulfate-free"
- Customer is added to Klaviyo list: "Quiz Completers."
- Customer is automatically placed into relevant segments based on quiz properties.

**Step 3: Klaviyo Triggers Personalized Flows**
- **Immediate:** Quiz Results Email with personalized product recommendations.
- **Day 3:** Educational email tailored to hair type (e.g., "How to Maintain Moisture in 4C Hair").
- **Day 7:** Social proof email showing reviews from customers with the same hair type.
- **Day 14:** "Have you started your routine?" check-in with a 10% off incentive.
- **Ongoing:** All future campaigns use quiz data for dynamic content blocks.

### Reviews -> Homepage Social Proof -> Product Pages

**Step 1: Customer Submits Review (Judge.me)**
- Customer receives automated review request 14 days post-delivery.
- Customer submits star rating, written review, hair type, and optional photo.

**Step 2: Reviews Display Across the Store**
- **Homepage:** Judge.me carousel widget (via PageFly) shows top photo reviews, auto-rotating.
- **Product Pages:** Full review section with filtering by hair type and star rating.
- **Collection Pages:** Average star rating displayed below each product thumbnail.
- **Google Search Results:** Structured data (via Plug in SEO) displays star ratings in search snippets.

**Step 3: Reviews Feed Klaviyo**
- Judge.me triggers a Klaviyo event: "Review Submitted."
- Klaviyo sends a thank you email with the 10% off coupon code.
- High-quality photo reviews are flagged for UGC use in email campaigns and social media.

### Bundles -> Upsells -> Post-Purchase Flows

**Step 1: Customer Purchases a Product (Shopify)**
- Customer adds a single product to cart and completes checkout.

**Step 2: ReConvert Presents Post-Purchase Upsell**
- Based on the purchased product, ReConvert shows:
  - "Upgrade to the [Bundle Name]" one-click upsell.
  - "Add a Satin Bonnet to protect your style" cross-sell.
- If accepted, the upsell item is added to the existing order.

**Step 3: Klaviyo Triggers Post-Purchase Flow**
- **Day 1 post-delivery:** "How to use your new products" email with routine guide.
- **Day 7:** "How is your hair routine going?" check-in.
- **Day 14:** Review request via Judge.me.
- **Day 30:** Replenishment reminder: "Time to restock your [Product Name]?"
- **Day 30:** If the customer bought a single product (not a bundle): "Complete your routine with the [Bundle Name] and save 20%."

---

## Installation Priority & Timeline

### Pre-Launch (Week 1-2)

| Priority | App | Reason |
|----------|-----|--------|
| 1 | Klaviyo | Email capture must be active from day one |
| 2 | PageFly | Custom homepage and collection pages needed before launch |
| 3 | Plug in SEO | SEO foundation must be set before indexing begins |
| 4 | Judge.me | Review infrastructure must be in place (even if no reviews yet) |
| 5 | Octane AI | Quiz should be live at launch for email capture and conversion |
| 6 | Bundler | Bundles should be available at launch for higher AOV |
| 7 | ReConvert | Post-purchase upsells active from the first order |
| 8 | Shopify Inbox | Free live chat ready for launch-day customer questions |

### Post-Launch Phase 2 (Month 2-3)

| Priority | App | Trigger to Install |
|----------|-----|--------------------|
| 9 | Smile.io | Install once you have 500+ customers and steady repeat purchase rate |
| 10 | Back In Stock | Install once you experience your first stockout |
| 11 | Gorgias | Install once support tickets exceed 50/month or you need multi-channel support |
| 12 | Stamped.io | Only consider if you want to consolidate Judge.me + Smile.io |

---

## Monthly Cost Summary

### Phase 1 (Launch) - Estimated Monthly Cost

| App | Plan | Monthly Cost |
|-----|------|-------------|
| PageFly | Pay as you go | $24.00 |
| Klaviyo | Free (up to 250 contacts) | $0.00 |
| Judge.me | Awesome | $15.00 |
| Bundler | Free | $0.00 |
| ReConvert | Upsell Basic | $4.99 |
| Octane AI | Octane | $50.00 |
| Plug in SEO | Plus | $29.99 |
| Shopify Inbox | Free | $0.00 |
| **Total Phase 1** | | **$123.98/month** |

### Phase 2 (Growth) - Estimated Additional Monthly Cost

| App | Plan | Monthly Cost |
|-----|------|-------------|
| Smile.io | Starter | $49.00 |
| Gorgias | Starter | $10.00 |
| Back In Stock | Free | $0.00 |
| **Total Phase 2 Addition** | | **$59.00/month** |

### Full Stack Estimated Cost

| Phase | Monthly Cost |
|-------|-------------|
| Phase 1 (Launch) | $123.98 |
| Phase 1 + Phase 2 (Growth) | $182.98 |
| Phase 1 + Phase 2 (Scaled, higher-tier plans) | $300-500 |

> **Note:** These costs are in addition to your Shopify plan ($39/month for Basic Shopify).
> Klaviyo costs will increase as your email list grows. Budget $20-100/month for Klaviyo
> once you exceed 250 contacts. All prices are approximate and subject to change by the
> app providers.

---

## App Conflict & Compatibility Notes

1. **Judge.me + Smile.io** -- These apps work independently and do not conflict. If you later want to consolidate, migrate to Stamped.io.
2. **Klaviyo + Shopify Email** -- Disable Shopify Email if using Klaviyo to avoid duplicate sends and confused analytics.
3. **PageFly + Theme Editor** -- PageFly pages override theme sections. Avoid editing PageFly-managed pages in the theme editor directly.
4. **ReConvert + Shopify Checkout** -- ReConvert modifies the thank you page and post-purchase flow. Test thoroughly after Shopify checkout updates.
5. **Octane AI + Klaviyo** -- Requires the native Octane AI x Klaviyo integration to be enabled in both apps. Verify data sync after initial setup.
6. **Bundler + Discount Codes** -- Configure bundle discounts as automatic discounts, not discount codes, to prevent stacking issues with promotional codes.
7. **Multiple SEO Apps** -- Only install one SEO app. Running Plug in SEO and SEO Manager simultaneously will cause conflicts in meta tags and structured data.

---

*This document should be reviewed and updated quarterly as the CrownKinetics store scales,
new apps are released, and pricing changes. Last updated: February 2026.*
