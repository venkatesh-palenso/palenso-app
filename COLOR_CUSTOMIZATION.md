# 🎨 Color Customization Guide

This guide shows you how to easily customize the theme colors using simple hex codes.

## Quick Color Changes

To change colors, simply edit the hex codes in `styles/globals.css`:

### Primary Colors (Main Brand)
```css
--primary: #ff6b35;           /* Change this to your brand color */
--primary-foreground: #f8fafc; /* Text color on primary background */
```

### Secondary Colors
```css
--secondary: #f1f5f9;         /* Secondary background color */
--secondary-foreground: #0f172a; /* Text on secondary background */
```

### Background Colors
```css
--background: #ffffff;        /* Main page background */
--foreground: #0f172a;        /* Main text color */
```

## Example Color Schemes

### Blue Theme
```css
--primary: #3b82f6;
--primary-foreground: #ffffff;
--secondary: #dbeafe;
--secondary-foreground: #1e40af;
```

### Green Theme
```css
--primary: #10b981;
--primary-foreground: #ffffff;
--secondary: #d1fae5;
--secondary-foreground: #065f46;
```

### Purple Theme
```css
--primary: #8b5cf6;
--primary-foreground: #ffffff;
--secondary: #ede9fe;
--secondary-foreground: #5b21b6;
```

### Red Theme
```css
--primary: #ef4444;
--primary-foreground: #ffffff;
--secondary: #fee2e2;
--secondary-foreground: #991b1b;
```

## How to Apply Changes

1. Open `styles/globals.css`
2. Find the color you want to change in the `:root` section
3. Replace the hex code with your desired color
4. Save the file
5. The changes will apply immediately to your entire app

## Color Categories

### Essential Colors
- **Primary**: Your main brand color (buttons, links, highlights)
- **Secondary**: Supporting color (secondary buttons, backgrounds)
- **Background**: Main page background
- **Foreground**: Main text color

### UI Colors
- **Card**: Card and component backgrounds
- **Border**: All borders and dividers
- **Input**: Form input backgrounds and borders
- **Muted**: Subtle backgrounds and text

### Semantic Colors
- **Destructive**: Error states, delete actions
- **Accent**: Hover states, highlights
- **Ring**: Focus indicators

## Tips

- Use color contrast checkers to ensure accessibility
- Keep primary and secondary colors complementary
- Test in both light and dark modes
- Consider your brand guidelines when choosing colors

## Dark Mode

Dark mode colors are automatically adjusted for proper contrast. You can customize them in the `.dark` section of the CSS file. 