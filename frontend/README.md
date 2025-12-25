# PregnancyCare Frontend

A modern, responsive React frontend for the AI-powered pregnancy risk assessment system.

## Features

- 🎨 **Modern UI Design** - Clean, professional interface with Tailwind CSS
- 🌓 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- ⚡ **Smooth Animations** - Powered by Framer Motion for delightful interactions
- 🔒 **Type Safety** - Built with modern React patterns and best practices
- 🎯 **Accessibility** - WCAG compliant components and navigation
- 🚀 **Performance Optimized** - Lazy loading and optimized bundle size

## Tech Stack

- **React 18** - Latest React with concurrent features
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful, customizable icons
- **React Router** - Declarative routing
- **Axios** - Promise-based HTTP client
- **React Hot Toast** - Notification system

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_BASE_URL=http://localhost:8000
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx      # Custom button component
│   ├── Card.jsx        # Card container component
│   ├── Input.jsx       # Form input component
│   ├── Navbar.jsx      # Navigation bar
│   ├── Footer.jsx      # Footer component
│   └── ThemeToggle.jsx # Dark/light mode toggle
├── pages/              # Page components
│   ├── LandingPage.jsx # Home/landing page
│   └── AssessmentPage.jsx # Risk assessment form
├── hooks/              # Custom React hooks
│   └── useTheme.js     # Theme management hook
├── utils/              # Utility functions
│   └── api.js          # API service layer
├── App.js              # Main app component
├── index.js            # App entry point
└── index.css           # Global styles and Tailwind imports
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## API Integration

The frontend communicates with the FastAPI backend through the API utility:

```javascript
import { pregnancyAPI } from "../utils/api";

// Get risk assessment
const result = await pregnancyAPI.predict(formData);

// Send WhatsApp alert
await pregnancyAPI.sendAlert(riskLevel);
```

## UI Components

### Button Component

```jsx
<Button variant="primary" size="lg" loading={isLoading}>
  Analyze Risk
</Button>
```

### Card Component

```jsx
<Card hover={true} className="custom-class">
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

### Input Component

```jsx
<Input
  label="Patient Age"
  name="age"
  type="number"
  required
  error={errors.age}
  onChange={handleChange}
/>
```

## Theme System

The app supports automatic dark/light mode detection and manual toggling:

```javascript
import { useTheme } from "../hooks/useTheme";

const { isDark, toggleTheme } = useTheme();
```

## Customization

### Colors

Modify the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your primary color shades
  },
  secondary: {
    // Your secondary color shades
  }
}
```

### Animations

Add custom animations in `tailwind.config.js`:

```javascript
animation: {
  'custom-bounce': 'customBounce 1s ease-in-out infinite',
},
keyframes: {
  customBounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  }
}
```

## Performance Optimization

- **Code Splitting** - Routes are automatically split
- **Image Optimization** - Lazy loading for images
- **Bundle Analysis** - Run `npm run build -- --analyze`
- **Caching** - Service worker for offline support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

- Email: support@pregnancycare.com
- Documentation: [docs.pregnancycare.com](https://docs.pregnancycare.com)
- Issues: [GitHub Issues](https://github.com/pregnancycare/issues)
