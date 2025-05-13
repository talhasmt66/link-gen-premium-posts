
# LinkedIn Post Generator

A full-stack application that generates engaging LinkedIn posts using AI. Built with React, NextAuth, OpenAI GPT-4, and Stripe for premium subscriptions.

## Features

- **Authentication** via Google OAuth using NextAuth
- **AI Post Generation** powered by OpenAI GPT-4
- **Free tier** with 20 post limit
- **Premium tier** with unlimited posts via Stripe payment
- **Post management** with save, copy, and delete functionality
- **Responsive UI** built with Tailwind CSS

## Setup Instructions

### Prerequisites

1. Node.js and npm installed
2. OpenAI API key
3. Google OAuth credentials
4. Stripe account for payment processing

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Initialize the database: `npx prisma migrate dev --name init`
4. Start the development server: `npm run dev`
5. Visit `http://localhost:3000` in your browser

### Stripe Webhook Setup

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Run the following command to forward events to your local server:
   ```
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. Use the webhook secret in your `.env.local` file

## Deployment

This application is designed for deployment on Vercel. Set up the necessary environment variables in the Vercel dashboard.

For production, use a cloud database like PlanetScale or Heroku Postgres since Vercel's filesystem is ephemeral.

## License

MIT
