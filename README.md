# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a configurable color scheme system based on Pantone 2026 color trends and glassmorphism effects.

## 🚀 Features

- **Latest Next.js** - Built with Next.js 16+ (App Router)
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Responsive Design** - Mobile-first, fully responsive
- **Performance Optimized** - Fast loading and optimized images
- **Pantone 2026 Color Palette** - Modern color scheme with easy configuration
- **Glassmorphism Effects** - Beautiful glass morphism UI elements
- **Configurable Color System** - Easy to update colors via `config/colors.ts`

## 🎨 Color Configuration

The color scheme is easily configurable through the `config/colors.ts` file. Update the color values there, and they will be automatically applied throughout the application via CSS variables.

### Current Color Palette (Pantone 2026 Trends)

- **Primary**: Modern Blue/Cyan
- **Secondary**: Warm Coral/Peach
- **Accent**: Vibrant Purple/Magenta
- **Neutral**: Modern Grays

## 🛠️ Tech Stack

- **Framework**: Next.js 16+
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4+
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Project Structure

```
├── app/
│   ├── globals.css          # Global styles with color variables
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   └── Navigation.tsx        # Navigation component
├── config/
│   └── colors.ts            # Color configuration system
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.mjs          # Next.js configuration
```

## 🎨 Glassmorphism Classes

The project includes pre-built glassmorphism utility classes:

- `.glass` - Standard glass effect
- `.glass-strong` - Stronger glass effect
- `.glass-dark` - Dark glass effect
- `.glass-card` - Card-style glass effect
- `.glass-hover` - Glass effect with hover animation

## 📝 Customization

### Updating Colors

Edit `config/colors.ts` to change the color palette. The changes will automatically reflect throughout the application.

### Adding New Sections

Create new section components in `components/sections/` and import them in `app/page.tsx`.

## 🚀 Deployment

This project is ready to deploy on:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)
- Any static hosting service

## 📄 License

MIT

## 👤 Author

**Shibin Mariyan Stanly**

- Email: shibinmariyan95@gmail.com
- LinkedIn: [shibinmariyanstanly](https://www.linkedin.com/in/shibinmariyanstanly)
- Portfolio: [shibinmariyan.github.io/portfolio/](https://shibinmariyan.github.io/portfolio/)
