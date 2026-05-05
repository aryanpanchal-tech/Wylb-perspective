# Wylb Perspective

A media and photography showcase web application built with React and Vite. Browse featured content, explore photographer profiles, and discover camera gear — all in one place.

---

## Features

- **Fullscreen Hero** with video background placeholder and call-to-action buttons
- **Auto-playing Featured Slider** — cycles through 4 content slides every 3.5 seconds with hover overlays
- **Three-Tab Media Section** — Latest Media / Photographers / Tech with smooth sliding panel animation
- **Photographer Profiles** — clickable cards that open full detail pages with bio, portfolio, and a contact form
- **Tech Gear Pages** — camera and gear detail pages with real product photos and sample photography pulled from Unsplash
- **Scroll-aware Navbar** — transparent over the hero, solid dark background after scrolling
- **Slide-out Drawer Menu** — search bar and category shortcuts accessible from the hamburger icon
- **Tab Memory** — navigating back from a detail page restores the exact tab and scroll position you left

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI component library |
| [Vite](https://vitejs.dev/) | Development server and bundler |
| [React Router v6](https://reactrouter.com/) | Client-side routing between pages |
| [Unsplash API](https://unsplash.com/developers) | Real camera product photos and sample photography |

---

## Project Structure

```
src/
├── App.jsx                  # Root component — routes + scroll handler
├── App.css                  # All component styles
├── index.css                # Global reset and scroll behaviour
│
├── pages/
│   ├── HomePage.jsx         # Main landing page (Navbar + Hero + Featured + Media + Footer)
│   ├── PhotographerPage.jsx # Individual photographer profile (/photographer/:id)
│   └── TechPage.jsx         # Individual gear detail page (/tech/:id)
│
├── components/
│   ├── Navbar.jsx           # Fixed transparent navbar with drawer menu
│   ├── Hero.jsx             # Fullscreen hero section with video placeholder
│   ├── FeaturedSection.jsx  # Auto-playing image carousel
│   ├── MediaSection.jsx     # Three-tab sliding content panel
│   └── Footer.jsx           # Footer with contact links
│
└── data/
    ├── photographers.js     # Photographer profile data (name, bio, projects, socials)
    └── techItems.js         # Camera and gear data (specs, category, price range)
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aryanpanchal-tech/Wylb-perspective.git
cd Wylb-perspective
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your Unsplash API key

Create a `.env` file in the project root:

```
VITE_UNSPLASH_KEY=your_unsplash_access_key_here
```

To get a free API key:
1. Go to [unsplash.com/developers](https://unsplash.com/developers)
2. Create a new application
3. Copy the **Access Key** into your `.env` file

> The `.env` file is listed in `.gitignore` — your API key is never committed to version control.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Routes

| Path | Page |
|------|------|
| `/` | Home page (hero, featured, media tabs) |
| `/photographer/:id` | Photographer profile detail |
| `/tech/:id` | Camera / gear detail |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_UNSPLASH_KEY` | Unsplash API access key for fetching photos |

All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser via `import.meta.env`.

---

## Adding Real Content

### Replace the hero video
1. Place your video file at `public/video/hero.mp4`
2. In `src/components/Hero.jsx`, uncomment the `<video>` block and remove the placeholder `<div>`

### Replace photographer photos
In `src/components/MediaSection.jsx`, replace the `[ Photo ]` placeholder divs inside `PhotographerCard` with `<img src={photographer.avatar} />` and add an `avatar` field to each entry in `src/data/photographers.js`.

### Add real media content
The Latest Media tab uses placeholder cards defined at the top of `src/components/MediaSection.jsx`. Replace the `placeholderCards` array with data from your CMS or API.

### Add more photographers or gear
- **Photographers** — edit `src/data/photographers.js`. Each entry needs: `id`, `name`, `role`, `location`, `bio`, `projects`, `instagram`, `linkedin`, `twitter`, `email`
- **Tech gear** — edit `src/data/techItems.js`. Each entry needs: `id`, `category`, `name`, `tagline`, `description`, `specs`, `priceRange`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production (output in `/dist`) |
| `npm run preview` | Preview the production build locally |

---

## License

This project is private. All rights reserved by Wylb Perspective.
