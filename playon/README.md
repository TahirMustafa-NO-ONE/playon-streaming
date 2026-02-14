# 🎬 PlayOn - Movie & TV Show Streaming Platform

A modern, feature-rich movie and TV show browsing platform built with React, TypeScript, and Vite. Discover trending content, search for your favorites, and enjoy a beautiful, responsive interface.

![PlayOn](https://img.shields.io/badge/PlayOn-Movie%20Platform-ff006e)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.2-646cff)

## ✨ Features

### 🎯 Hero Section
- **Animated Auto-Slider** with 5 popular movies/shows
- Auto-advances every 5 seconds with smooth transitions
- Manual navigation dots for user control
- Each slide displays:
  - Large background image with dark overlay
  - Movie/show title
  - HD and Trending badges
  - Star rating out of 10
  - Release year and runtime
  - Summary/description
  - "Watch Now" and "Add to List" buttons

### 🎨 Movie/TV Show Cards
- **Responsive Grid Layout** (5 columns desktop → 2 columns mobile)
- Each card features:
  - High-quality poster image
  - HD status badge
  - **Hover Overlay Animation** revealing:
    - Title
    - Release year
    - Star rating
    - Short summary (3 lines)
    - Action buttons (Play, Add to List, More Info)
- Smooth hover effects:
  - Card lifts up with shadow
  - Poster zooms in
  - Overlay fades in from bottom

### 🧭 Navigation
- **Fixed navbar** with blur effect on scroll
- Logo with smooth hover animation
- Menu links with underline animations
- Search bar with glassmorphism effect
- Responsive hamburger menu for mobile
- Links: Home, Movies, TV Shows, Genres

### 📱 Sections
- Trending Now (auto-slider hero section)
- Trending Movies (expandable section)
- Trending TV Shows (expandable section)
- Movie Grid
- TV Shows Grid
- Search Results

### 🎨 Design
- **Dark Theme** with pink (#ff006e) and black (#0a0a0a) color scheme
- Gradient accents using pink and purple
- Glassmorphism effects throughout
- Smooth animations and transitions
- Custom scrollbar with gradient colors

### 📱 Responsive Design
- Desktop: 5 column grid
- Tablet: 3-4 column grid
- Mobile: 2 column grid
- Mobile-optimized navigation
- Adjusted typography for different screens

### 🚀 Additional Features
- **Scroll-to-top button** (appears after scrolling)
- **Footer** with links and social icons
- Smooth scroll behavior
- Loading animations
- View All/Show Less functionality
- Category filtering
- Pagination

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2
- **Language**: TypeScript 5.2
- **Build Tool**: Vite 5.2
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Routing**: React Router DOM 6.22
- **HTTP Client**: Axios 1.6
- **Animations**: CSS3 + Tailwind Animate

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repository-url>
cd "movie booking"
cd cineverse
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
Create a `.env` file in the root directory:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

**Get your API key:**
- Sign up at [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Go to Settings → API → Request an API Key
- Use the API Key (v3 auth)

4. **Start development server**
```bash
npm run dev
```

The app will run at `http://localhost:5173/`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Color Palette

- **Primary Pink**: `#ff006e` (rgb(255, 0, 110))
- **Dark Pink**: `#d10058` (rgb(209, 0, 88))
- **Background**: `#0a0a0a` (rgb(10, 10, 10))
- **Secondary Background**: `#1a1a1a` (rgb(26, 26, 26))
- **Purple Accent**: `#a855f7`

## 📂 Project Structure

```
cineverse/
├── src/
│   ├── components/
│   │   ├── HeroSlider.tsx       # Auto-sliding hero section
│   │   ├── MovieCard.tsx        # Movie card with hover effects
│   │   ├── TvShowCard.tsx       # TV show card with hover effects
│   │   ├── Navbar.tsx           # Fixed navbar with blur
│   │   ├── Footer.tsx           # Footer with links
│   │   ├── ScrollToTop.tsx      # Scroll to top button
│   │   ├── LoadingSkeleton.tsx  # Loading animation
│   │   ├── Genres/              # Genre components
│   │   ├── SearchMovie/         # Search functionality
│   │   ├── Trending/            # Trending content
│   │   └── ui/                  # Reusable UI components
│   ├── hooks/                   # Custom React hooks
│   ├── contexts/                # React contexts
│   ├── services/                # API services
│   ├── routes/                  # Route configuration
│   └── index.css                # Global styles
├── public/                      # Static assets
└── package.json
```

## 🌐 API

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) to fetch:
- Trending movies and TV shows
- Movie details and metadata
- TV show information
- Search functionality
- Genre listings

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Deploy to Vercel
1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and add your environment variables in the Vercel dashboard

### Deploy to Netlify
1. Build the project:
```bash
npm run build
```

2. Deploy:
- Drag and drop the `dist` folder to [Netlify](https://www.netlify.com/)
- Or use Netlify CLI:
```bash
npm install netlify-cli -g
netlify deploy
```

3. Add environment variables in the Netlify dashboard

## 🔑 Environment Variables

Make sure to set the following environment variable in your deployment platform:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

## 🎯 Features Roadmap

- [ ] User authentication and profiles
- [ ] Watchlist and favorites
- [ ] Movie/TV show recommendations
- [ ] Multi-language support
- [ ] Light/Dark theme toggle
- [ ] Advanced filtering options
- [ ] Cast and crew information

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the comprehensive movie database API
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool

## 📧 Support

If you have any questions or need help with the project, feel free to open an issue or reach out.

---

Made with ❤️ using React, TypeScript, and Vite


## ✨ Features

### 🎯 Hero Section
- **Animated Auto-Slider** with 5 popular movies/shows
- Auto-advances every 5 seconds with smooth transitions
- Manual navigation dots for user control
- Each slide displays:
  - Large background image with dark overlay
  - Movie/show title
  - HD and Trending badges
  - Star rating out of 10
  - Release year and runtime
  - Summary/description
  - "Watch Now" and "Add to List" buttons

### 🎨 Movie/TV Show Cards
- **Responsive Grid Layout** (5 columns desktop → 2 columns mobile)
- Each card features:
  - High-quality poster image
  - HD status badge
  - **Hover Overlay Animation** revealing:
    - Title
    - Release year
    - Star rating
    - Short summary (3 lines)
    - Action buttons (Play, Add to List, More Info)
- Smooth hover effects:
  - Card lifts up with shadow
  - Poster zooms in
  - Overlay fades in from bottom

### 🧭 Navigation
- **Fixed navbar** with blur effect on scroll
- Logo with smooth hover animation
- Menu links with underline animations
- Search bar with glassmorphism effect
- Responsive hamburger menu for mobile
- Links: Home, Movies, TV Shows, Genres

### 📱 Sections
- Trending Now (auto-slider hero section)
- Trending Movies (expandable section)
- Trending TV Shows (expandable section)
- Movie Grid
- TV Shows Grid
- Search Results

### 🎨 Design
- **Dark Theme** with pink (#ff006e) and black (#0a0a0a) color scheme
- Gradient accents using pink and purple
- Glassmorphism effects throughout
- Smooth animations and transitions
- Custom scrollbar with gradient colors

### 📱 Responsive Design
- Desktop: 5 column grid
- Tablet: 3-4 column grid
- Mobile: 2 column grid
- Mobile-optimized navigation
- Adjusted typography for different screens

### 🚀 Additional Features
- **Scroll-to-top button** (appears after scrolling)
- **Footer** with links and social icons
- Smooth scroll behavior
- Loading animations
- View All/Show Less functionality
- Category filtering
- Pagination

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2
- **Language**: TypeScript 5.2
- **Build Tool**: Vite 5.2
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Routing**: React Router DOM 6.22
- **HTTP Client**: Axios 1.6
- **Animations**: CSS3 + Tailwind Animate

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/TahirMustafa-NO-ONE/moviefinder.git
cd moviefinder
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
Create a `.env` file in the root directory:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

**Get your API key:**
- Sign up at [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Go to Settings → API → Request an API Key
- Use the API Key (v3 auth)

4. **Start development server**
```bash
npm run dev
```

The app will run at `http://localhost:5173/`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Color Palette

- **Primary Pink**: `#ff006e` (rgb(255, 0, 110))
- **Dark Pink**: `#d10058` (rgb(209, 0, 88))
- **Background**: `#0a0a0a` (rgb(10, 10, 10))
- **Secondary Background**: `#1a1a1a` (rgb(26, 26, 26))
- **Purple Accent**: `#a855f7`

## 📂 Project Structure

```
cineverse/
├── src/
│   ├── components/
│   │   ├── HeroSlider.tsx       # Auto-sliding hero section
│   │   ├── MovieCard.tsx        # Movie card with hover effects
│   │   ├── TvShowCard.tsx       # TV show card with hover effects
│   │   ├── Navbar.tsx           # Fixed navbar with blur
│   │   ├── Footer.tsx           # Footer with links
│   │   ├── ScrollToTop.tsx      # Scroll to top button
│   │   ├── LoadingSkeleton.tsx  # Loading animation
│   │   └── ...
│   ├── hooks/                   # Custom React hooks
│   ├── contexts/                # React contexts
│   ├── services/                # API services
│   ├── routes/                  # Route configuration
│   └── index.css                # Global styles
├── public/                      # Static assets
└── package.json
```

## 🌐 API

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) to fetch:
- Trending movies and TV shows
- Movie details and metadata
- TV show information
- Search functionality
- Genre listings

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Then drag and drop the dist folder to Netlify
```

## 📸 Screenshots

*(Add screenshots of your app here)*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the movie database API
- [Radix UI](https://www.radix-ui.com/) for accessible UI components
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📧 Contact

For questions or feedback, please reach out:
- GitHub: [@TahirMustafa-NO-ONE](https://github.com/TahirMustafa-NO-ONE)
- Repository: [moviefinder](https://github.com/TahirMustafa-NO-ONE/moviefinder)

---

Made with ❤️ by TahirMustafa-NO-ONE
