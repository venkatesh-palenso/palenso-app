# Handshake App Replica

A modern, responsive web application replica of the Handshake platform built with Next.js, TypeScript, and Material-UI. This project demonstrates a comprehensive job search and career networking platform with beautiful animations and responsive design.

## 🚀 Features

### Core Functionality
- **Job Search & Browsing**: Advanced job search with filters and detailed job listings
- **Company Profiles**: Explore companies and their opportunities
- **Career Events**: Browse workshops, career fairs, and networking events
- **Resource Library**: Access career guides, resume templates, and interview tips
- **User Profiles**: Complete profile management with application tracking
- **Authentication**: Secure signup and login system

### Technical Features
- **Responsive Design**: Mobile-first approach with Material-UI components
- **Animations**: Smooth animations using Framer Motion
- **Modern UI**: Clean, professional design inspired by Handshake's aesthetic
- **TypeScript**: Full type safety throughout the application
- **Performance**: Optimized with Next.js for fast loading times

## 📱 Pages (10 Total)

1. **Homepage** (`/`) - Landing page with hero section, stats, and featured jobs
2. **Jobs** (`/jobs`) - Job search and browsing with advanced filters
3. **Companies** (`/companies`) - Company profiles and opportunities
4. **Events** (`/events`) - Career events, workshops, and networking opportunities
5. **Resources** (`/resources`) - Career guides, templates, and tools
6. **Profile** (`/profile`) - User profile management and application tracking
7. **Sign Up** (`/signup`) - Multi-step registration form
8. **Login** (`/login`) - Authentication page with social login options
9. **Privacy Policy** (`/privacy`) - Privacy policy and data protection information
10. **Terms of Service** (`/terms`) - Terms and conditions
11. **Help Center** (`/help`) - FAQ and support resources

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript 5
- **UI Library**: Material-UI (MUI) 7.1.2
- **Animations**: Framer Motion 11.0.0
- **Icons**: Lucide React 0.400.0
- **Styling**: Emotion (CSS-in-JS)
- **Fonts**: Inter & Roboto (Google Fonts)

## 🎨 Design System

### Colors
- **Primary**: Handshake Blue (#2563eb)
- **Secondary**: Handshake Green (#10b981)
- **Background**: Light Gray (#f8fafc)
- **Text**: Dark Gray (#1e293b)

### Typography
- **Primary Font**: Inter (Modern, clean)
- **Secondary Font**: Roboto (Fallback)
- **Hierarchy**: Clear typography scale with proper contrast

### Components
- **Cards**: Elevated with subtle shadows and hover effects
- **Buttons**: Consistent styling with hover animations
- **Forms**: Clean, accessible form components
- **Navigation**: Sticky header with mobile-responsive menu

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd app
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Run the development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## 📁 Project Structure

```
app/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout with navigation
├── lib/                # Utility functions and configurations
│   └── theme.ts        # Material-UI theme configuration
├── pages/              # Next.js pages
│   ├── index.tsx       # Homepage
│   ├── jobs.tsx        # Job listings
│   ├── companies.tsx   # Company profiles
│   ├── events.tsx      # Career events
│   ├── resources.tsx   # Career resources
│   ├── profile.tsx     # User profile
│   ├── signup.tsx      # Registration
│   ├── login.tsx       # Authentication
│   ├── privacy.tsx     # Privacy policy
│   ├── terms.tsx       # Terms of service
│   └── help.tsx        # Help center
├── public/             # Static assets
├── styles/             # Global styles
└── package.json        # Dependencies and scripts
```

## 🎯 Key Features Explained

### Responsive Design
- Mobile-first approach with breakpoints for tablet and desktop
- Flexible grid system using Material-UI Grid components
- Touch-friendly interface elements

### Animations
- **Page Transitions**: Smooth fade-in animations using Framer Motion
- **Hover Effects**: Subtle card lifts and button state changes
- **Loading States**: Staggered animations for content loading
- **Micro-interactions**: Small animations that enhance user experience

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly

## 🔧 Customization

### Theme Customization
The design system can be easily customized by modifying `lib/theme.ts`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#your-primary-color',
    },
    secondary: {
      main: '#your-secondary-color',
    },
  },
  // ... other theme options
});
```

### Adding New Pages
1. Create a new file in the `pages/` directory
2. Follow the existing page structure with proper TypeScript types
3. Add navigation links in `components/Layout.tsx`
4. Include proper meta tags and SEO optimization

## 📱 Mobile Optimization

- Responsive breakpoints for all screen sizes
- Touch-optimized interface elements
- Mobile-friendly navigation menu
- Optimized images and assets
- Fast loading times on mobile networks

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized images
- **Bundle Analysis**: Built-in bundle analyzer
- **Lazy Loading**: Components load only when needed
- **Caching**: Efficient caching strategies

## 🔒 Security Considerations

- Input validation on all forms
- XSS protection with proper sanitization
- CSRF protection ready
- Secure authentication flow
- Privacy-focused design

## 📈 SEO Optimization

- Meta tags for all pages
- Open Graph tags for social sharing
- Structured data markup ready
- Semantic HTML structure
- Fast loading times for better rankings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as a demonstration of modern web development practices. The design and functionality are inspired by the Handshake platform but implemented independently.

## 🙏 Acknowledgments

- **Handshake** for inspiration and design reference
- **Material-UI** for the excellent component library
- **Framer Motion** for smooth animations
- **Next.js** team for the amazing framework
- **Lucide** for beautiful icons

## 📞 Support

For questions or support, please refer to the Help Center page within the application or create an issue in the repository.

---

**Note**: This is a demo application created for educational purposes. The features and functionality are for demonstration only and do not represent actual Handshake platform capabilities.
