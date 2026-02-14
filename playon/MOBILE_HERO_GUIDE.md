# Mobile Hero Section - Implementation Guide

## Overview
A fully mobile-optimized hero section for the PlayOn streaming website, featuring touch gestures, responsive design, and modern web optimizations.

## ✨ Key Features Implemented

### 📱 Mobile-First Design
- **Full viewport height (100vh)** on mobile devices
- **Bottom-positioned content** (bottom 30% of screen)
- **Vertical button stacking** for touch-friendly interaction
- **Safe area insets** for notched phones (iPhone X+)

### 🎨 Visual Enhancements
- **Dark pink (#ff006e) color scheme** across the UI
- **Gradient overlay** (bottom to top, black to transparent)
- **Image brightness filter (0.35)** for better text readability
- **Text shadow** for enhanced contrast
- **Pulse animation** on HD badges
- **Gold star rating** (#ffd700)

### 👆 Touch Interactions
- **Swipe gestures** - Left/right swipe to navigate slides
- **Touch-friendly buttons** - 48px height (WCAG compliant)
- **Active state animations** - Scale down on press
- **Auto-pause on touch** - Slider pauses during interaction
- **Minimum swipe distance** - 50px to prevent accidental swipes

### 📐 Responsive Breakpoints

#### Small Mobile (<375px)
- Title: 24px
- Synopsis: 13px
- Padding: 15px horizontal

#### Mobile (375px - 767px)
- Title: 28px
- Synopsis: 14px
- Padding: 20px horizontal, 60px bottom

#### Desktop (768px+)
- Title: 5xl - 7xl
- Horizontal button layout
- Right-positioned navigation dots

### 🎯 Content Elements

#### Status Badge
- Size: 10px font, 6px vertical padding
- Border-radius: 15px
- Background: #ff006e with 90% opacity
- Pulse animation for attention

#### Title
- Mobile: 28px (24px on small screens)
- Desktop: 5xl-7xl
- Font-weight: 900 (Black)
- Line-clamp: 2 lines
- Text-shadow: 2px 2px 8px rgba(0,0,0,0.9)

#### Metadata Row
- Star rating: ★ 8.5/10
- Duration: 2h 15m format
- Year: 2024
- Separated by bullets (•)
- Font-size: 13px mobile, 16px desktop

#### Synopsis
- Line-clamp: 3 lines
- Font-size: 14px mobile, 16px desktop
- Color: #cccccc
- Fade-out effect on overflow

#### Action Buttons
- **Watch Now**: Full-width, dark pink (#ff006e)
- **Add to List**: Full-width, transparent with border
- Gap: 12px between buttons
- Shadow: 0 4px 15px rgba(255,0,110,0.3)

### 🚀 Performance Optimizations

#### Hardware Acceleration
```css
transform: translateZ(0);
backface-visibility: hidden;
perspective: 1000px;
will-change: transform, opacity;
```

#### Image Loading
- **Lazy loading** for non-visible slides
- **Eager loading** for first slide
- **Object-fit: cover** for proper scaling
- **Compressed formats** recommended (WebP)

#### CSS Containment
```css
contain: layout style paint;
```

#### Animation Performance
- **GPU-accelerated** transforms and opacity
- **Cubic-bezier** easing for smooth transitions
- **Respects user's motion preferences**

### ♿ Accessibility

#### WCAG Compliance
- Minimum touch target: 44px × 44px (actual: 48px)
- High contrast text on backgrounds
- ARIA labels on all interactive elements
- Proper heading hierarchy (h1 for title)
- Keyboard navigation support

#### Screen Reader Support
```jsx
aria-label="Watch now"
aria-label="Add to list"
aria-label="Go to slide 1"
```

### 🎬 Auto-Play Features
- **5-second interval** between slides
- **Smooth fade transitions** (1s duration)
- **Pause on touch** interaction
- **Resume after touch ends**
- **Infinite loop** navigation

### 🎨 Color Palette

```css
Primary Pink:    #ff006e
Dark Pink:       #d10058
Background:      #0a0a0a
Card Background: #1a1a1a
Text White:      #ffffff
Muted Text:      #cccccc
Secondary Text:  #e0e0e0
Gold Star:       #ffd700
```

### 📱 Mobile-Specific Animations

#### Slide-in Animation
```css
@keyframes fadeInLeft {
  from: opacity 0, translateX(-20px)
  to: opacity 1, translateX(0)
}
Duration: 0.8s
```

#### Button Stagger
- Primary button: 0.2s delay
- Secondary button: 0.4s delay
- Both: fadeInUp animation

#### Badge Pulse
```css
@keyframes pulse {
  0%, 100%: scale(1), opacity(0.9)
  50%: scale(1.05), opacity(1)
}
Duration: 2s infinite
```

### 🔧 Technical Implementation

#### React Hooks Used
- `useState` - State management for slider
- `useEffect` - Auto-play timer
- `useRef` - Slider DOM reference

#### Touch Event Handlers
```jsx
onTouchStart  → Store initial touch position
onTouchMove   → Track touch movement
onTouchEnd    → Calculate swipe distance and direction
```

#### Swipe Detection Logic
```javascript
const distance = touchStart - touchEnd;
const minSwipeDistance = 50;

if (distance > 50) → goToNext()
if (distance < -50) → goToPrev()
```

### 📦 Dependencies
- React 18+
- Tailwind CSS 3+
- lucide-react (for icons)

### 🌐 Browser Support
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- iOS Safari 14+
- Chrome Android 90+

### 🔄 Usage Example

```tsx
import HeroSlider from './components/HeroSlider';

const slides = [
  {
    id: 1,
    title: "Movie Title",
    backdrop_path: "/path/to/image.jpg",
    overview: "Movie description...",
    vote_average: 8.5,
    release_date: "2024-01-01",
    runtime: 135
  }
];

<HeroSlider slides={slides} />
```

### 📊 Performance Metrics Target
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s

### 🎯 SEO Optimizations
- Semantic HTML (section, h1, button)
- Proper alt text on images
- Meta tags for mobile devices
- Theme color for browser UI
- Viewport fit for safe areas

### 📝 Code Quality
- TypeScript for type safety
- ESLint compliant
- Accessible by default
- Mobile-first approach
- Performance optimized

## 🚀 Future Enhancements
- [ ] Video background support
- [ ] Progress bar indicator
- [ ] Share functionality
- [ ] Favorite/bookmark feature
- [ ] Enhanced analytics tracking
- [ ] A/B testing support
- [ ] Personalized recommendations

## 📄 License
Part of the PlayOn streaming platform.

---
**Last Updated**: February 14, 2026  
**Version**: 1.0.0
