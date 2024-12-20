# Zaptronic

Made up ecommerce store with working payment and order management.

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/WoIfey/Zaptronic.git
cd Zaptronic
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**

Copy the `env.example` file and rename it to `.env` and set the following variables from:

- Better Auth:
  https://www.better-auth.com/docs/installation#set-environment-variables
- GitHub Provider:
  https://github.com/settings/developers
  - Discord Provider:
    https://discord.com/developers/applications
- Stripe:
  https://dashboard.stripe.com/test/dashboard
- Nodemailer:
  https://nodemailer.com/usage/using-gmail/

4. **Initialize the database**

```bash
pnpm docker
```

5. **Run database migrations**

```bash
pnpm prisma
```

6. **Start the development server**

```bash
pnpm dev
```
