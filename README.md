# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4779b9d2-1b09-4d43-bd0b-1cb06cc88abd

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4779b9d2-1b09-4d43-bd0b-1cb06cc88abd) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with modern web technologies:

- Next.js (App Router)
- TypeScript
- MongoDB (Database)
- Prisma (ORM)
- shadcn-ui
- Tailwind CSS

## Database Setup

This project uses MongoDB as the database and Prisma as the ORM. Make sure you have MongoDB installed and running locally, or use MongoDB Atlas for cloud hosting.

To set up the database:

1. Create a `.env` file in the root directory
2. Add your MongoDB connection string:
   ```
   DATABASE_URL="your_mongodb_connection_string"
   ```
3. Run Prisma migrations:
   ```sh
   npx prisma generate
   npx prisma db push
   ```

## How can I deploy this project?

This Next.js application can be deployed in several ways:

1. **Via Lovable**: Simply open [Lovable](https://lovable.dev/projects/4779b9d2-1b09-4d43-bd0b-1cb06cc88abd) and click on Share -> Publish.

2. **Using Vercel**: As Next.js is created by Vercel, deploying to their platform is seamless:
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and configure the build settings
   - Your app will be deployed with every push to the main branch

## I want to use a custom domain - is that possible?

We don't support custom domains through Lovable (yet). If you want to deploy your project under your own domain, we recommend using Vercel or Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
