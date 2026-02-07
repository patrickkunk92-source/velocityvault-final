# CrownKinetics SMS Templates

> **Platform:** Klaviyo SMS
> **Brand Voice:** Warm, empowering, expert, celebratory
> **Compliance:** All messages include opt-out language and brand identifier
> **Character Limit:** Each message body under 160 characters
> **Merge Tags:** Klaviyo-compatible syntax

---

## 1. Welcome SMS

**Trigger:** New subscriber opts in to SMS
**Delay:** Immediate

```
CrownKinetics: Welcome to the family, {{ first_name }}! Your crown deserves the best. Use CROWNJOY15 for 15% off: {{ organization.url }} Reply STOP to opt out
```

**Character count:** 158

---

## 2. Abandoned Cart SMS

**Trigger:** Cart abandoned, no purchase within 2 hours
**Delay:** 2 hours after abandonment

```
CrownKinetics: Your crown essentials are waiting! Complete your order before they sell out: {{ abandoned_checkout_url }} Reply STOP to opt out
```

**Character count:** 142

---

## 3. Order Shipped SMS

**Trigger:** Order fulfillment / tracking number generated
**Delay:** Immediate upon shipment

```
CrownKinetics: Great news, {{ first_name }}! Your order is on its way. Track it here: {{ order.tracking_url }} Reply STOP to opt out
```

**Character count:** 137

---

## 4. Flash Sale SMS

**Trigger:** Manual campaign / scheduled event
**Delay:** Scheduled send time

```
CrownKinetics: Crown alert! 25% off everything for 24 hrs only. Your hair will thank you. Shop now: {{ organization.url }} Reply STOP to opt out
```

**Character count:** 149

---

## 5. Restock Reminder SMS

**Trigger:** 30 days after last purchase (based on product usage cycle)
**Delay:** 30 days post-purchase

```
CrownKinetics: Time to restock, {{ first_name }}? Keep your crown thriving. Reorder your favorites: {{ organization.url }}/account Reply STOP to opt out
```

**Character count:** 155

---

## 6. Birthday Discount SMS

**Trigger:** Customer birthday (from profile data)
**Delay:** Morning of birthday

```
CrownKinetics: Happy birthday, {{ first_name }}! Celebrate YOUR day with 20% off. Use code BDAY20 at checkout: {{ organization.url }} Reply STOP to opt out
```

**Character count:** 156

---

## 7. Review Request SMS

**Trigger:** 14 days after order delivery
**Delay:** 14 days post-delivery

```
CrownKinetics: Loving your new products, {{ first_name }}? Share your experience and earn rewards: {{ review_url }} Reply STOP to opt out
```

**Character count:** 141

---

## Implementation Notes

### Klaviyo SMS Setup Checklist

1. **Consent Collection:** Ensure SMS opt-in is collected separately from email opt-in at checkout and via pop-up forms. Double opt-in recommended.

2. **Quiet Hours:** Configure sending windows to respect quiet hours (typically 9 AM - 9 PM in the recipient's local time zone). Klaviyo handles this with Smart Sending.

3. **Frequency Cap:** Limit SMS to a maximum of 4-6 messages per month per subscriber to avoid fatigue and unsubscribes.

4. **Compliance:**
   - All messages include the brand name "CrownKinetics" as the identifier
   - All messages include "Reply STOP to opt out" for TCPA compliance
   - Maintain opt-out lists and honor all STOP requests immediately

5. **Link Shortening:** Klaviyo automatically shortens URLs for tracking. Ensure UTM parameters are configured for proper attribution.

6. **Segmentation:** Use Klaviyo segments to avoid sending SMS to:
   - Customers who purchased in the last 24 hours (for flash sale)
   - Customers who already completed checkout (for abandoned cart)
   - Customers who already left a review (for review request)

### Merge Tag Reference

| Tag | Description |
|-----|-------------|
| `{{ first_name }}` | Customer's first name |
| `{{ organization.url }}` | Store URL |
| `{{ abandoned_checkout_url }}` | Direct link to abandoned cart |
| `{{ order.tracking_url }}` | Shipment tracking link |
| `{{ review_url }}` | Product review submission link |

### A/B Testing Suggestions

- **Welcome SMS:** Test with vs. without discount code
- **Abandoned Cart:** Test 1-hour vs. 2-hour delay
- **Flash Sale:** Test percentage-off vs. dollar-amount messaging
- **Restock:** Test 25-day vs. 30-day vs. 35-day triggers based on product type
