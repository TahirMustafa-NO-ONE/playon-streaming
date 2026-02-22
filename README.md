# PlayOn

PlayOn is a modern movie and TV show streaming platform where you can discover, browse, and watch both movies and TV shows directly on the website. The platform features trending content, genre filtering, and a beautiful responsive interface.

![PlayOn Screenshot](playon/src/assets/thumnail_playon.png)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Building for Production](#building-for-production)
- [Usage](#usage)

## Features
- **Watch Movies and TV Shows**: Stream your favorite movies and TV shows directly from the platform
- **Hero Slider**: Auto-advancing slider showcasing popular content with smooth transitions
- **Trending Content**: Dedicated sections for trending movies and TV shows
- **Genre Filter**: Filter content by genre to find movies and TV shows that match your interests
- **Search Functionality**: Search for your favorite movies and TV shows
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Dark Theme**: Beautiful dark theme with gradient accents

## Tech Stack

- **React 18.2**: JavaScript library for building user interfaces
- **TypeScript 5.2**: Superset of JavaScript that adds static types
- **Vite 5.2**: Next-generation frontend build tool
- **Tailwind CSS 3.4**: Utility-first CSS framework for styling
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **React Router DOM 6.22**: For routing and navigation within the application
- **Axios 1.6**: For making HTTP requests to fetch data from APIs
- **TMDb API**: Provides movie and TV show data including details and images

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation
To get started with PlayOn, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd "movie booking"
   cd cineverse
   ```

3. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the root of the project and add your TMDb API key:
   ```bash
   VITE_TMDB_API_KEY=your_api_key_here
   ```

5. **Run the application:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and navigate to http://localhost:5173/ to see the application in action.

## Building for Production

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. The production-ready files will be in the `dist` directory.

3. Preview the production build:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## Usage

### API Integration

The application uses the TMDb API to fetch movie and TV show data. You will need an API key from TMDb:

1. Visit [The Movie Database (TMDb)](https://www.themoviedb.org/)
2. Create an account or sign in
3. Go to Settings > API
4. Request an API key
5. Add the API key to your `.env` file

### Features Overview

- **Browse Content**: The homepage displays trending movies and TV shows with an animated hero slider
- **Filter by Genre**: Click on a genre from the genre list to filter content
- **Search**: Use the search bar in the navigation to find specific movies or TV shows
- **Responsive Cards**: Hover over cards to see additional information and action buttons
- **Navigation**: Easy navigation between Movies, TV Shows, and Genres sections

### Project Structure

```
cineverse/
├── src/
│   ├── components/     # Reusable React components
│   ├── contexts/       # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── routes/         # Application routing
│   ├── services/       # API integration
│   └── lib/            # Utility functions
├── public/             # Static assets
└── ...config files
```
