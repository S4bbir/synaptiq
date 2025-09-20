# SynaptiQ - AI Research Assistant

SynaptiQ is an advanced AI Research Assistant designed to help students and researchers achieve academic excellence through structured, human-like academic writing.

## Features

- **Academic Writing Workflow**: Follows a structured approach including brainstorming, mind mapping, outline creation, thesis development, research sourcing, drafting, and final editing.
- **3D Animated Background**: Immersive 3D visualization using Three.js and React Three Fiber.
- **Dark Theme Interface**: Modern dark-themed UI with transparent chatboxes to showcase the background animation.
- **Gemini AI Integration**: Powered by Google's Gemini AI for intelligent academic assistance.
- **APA 7th Edition Compliance**: Generates properly formatted academic content with citations and references.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd orano
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Deployment

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── page.tsx         # Main application page
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── AnimatedBackground.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── services/            # API services
│   └── aiService.ts
├── store/               # Zustand store
│   └── chatStore.ts
└── types/               # TypeScript types
```

## Key Components

### Animated Background
Implements a 3D particle system using Three.js to create an immersive background experience.

### Chat Interface
Features transparent chatboxes with backdrop blur effects to allow visibility of the background animation while maintaining text readability.

### AI Service
Integrates with the Gemini API to provide intelligent academic assistance following a structured workflow.

## Customization

### Theme
The application uses a dark theme by default. Theme variables can be modified in `src/app/globals.css`.

### Styling
The application uses Tailwind CSS for styling. Custom styles can be added to `src/app/globals.css`.

## API Integration

The application integrates with the Gemini API using the `gemini-2.5-flash-lite` model. API key is configured in `src/services/aiService.ts`.

## Dependencies

- Next.js 15.5.3
- React 19.1.0
- Three.js (^0.180.0)
- @react-three/fiber (^9.3.0)
- @react-three/drei (^10.7.6)
- Tailwind CSS (^4)
- TypeScript (^5)
- Zustand (for state management)

## Development Tools

- Turbopack for fast development
- ESLint for code quality
- TypeScript for type safety

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini API for AI capabilities
- Three.js and React Three Fiber for 3D visualizations
- Tailwind CSS for styling