# Stripe Payment Setup (In-App Modal)

Payment opens in a **popup on your site** (Stripe Elements) — no redirect to stripe.com.

## Backend (`connecta-admin/.env`)

```env
FRONTEND_URL=http://localhost:5173
STRIPE_KEY=pk_test_...
STRIPE_SECRET=sk_test_...
STRIPE_CURRENCY=chf
```

Both keys are required: **publishable** (`STRIPE_KEY`) for the modal, **secret** (`STRIPE_SECRET`) for the API.

## Test card

`4242 4242 4242 4242` — any future expiry, any CVC.

## Flow

1. Customer accepts quote → **payment modal** opens.
2. Card details entered in modal → **Pay Now**.
3. Job becomes **in_progress** (paid) without leaving the app.
