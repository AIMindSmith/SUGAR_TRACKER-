# Sugar Tracker — Decode hidden sugar in Indian snacks, instantly converted to teaspoons you can actually picture

![Build Status](https://img.shields.io/badge/build-in_progress-yellow?style=flat-square)
![Python Version](https://img.shields.io/badge/python-3.10%2B-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Stars](https://img.shields.io/github/stars/🔲your-username/sugar-tracker?style=flat-square)

![Demo](assets/demo.gif)
🔲 *Record a 10–15 second GIF: scan or search a snack → see the teaspoon conversion + hidden-sugar flag pop up. This is the single highest-leverage thing you can add to this README.*

## 🔍 Overview
Nutrition labels in India report sugar in grams — a unit almost nobody can intuitively judge while standing in a grocery aisle. Worse, "savory" snacks like namkeen, instant noodles, ketchup, and packaged sauces routinely hide meaningful amounts of sugar that consumers don't expect to find outside of sweets. Sugar Tracker closes that gap: scan a label or search a product, and the app converts raw grams into teaspoons (the unit people actually reason in) and explicitly flags items where sugar content is surprising given the product category. It's built for health-conscious Indian consumers, students managing diabetes risk in the family, and anyone tired of squinting at a nutrition table doing mental math. 🔲 *Add one sentence here once you have it: e.g. "Currently covers 🔲[N] packaged snack SKUs across 🔲[N] brands."*

## ✨ Key Features
- Converts sugar-per-serving from grams to teaspoons using the standard ~4g = 1 tsp conversion, so numbers are instantly intuitive
- Flags "hidden sugar" in savory/non-dessert categories (namkeen, noodles, sauces, chips) where users don't expect to find it
- 🔲 Label scanning via OCR — point your camera at a nutrition table and extract sugar content automatically (planned/in progress)
- Search-based lookup for products not yet scanned, backed by a curated Indian packaged food database
- 🔲 [ADD YOUR METRIC HERE] — e.g. "OCR extracts sugar values correctly on X% of test label photos"
- 🔲 [ADD YOUR METRIC HERE] — e.g. "Database covers X products across Y brands as of launch"
- Built solo in a tight, scoped sprint (15 days, 1 hour/day) — designed to ship a real MVP, not a toy demo

## 🏗️ Architecture / How It Works
Sugar Tracker supports two entry points into the same pipeline: a photo of a nutrition label, or a manual product search.

Photo of  →  │  OCR Engine    │  →  Raw sugar text
nutrition     │  🔲(e.g.       │      extraction
label          Tesseract/
EasyOCR)
└───────────────┘
│
Product    ─────────┼──────────────►  Sugar Lookup
name search                          (Product Database)
│
▼
┌───────────────────┐
│ Conversion Engine  │   grams → teaspoons
│ (g ÷ 4 ≈ tsp)      │
└───────────────────┘
│
▼
┌───────────────────┐
│ Hidden-Sugar Flag  │   compares against
│ Logic              │   category threshold
└───────────────────┘
│
▼
User-facing Output
(teaspoons + flag + context)

