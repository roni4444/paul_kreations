# Blog authoring guide (for people and for the Claude writing task)

Posts are Markdown pasted into the admin editor (`/admin/wimm/blog`).
Posts are written in **Indian rupees**; the site converts amounts for
visitors in other countries. Two small markers control this.

## 1. Mark every money amount: `{{money:NUMBER}}`

- Write the amount as a plain number in INR — **no ₹ symbol, no commas, no
  "lakh/crore" words**, digits and an optional decimal point only.
    - `₹45,000`      → `{{money:45000}}`
    - `₹1,499.50`    → `{{money:1499.50}}`
    - `4.5 lakh`     → `{{money:450000}}`
    - `₹500–₹1,000`  → `{{money:500}}–{{money:1000}}`
    - `₹45,000/month`→ `{{money:45000}}/month`
- Works in paragraphs, lists, tables and bold/italic text.
- Do NOT mark: percentages, interest rates, counts, dates, years, or
  amounts inside code blocks.
- Mark every amount in the post, or the post will mix converted and
  unconverted figures.

## 2. Flag India-specific guides: `{{currency:inr}}`

Put `{{currency:inr}}` alone on the **first line** of the body when the guide
only makes sense in India. Such a post always shows rupees and has no
currency switcher.

A guide is India-specific when its advice depends on Indian products, law or
institutions, for example: UPI, Aadhaar/PAN, GST, Indian income-tax slabs and
sections (80C, 87A…), EPF/NPS/PPF/ELSS, SEBI or RBI rules, Indian banks and
credit-card issuers, Indian salary structures (CTC, in-hand), festival
spending in India.

Leave the flag off for general money habits that work anywhere (budgeting
methods, tracking expenses, emergency funds, saving habits). The site then
converts the marked amounts to the visitor's country currency and shows a
"Show amounts in" switcher. Examples in general guides should be round,
illustrative numbers.

If unsure, treat the guide as India-specific.
