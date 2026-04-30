# JCSAM - Junior College Sports Association of Mumbai

This project is a management portal for the Junior College Sports Association of Mumbai (JCSAM). It allows administrators to manage players, colleges, and sports registrations.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI, Lucide Icons
- **Backend/Database**: Supabase
- **Animations**: Framer Motion

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
   ```
4. Run the development server:
   ```sh
   npm run dev
   ```

## Admin Access

The admin portal is accessible at `/admin/login`. 
- Direct email/password login is available for registered admins.
- Google OAuth is supported via Supabase.
