# TAKEBOOST - Premium Digital Product Website

A high-end Next.js 15 website clone inspired by TakeBoost, featuring cinematic animations, 3D motion, and luxury UI/UX.

## Features
- **Next.js 15 App Router**: Built with the latest Next.js features.
- **GSAP & Framer Motion**: Ultra-smooth cinematic animations and staggered reveals.
- **Three.js (React Three Fiber)**: Interactive 3D floating shapes in the Hero section.
- **Lenis Smooth Scroll**: Buttery smooth scrolling experience.
- **Luxury UI/UX**: Glassmorphism, 3D tilt cards, magnetic buttons, and custom cursor.
- **Full Backend**: MongoDB, Prisma ORM, and NextAuth authentication.
- **Admin Dashboard**: Analytics cards, responsive sidebar, and order tracking.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS, GSAP, Framer Motion, Three.js, Lenis.
- **Backend**: Node.js, MongoDB, Prisma.
- **Auth**: NextAuth.js.
- **Icons**: Lucide React, React Icons.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Setup environment variables**:
   Create a `.env` file and add your `DATABASE_URL` and `NEXTAUTH_SECRET`.

3. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Folder Structure
- `src/components/animations`: GSAP and Framer Motion components.
- `src/components/sections`: Landing page sections (Hero, ProductShowcase, etc.).
- `src/components/three`: 3D WebGL components.
- `src/components/ui`: Reusable luxury UI components.
- `src/app/dashboard`: Admin panel with protected routes.
- `prisma/`: Database schema and migrations.
