# CrownKinetics Visual Identity System

**Version:** 1.0
**Date:** February 2026
**Confidential** -- Internal Design Reference Document

---

## Table of Contents

1. [Color Palette](#1-color-palette)
2. [Typography System](#2-typography-system)
3. [Logo Identity](#3-logo-identity)
4. [Icon Style Guide](#4-icon-style-guide)
5. [Photography Style Guide](#5-photography-style-guide)
6. [Pattern and Texture Guidelines](#6-pattern-and-texture-guidelines)

---

## 1. Color Palette

The CrownKinetics palette draws from the richness of melanin-deep skin tones, shea butter gold, cocoa pod interiors, and the deep indigo of West African adire cloth. It is warm, luxurious, and grounded -- never sterile, never cold.

### Primary Colors

These are the foundation of the brand. They appear on packaging, the Shopify storefront header, primary buttons, and key brand touchpoints.

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Crown Umber** | `#5C3A21` | 92, 58, 33 | Primary brand color. Logo, navigation bars, headings, packaging foundations. Rich, dark brown that evokes cocoa, earth, and melanin depth. |
| **Shea Gold** | `#C8952E` | 200, 149, 46 | Primary accent. CTA buttons, highlights, price displays, star ratings, and premium product indicators. Warm, burnished gold inspired by raw shea butter and Akan gold weights. |
| **Heritage Mahogany** | `#7B3F2E` | 123, 63, 46 | Supporting primary. Hover states, secondary headings, product category labels. A warm red-brown that bridges the umber and gold. |

### Secondary Colors

These provide depth, contrast, and sophistication. They appear in backgrounds, secondary UI elements, and editorial content.

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Adire Indigo** | `#2E1A47` | 46, 26, 71 | Deep purple for premium product lines, evening campaign imagery, and rich background sections. Inspired by traditional Yoruba indigo-dyed cloth. |
| **Royal Plum** | `#6B3A6E` | 107, 58, 110 | Lighter purple for gradient transitions, secondary buttons, and accent borders. Adds vibrancy to the darker indigo. |
| **Onyx Charcoal** | `#2D2D2D` | 45, 45, 45 | Primary text color. Body copy, footer backgrounds, and grounding elements. Softer than pure black for improved readability and warmth. |
| **Deep Carbon** | `#1A1A1A` | 26, 26, 26 | Full-dark backgrounds for hero sections, video overlays, and dramatic contrast moments. |

### Accent and Neutral Colors

These provide breathing room, warmth, and balance. They are essential for backgrounds, card surfaces, and accessible design.

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Warm Linen** | `#F5EDE3` | 245, 237, 227 | Primary background for the Shopify store. Product cards, section backgrounds, and content areas. Warm off-white that avoids the clinical feel of pure white. |
| **Shea Cream** | `#EDE0CE` | 237, 224, 206 | Secondary background for alternating sections, testimonial blocks, and callout boxes. Slightly deeper warmth than Warm Linen. |
| **Coconut Husk** | `#D4C4A8` | 212, 196, 168 | Borders, dividers, input field outlines, and subtle UI separators. Warm taupe that grounds the lighter neutrals. |
| **Soft Sable** | `#A68B6B` | 166, 139, 107 | Muted accent for icons, metadata text (dates, authors, categories), and inactive UI states. |
| **Ivory Mist** | `#FAF7F2` | 250, 247, 242 | Lightest background shade for hover states, expanded menus, and modal overlays. |

### Functional Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Success Green** | `#3D7A4A` | Added-to-cart confirmations, in-stock indicators, success messages |
| **Alert Amber** | `#D4882E` | Low-stock warnings, limited-edition badges |
| **Error Rose** | `#B84040` | Form validation errors, out-of-stock indicators |
| **Info Teal** | `#2E7A7A` | Informational tooltips, educational content highlights |

### Color Accessibility Notes

- All text/background combinations must meet WCAG 2.1 AA contrast standards (minimum 4.5:1 for body text, 3:1 for large text).
- Crown Umber (`#5C3A21`) on Warm Linen (`#F5EDE3`) achieves a 7.2:1 contrast ratio -- exceeds AAA.
- Shea Gold (`#C8952E`) should NOT be used for small text on light backgrounds. Use it for large headings, buttons with white text, or decorative elements only.
- Onyx Charcoal (`#2D2D2D`) on Warm Linen (`#F5EDE3`) achieves a 12.4:1 contrast ratio.

### Color Palette CSS Variables

```css
:root {
  /* Primary */
  --ck-crown-umber: #5C3A21;
  --ck-shea-gold: #C8952E;
  --ck-heritage-mahogany: #7B3F2E;

  /* Secondary */
  --ck-adire-indigo: #2E1A47;
  --ck-royal-plum: #6B3A6E;
  --ck-onyx-charcoal: #2D2D2D;
  --ck-deep-carbon: #1A1A1A;

  /* Neutrals */
  --ck-warm-linen: #F5EDE3;
  --ck-shea-cream: #EDE0CE;
  --ck-coconut-husk: #D4C4A8;
  --ck-soft-sable: #A68B6B;
  --ck-ivory-mist: #FAF7F2;

  /* Functional */
  --ck-success: #3D7A4A;
  --ck-alert: #D4882E;
  --ck-error: #B84040;
  --ck-info: #2E7A7A;
}
```

---

## 2. Typography System

### Design Philosophy

CrownKinetics typography pairs the gravitas and heritage of a modern serif with the clean utility of a geometric sans-serif. The result is a typographic voice that feels simultaneously editorial and accessible -- like a luxury magazine that actually speaks to you.

### Heading Typeface: Playfair Display

- **Font Family:** Playfair Display
- **Source:** Google Fonts (free, open source)
- **Weights Used:** Bold (700), Black (900)
- **Styles:** Normal and Italic
- **Character:** High-contrast strokes, elegant ball terminals, and refined proportions. Playfair Display carries the visual weight of heritage and authority without feeling stuffy or dated.

**Usage:**

| Element | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---------|--------|----------------|---------------|-------------|----------------|
| H1 (Page Title) | Black 900 | 48px | 32px | 1.15 | -0.02em |
| H2 (Section Title) | Bold 700 | 36px | 26px | 1.2 | -0.01em |
| H3 (Subsection) | Bold 700 | 28px | 22px | 1.25 | 0em |
| H4 (Card Title) | Bold 700 | 22px | 18px | 1.3 | 0em |
| Pull Quote | Black 900 Italic | 32px | 24px | 1.35 | -0.01em |

**Shopify Implementation:**
```liquid
<!-- In theme.liquid or equivalent -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap" rel="stylesheet">
```

### Body Typeface: Montserrat

- **Font Family:** Montserrat
- **Source:** Google Fonts (free, open source)
- **Weights Used:** Regular (400), Medium (500), SemiBold (600), Bold (700)
- **Character:** Geometric sans-serif with generous x-height and open counters. Montserrat is highly legible at small sizes, performs well on screens, and has a warm, approachable personality that balances the formality of Playfair Display.

**Usage:**

| Element | Weight | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---------|--------|----------------|---------------|-------------|----------------|
| Body Text | Regular 400 | 16px | 15px | 1.65 | 0.01em |
| Body Large | Regular 400 | 18px | 16px | 1.6 | 0.005em |
| Button Text | SemiBold 600 | 14px | 14px | 1.0 | 0.08em (uppercase) |
| Navigation | Medium 500 | 14px | 13px | 1.0 | 0.06em (uppercase) |
| Caption/Meta | Regular 400 | 13px | 12px | 1.5 | 0.02em |
| Price (Current) | Bold 700 | 22px | 18px | 1.0 | 0em |
| Price (Compare) | Regular 400 | 16px | 14px | 1.0 | 0em |
| Badge/Tag | SemiBold 600 | 11px | 10px | 1.0 | 0.1em (uppercase) |

**Shopify Implementation:**
```liquid
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Accent Typeface (Optional): Cormorant Garamond

- **Font Family:** Cormorant Garamond
- **Source:** Google Fonts
- **Weights Used:** Light (300), Light Italic (300i)
- **Usage:** Strictly decorative. Used sparingly for large editorial pull quotes, campaign taglines, or product collection names where an elevated, fashion-editorial feel is desired. Never used for body text or functional UI elements.

### Typography CSS Variables

```css
:root {
  --ck-font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --ck-font-body: 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
  --ck-font-accent: 'Cormorant Garamond', Georgia, serif;
}
```

---

## 3. Logo Identity

### Logo Concept

The CrownKinetics logo merges two symbolic elements: a minimalist crown silhouette and a kinetic motion arc. The crown is abstracted -- not literal or cartoonish -- using three upward-pointing geometric forms that also read as hair strands rising with energy and movement. A subtle arc or wave beneath or through the crown suggests kinetic motion, growth, and the dynamic energy of textured hair.

The wordmark "CrownKinetics" sits below or beside the icon, set in a customized version of Playfair Display Black with slightly tightened letter spacing and a modified "K" that echoes the angular geometry of the crown icon.

### Logo Variations

| Variation | Usage |
|-----------|-------|
| **Primary (Icon + Wordmark, Stacked)** | Website header, packaging front panel, business cards |
| **Horizontal (Icon + Wordmark, Side by Side)** | Email headers, social media cover photos, wide banners |
| **Icon Only (Crown Mark)** | Favicon, app icon, social media profile picture, embossed packaging detail |
| **Wordmark Only** | Minimalist applications, product labels where space is limited |

### Logo Color Applications

| Background | Logo Color |
|------------|-----------|
| Warm Linen / Light | Crown Umber (`#5C3A21`) |
| White | Crown Umber (`#5C3A21`) |
| Deep Carbon / Dark | Shea Gold (`#C8952E`) |
| Adire Indigo | Shea Gold (`#C8952E`) or Warm Linen (`#F5EDE3`) |
| Photography overlay | Warm Linen (`#F5EDE3`) with subtle drop shadow |

### Logo Clear Space

Minimum clear space around the logo equals the height of the "C" in "Crown" on all four sides. No other graphic elements, text, or edges should encroach within this zone.

### Logo Minimum Size

- **Icon + Wordmark:** No smaller than 120px wide (digital) or 30mm (print)
- **Icon Only:** No smaller than 32px (digital) or 8mm (print)

### AI Image Generation Prompt for Logo

The following prompt is optimized for use with AI image generation tools (Midjourney, DALL-E 3, Stable Diffusion XL, or Adobe Firefly) to produce a foundational logo concept for designer refinement:

```
Minimalist luxury logo design for "CrownKinetics", an ethnic hair care brand.
The logo features an abstract geometric crown icon composed of three elegant
upward-pointing triangular forms that subtly resemble rising hair strands with
natural movement and energy. A smooth kinetic arc or wave element flows beneath
the crown, suggesting motion, growth, and dynamism. The crown and arc together
form a cohesive, balanced mark.

Style: Clean vector, geometric minimalism, luxury beauty brand aesthetic.
Color: Rich dark brown (#5C3A21) icon on a warm off-white (#F5EDE3) background,
with a single burnished gold (#C8952E) accent on the kinetic arc element.

The wordmark "CrownKinetics" appears below the icon in a bold modern serif
typeface (similar to Playfair Display Black), with slightly tightened letter
spacing. The "C" and "K" are capitalized; remaining letters are lowercase:
"CrownKinetics" as one word.

No gradients. No 3D effects. No photorealism. No decorative borders. No
clip-art style elements. The design should feel premium, culturally resonant
with Black hair culture, and appropriate for luxury product packaging,
embossing, and digital use. White space is generous. The overall impression is
modern sophistication rooted in cultural heritage. Flat vector logo on a clean
background, suitable for trademark registration and commercial use.
```

**Post-Generation Note:** AI-generated logos should be used as directional concepts only. A professional brand designer should refine the output into final vector artwork (SVG/AI format), ensuring clean paths, scalability, and trademark viability.

---

## 4. Icon Style Guide

### Icon Design Principles

CrownKinetics icons follow a unified visual language that complements the logo and overall brand aesthetic. They are functional, beautiful, and culturally intentional.

### Style Specifications

| Property | Specification |
|----------|---------------|
| **Style** | Outlined (stroke-based), not filled |
| **Stroke Weight** | 1.5px at 24x24px base size; scales proportionally |
| **Corner Radius** | 2px rounded corners on all terminals and joints |
| **Grid** | 24x24px with 2px padding (20x20px active area) |
| **Color** | Single color -- inherits from context (typically Crown Umber or Onyx Charcoal) |
| **Perspective** | Front-facing, flat, no 3D or isometric effects |

### Icon Categories and Examples

**Navigation and UI Icons:**
- Hamburger menu, search (magnifying glass), cart (shopping bag with crown-shaped clasp), user account (head silhouette with subtle crown), heart/wishlist, close (X), chevrons, filters

**Product Category Icons:**
- Shampoo (bottle with droplet)
- Conditioner (bottle with wave line)
- Leave-in (spray bottle with mist lines)
- Oil/Serum (dropper bottle)
- Styling (wide-tooth comb -- culturally specific, not a fine-tooth comb)
- Scalp Care (head profile with focal point indicators)
- Edge Control (hairline illustration)
- Loc Care (twisted strand illustration)

**Ingredient Icons:**
- Shea butter (shea nut)
- Coconut oil (coconut cross-section)
- Castor oil (castor bean pod)
- Aloe vera (aloe leaf)
- Black seed oil (nigella flower)
- Jojoba (jojoba branch)

**Benefit Icons:**
- Moisture (water droplet)
- Strength (interlocked chain link)
- Growth (upward sprout)
- Shine (starburst)
- Definition (spiral/coil)
- Protection (shield outline)

### Icon Color States

| State | Color |
|-------|-------|
| Default | Onyx Charcoal `#2D2D2D` |
| Hover | Crown Umber `#5C3A21` |
| Active/Selected | Shea Gold `#C8952E` |
| Disabled | Coconut Husk `#D4C4A8` |

### Cultural Sensitivity in Icon Design

- The wide-tooth comb (not fine-tooth) is the default comb icon. Fine-tooth combs are culturally inappropriate as a universal symbol in textured hair care.
- Hair strand illustrations should depict coily/curly textures, not straight lines.
- Head/face silhouettes should represent a range of features and hairstyles, not default to European profiles.
- Avoid using a single "hair type" as the universal icon. When possible, show a range.

---

## 5. Photography Style Guide

### Overarching Aesthetic

CrownKinetics photography is **Afrocentric, luxurious, and intentionally minimal.** Every image should feel like it belongs in a premium editorial spread -- but one created by and for the Black community. The photography celebrates Black beauty as the default, not the exception.

### Guiding Principles

1. **Black beauty is the center, not the margin.** Our subjects are not "diverse additions" to a broader campaign. They are the campaign.
2. **Hair is the hero.** Every image should make the viewer want to reach out and touch the hair (or their own).
3. **Luxury is warmth, not coldness.** Our luxury aesthetic is warm, rich, and inviting -- not sterile, minimalist-to-the-point-of-emptiness, or clinical.
4. **Real texture, real beauty.** No digital smoothing of hair texture. No artificial straightening in post-production. No blurring of coils, kinks, or curls.

### Lighting Direction

| Context | Lighting Style |
|---------|---------------|
| **Product hero shots** | Soft, warm directional light (golden hour quality). Single key light with warm fill. Creates gentle shadows that emphasize product form and label detail. |
| **Hair/model photography** | Rim lighting or backlight to create a halo/glow effect around textured hair (the "crown of light" effect). Warm tones. Avoid flat, shadowless lighting that flattens texture. |
| **Lifestyle/ritual shots** | Natural window light, warm and diffused. Morning or late afternoon quality. Intimate and real. |
| **Flat lay/ingredient** | Overhead soft light, even but not clinical. Slight warmth. Shadows should be soft and present, not eliminated. |

### Color Grading

- **Skin tones are sacred.** Color grading must never wash out, over-orange, over-yellow, or flatten Black skin. Test all edits across a range of complexions from deep to light.
- **Overall warmth:** Push slightly toward warm amber/gold tones in shadows and midtones.
- **Avoid:** Blue-tinted shadows, green color casts, desaturation of skin, and the "orange and teal" color grade trend.
- **Black levels:** Rich and deep, not lifted or hazy. Dark skin in shadow should retain detail and dimension.

### Model and Casting Direction

| Criterion | Guideline |
|-----------|-----------|
| **Skin tone range** | Intentionally diverse -- from deep ebony to medium brown to light/mixed. No single shade dominates. |
| **Hair texture range** | 3A through 4C, locs, braids, twists, silk presses, afros, tapered cuts, shaved styles. Full spectrum. |
| **Gender** | Women, men, and non-binary individuals. Men are not afterthoughts. |
| **Age range** | 18-65+. Mature Black women and men are featured prominently, not tokenized. |
| **Body diversity** | Various body types represented naturally. No single body type standard. |
| **Expression** | Confident, relaxed, joyful, contemplative. Avoid performative smiling. The subject should feel at ease. |

### Photography Categories

#### 1. Product Hero Shots
- Single product against a warm, textured background (linen, raw wood, terracotta)
- Product arranged with raw ingredients (shea nuts, coconut halves, castor beans, dried herbs)
- Slight elevation or angle -- never straight-on and flat
- Shadow play adds depth and luxury feel
- Example: A deep brown bottle of CrownKinetics leave-in conditioner sits on a raw walnut surface, surrounded by broken shea nuts and a sprig of rosemary. Warm directional light from the left creates a long, soft shadow. The label is sharp and legible.

#### 2. Hair Texture Close-ups
- Extreme close-up of curls, coils, or locs filling the entire frame
- Backlit or rim-lit to emphasize dimension and pattern
- Sharp focus with shallow depth of field
- The viewer should be able to see individual strands and the beauty of the pattern
- Example: A full-frame close-up of a 4C twist-out, backlit with warm golden light. Each coil is individually defined, catching light on its outer curve. The depth of field is shallow, creating a dreamy bokeh in the background while the foreground coils are razor-sharp.

#### 3. Ritual and Lifestyle Shots
- Wash day scenes: hands in hair, product application, mirror moments
- Shot in real bathrooms, bedrooms, or kitchens -- not sterile studios
- Warm, intimate lighting (window light preferred)
- Moments of self-care, not performance
- Example: A woman sits cross-legged on her bed with a wide-tooth comb, a jar of deep conditioner open beside her, and a silk scarf draped over her shoulder. Morning light streams through a sheer curtain. She is sectioning her hair, focused and peaceful. The shot is candid, not posed.

#### 4. Community and Connection Shots
- Mother-daughter hair moments
- Barbershop and salon scenes
- Friends getting ready together
- Intergenerational knowledge sharing
- Example: A grandmother sits on a couch while her teenage granddaughter braids her silver-gray natural hair. Both are laughing. The lighting is warm and the background is softly blurred -- a real living room with personal details visible.

#### 5. Flat Lay and Ingredient Compositions
- Overhead shot of product arranged with raw ingredients
- Textured backgrounds: linen, burlap, terracotta tiles, dark wood, marble
- Intentional negative space -- not cluttered
- One warm accent element (a gold spoon, a piece of amber, a dried flower)
- Example: Three CrownKinetics products arranged in a diagonal line on a dark walnut surface. Between them: a small pile of raw shea butter, three jojoba seeds, and a sprig of lavender. A gold-handled measuring spoon sits at the edge of the frame. Overhead warm light. Generous negative space on the left.

### What to Avoid in Photography

- Stock photography that is clearly staged, over-lit, or features digitally altered hair textures
- Images where Black models are clearly added to a campaign originally shot with non-Black subjects
- Over-edited skin (plastic/airbrushed look)
- Hair that has been digitally straightened or had texture removed in post-production
- Pure white backgrounds for lifestyle imagery (use warm neutrals instead)
- Models with expressions that read as "performing happiness" rather than genuine ease
- Before/after imagery that positions natural texture as the "before" (the inferior state)
- Cultural artifacts (headwraps, Ankara prints, etc.) used as props without context or respect

---

## 6. Pattern and Texture Guidelines

### Design Philosophy

CrownKinetics patterns draw from three sources: the geometric traditions of African textile arts (kente, mud cloth, adire), the natural geometry of coily hair patterns, and the molecular structures of key ingredients. These patterns are used as accent elements -- never as wallpaper that overwhelms.

### Primary Pattern: The Kinetic Coil

- **Description:** An abstract, continuous line pattern inspired by the helical structure of Type 4 hair fibers. The line spirals in varying densities, creating areas of tight coils and looser waves. It reads as both organic and scientific -- like a microscopic view of a hair strand.
- **Usage:** Section dividers on the Shopify store, packaging tape design, email header backgrounds (at low opacity), pattern fill on shopping bags.
- **Color Application:** Single color at 10-20% opacity over Warm Linen backgrounds, or in Shea Gold on Deep Carbon backgrounds.

### Secondary Pattern: Crown Geometry

- **Description:** A repeating geometric pattern based on triangular crown motifs from the logo, arranged in a tessellation. The triangles interlock in rows, creating a pattern that references both the brand's crown symbolism and West African geometric textile traditions (especially kente cloth strip patterns).
- **Usage:** Product box interiors (reveal pattern), loyalty program cards, gift wrap, and decorative borders on premium product lines.
- **Color Application:** Tone-on-tone (e.g., Crown Umber on Heritage Mahogany, or Adire Indigo on Royal Plum) for a subtle, textural effect.

### Tertiary Pattern: Molecular Grid

- **Description:** A fine, hexagonal grid pattern inspired by the molecular structure of keratin proteins. Clean, minimal, and scientific. Dots at each vertex, thin lines connecting them.
- **Usage:** Backgrounds for educational content, ingredient breakdowns, and the "Science" section of the website. Also used on Scalp Lab sub-brand packaging.
- **Color Application:** Soft Sable (`#A68B6B`) at 15% opacity on Warm Linen, or Shea Cream lines on Ivory Mist.

### Texture Library

Physical and digital textures that complement the patterns:

| Texture | Description | Usage |
|---------|-------------|-------|
| **Raw Shea** | Warm, slightly granular surface texture reminiscent of unrefined shea butter | Background texture for product pages, applied at low opacity |
| **Woven Linen** | Fine linen weave texture with visible thread lines | Email backgrounds, card surfaces, testimonial sections |
| **Dark Wood Grain** | Rich walnut or mahogany grain | Luxe product feature sections, about page backgrounds |
| **Terracotta Matte** | Smooth, matte clay surface with subtle tonal variation | Flat lay photography backgrounds, collection page headers |
| **Gold Leaf Fragment** | Irregular pieces of gold leaf texture | Decorative accents on premium packaging, limited-edition badges |

### Pattern Usage Rules

1. **Never layer more than one pattern in a single section.** Patterns are accents, not foundations.
2. **Opacity matters.** Patterns on the website should generally be between 5-20% opacity. They should be felt more than seen.
3. **Patterns never compete with photography.** If a section has a photograph, the pattern steps back to a border, divider, or background element only.
4. **Cultural patterns are honored, not copied.** CrownKinetics patterns are inspired by African textile traditions but are original designs. They do not replicate specific cultural patterns (e.g., specific kente patterns tied to particular Ashanti clans or proverbs) without proper cultural consultation and attribution.
5. **Accessibility first.** Patterns must never interfere with text readability. When used as backgrounds, they must be at sufficiently low opacity that overlaid text maintains WCAG contrast standards.

### Shopify Implementation Notes

```css
/* Example: Kinetic Coil pattern as section background */
.ck-pattern-section {
  background-color: var(--ck-warm-linen);
  background-image: url('/assets/patterns/kinetic-coil.svg');
  background-repeat: repeat;
  background-size: 200px;
  background-position: center;
  opacity: 0.08; /* Applied to pattern layer via pseudo-element, not entire section */
}

/* Example: Crown Geometry as border accent */
.ck-crown-border {
  border-image: url('/assets/patterns/crown-geometry-border.svg') 30 round;
}
```

---

## Appendix: Quick Reference Card

### Brand at a Glance

| Element | Specification |
|---------|---------------|
| **Primary Color** | Crown Umber `#5C3A21` |
| **Accent Color** | Shea Gold `#C8952E` |
| **Background** | Warm Linen `#F5EDE3` |
| **Text Color** | Onyx Charcoal `#2D2D2D` |
| **Heading Font** | Playfair Display Bold/Black |
| **Body Font** | Montserrat Regular/Medium |
| **Icon Style** | 1.5px outlined, 24px grid, rounded terminals |
| **Photo Mood** | Warm, editorial, Afrocentric, textured, intimate |
| **Pattern Use** | Subtle, low opacity, culturally inspired but original |

---

*This document governs all visual expressions of the CrownKinetics brand across digital, print, and packaging applications. Any deviations require approval from the Brand Director.*
