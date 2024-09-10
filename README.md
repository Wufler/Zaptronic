## Zaptronic

E-commerce Store Project

### Installation

1. `npm install` to get all dependencies installed
2. Grab your postgreSQL URL from your database and paste it to DATABASE_URL (Be sure to change your schema by adding `&schema=your_schema_name` at the end of your postgreSQL url)
3. Run `npx prisma generate` and then `npx prisma studio` to see all your data
4. https://authjs.dev/getting-started/installation Insert `npx auth secret` into AUTH_SECRET
5. `npm run dev`

### Extra features

6. https://github.com/settings/developers Create a new OAuth app and grab AUTH_GITHUB_ID from Client ID and AUTH_GITHUB_SECRET from Client secrets (generate a new client secret)
7. https://dashboard.stripe.com/ Get NEXT_PUBLIC_STRIPE_PUBLIC_KEY from publishable key and STRIPE_SECRET_KEY from Secret key
8. https://resend.com Resend is not required, you can use any other provider that suits your liking https://authjs.dev/getting-started/authentication/email. EMAIL is from SMTP in settings and AUTH_RESEND_KEY is from API Keys

### Todo

- [x] Homepage
- [x] Prisma
- [x] Auth.js
- [x] Stripe
- [x] Products
- [x] Login
- [x] Orders
- [x] Wishlist
- [x] Settings
- [x] Cart
- [x] Admin
- [x] Reviews
- [ ] Featured Products
- [ ] Search
- [ ] Params
- [ ] Pagination
- [ ] User Address
- [ ] Stripe Integrate Products
- [ ] Remove ability to review and purchase disallowed products
