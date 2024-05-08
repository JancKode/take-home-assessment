# Contacts

## Introduction
This project is a full-stack application designed as a contact management system. It allows users to create, view, update, and delete contact details. The project demonstrates real-time data handling and responsive web design.

## Technology Stack
- **React/Next.js**
- **Supabase**
- **Tailwind CSS**
- **TypeScript**
- **Vercel**

## Prerequisites
- Node.js (v12.x or newer)
- npm or yarn as package managers
- Supabase account for setting up the backend (database and authentication)

## Local Development Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/your-project-name.git
   cd your-project-name
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and add the following keys:
   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` to view the app.

## Folder Structure
- `/components`: Reusable UI components like Button, Modal, etc.
- `/contacts`: Contact page (default)
- `/public`: Static assets like images and fonts.
- `/utils`: Helpers used across the app
- `/ui`: Generic components
- `/types`: type definitions
- `/packages`: Utility, validations container

## Deployment
**Deploying on Vercel:**

1. **Set Up Your Vercel Account**: If you haven't already, create an account at [Vercel.com](https://vercel.com).

2. **Connect Your GitHub Repository to Vercel**: From the Vercel dashboard, import your project from GitHub by selecting "New Project", then your repository.

3. **Configure Environment Variables**: In your Vercel project settings, configure all the environment variables you have in your `.env.local` file under Settings > Environment Variables.
