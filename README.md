# Palenso - Job Portal Platform

A modern job portal platform built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components. The platform supports both students and employers with comprehensive job search, application management, and company discovery features.

## 🚀 Features

### Core Functionality

- **Dual Role Support**: Separate interfaces for Students and Employers
- **Job Search & Applications**: Advanced job search with filtering and application tracking
- **Company Discovery**: Browse companies with detailed profiles and ratings
- **Event Management**: Career fairs, workshops, and networking events
- **Resource Library**: Career guides, templates, and educational content
- **Profile Management**: Comprehensive user profiles with resume upload

### Modern UI/UX

- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Dark/Light Theme**: Theme switching with system preference detection
- **Roboto Font**: Clean, professional typography using Google Fonts
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling
- **Components**: shadcn/ui for consistent, accessible components
- **Icons**: Lucide React for beautiful, consistent icons
- **Animations**: Framer Motion for smooth transitions

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run format:fix` - Format code and fix ESLint issues

## 🎨 Theme System

The application includes a comprehensive theme system:

### Theme Options

- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for low-light environments
- **System**: Automatically follows your OS preference

### Theme Toggle

- Located in the header navigation
- Dropdown menu with theme options
- Persistent across sessions using localStorage

## 📁 Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── ThemeProvider.tsx # Theme context provider
│   └── ThemeToggle.tsx # Theme switching component
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   ├── _app.tsx        # App wrapper
│   └── _document.tsx   # Document wrapper
├── styles/             # Global styles
│   └── globals.css     # Tailwind CSS and custom styles
├── lib/                # Utility functions
└── public/             # Static assets
```

## 🎯 Key Pages

### For Students

- **Home** (`/`) - Landing page with job recommendations
- **Jobs** (`/jobs`) - Browse and apply to jobs
- **Companies** (`/companies`) - Discover companies
- **Events** (`/events`) - Career events and workshops
- **Resources** (`/resources`) - Career guides and tools
- **Profile** (`/profile`) - Manage profile and applications

### For Employers

- **Post Job** (`/post-job`) - Create job listings
- **Company Profile** - Manage company information
- **Applications** - Review job applications

### General

- **Login/Signup** - Authentication pages
- **Help Center** (`/help`) - FAQ and support
- **Privacy Policy** (`/privacy`) - Privacy information
- **Terms of Service** (`/terms`) - Legal terms

## 🔧 Configuration Files

### Prettier Configuration

- `.prettierrc` - Code formatting rules
- `.prettierignore` - Files to exclude from formatting

### Tailwind Configuration

- `tailwind.config.js` - Tailwind CSS configuration with custom theme
- `postcss.config.js` - PostCSS configuration

### TypeScript Configuration

- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - ESLint configuration

## 🎨 Design System

### Colors

The application uses CSS custom properties for theming:

- Primary colors for branding
- Semantic colors for success, warning, error states
- Neutral colors for text and backgrounds

### Typography

- **Font Family**: Roboto (Google Fonts)
- **Weights**: 300, 400, 500, 700
- **Responsive**: Scales appropriately across devices

### Components

Built with shadcn/ui for consistency:

- Buttons, Inputs, Cards
- Dropdowns, Modals, Tabs
- Forms, Navigation, Layout

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=your-api-url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run formatting: `npm run format`
5. Run linting: `npm run lint`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Check the Help Center (`/help`)
- Review the documentation
- Open an issue on GitHub

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
