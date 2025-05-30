# Court Designer

A customizable sports court design application built with React, TypeScript, and Tailwind CSS. This interactive tool allows users to visualize and customize different types of sports courts including basketball, tennis, and pickleball. Deployed on Azure Static Web Apps.

![Court Designer Screenshot](https://via.placeholder.com/800x400?text=Court+Designer+Screenshot)

## Features

- 🏀 **Multiple Court Types**: Basketball, Tennis, and Pickleball courts with accurate dimensions
- 🎨 **Extensive Color Customization**: Two distinct color palettes (Player's Choice and Specialty Colors)
- 🧩 **Element-Specific Customization**: Customize individual court elements (lines, playing areas, specific zones)
- 📊 **Court Overlays**: Visualize multiple sport layouts on a single court
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices with dedicated mobile UI
- 📧 **Quote Request System**: Email integration for design consultations
- 🎯 **Accessories Toggle**: Show/hide sport-specific equipment (hoops, nets)
- 💾 **State Persistence**: Design state saved locally and shareable via URL
- ⚡ **Fast Performance**: Built with Vite for optimal loading speeds

## Table of Contents

- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Usage](#usage)
- [Court Types](#court-types)
- [Customization Options](#customization-options)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

## Installation

To run this project locally, follow these steps:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd court-designer

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` in your browser.

## Environment Configuration

This application uses environment variables for configuration:

### Local Development

Create a `.env` file in the root directory:

```env
VITE_QUOTE_EMAIL=your-email@example.com
```

### Azure Static Web Apps

Configure environment variables in the Azure portal under Configuration > Application settings:

- `VITE_QUOTE_EMAIL`: Email address for quote requests

For more details, see [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md).

## Usage

### Getting Started

1. **Landing Page**: Visit the application and select your desired court type (Basketball, Tennis, or Pickleball)

2. **Design Interface**: 
   - **Desktop**: Use the sidebar panel for customization options
   - **Mobile**: Tap "Customize" to access the design controls in a mobile-optimized drawer

3. **Customization Process**:
   - Select court elements to modify from the element list
   - Choose colors from the Player's Choice or Specialty color palettes
   - Toggle court accessories (nets, hoops) on/off
   - Add overlay lines from other court types for multi-purpose designs

4. **Share & Export**: 
   - Design state is automatically saved and shareable via URL
   - Click "Request Quote" to email your specifications for consultation

### Mobile Experience

The application provides a dedicated mobile interface with:
- Touch-optimized controls
- Mobile-specific drawer navigation
- Responsive court visualization
- One-handed operation support

## Court Types

### Basketball Court
- Regulation size: 94' x 50'
- Customizable elements:
  - Base background
  - Playing area
  - Court lines
  - Three-point area
  - Center circle
  - Three-second area

### Tennis Court
- Regulation size: 78' x 36'
- Customizable elements:
  - Base background
  - Playing area
  - Court lines

### Pickleball Court
- Regulation size: 44' x 20'
- Customizable elements:
  - Base background
  - Kitchen area
  - Service area
  - Court lines

## Customization Options

### Color Palettes

The application offers two distinct color palettes:

#### Player's Choice Colors
Standard colors commonly used in court designs including greens, blues, reds, and neutral tones.

#### Specialty Colors
Vibrant and unique colors for distinctive court designs including bright purples, pinks, yellows, and more.

### Court Elements

Each court type has specific elements that can be individually colored:
- Base background (surrounds the court)
- Playing areas
- Court lines
- Sport-specific zones (three-point area, kitchen, etc.)

### Accessories

Toggle visibility of sport-specific accessories:
- Basketball hoops
- Tennis net
- Pickleball net

### Overlays

Add overlay lines from other court types to visualize multi-purpose court layouts. For example:
- Basketball court with pickleball lines overlay
- Tennis court with basketball lines overlay

## Project Structure

```
src/
├── components/                # React components
│   ├── court/                # Court visualization components
│   │   ├── CourtDisplay.tsx   # Main court display container
│   │   └── CourtSVG.tsx       # SVG rendering for courts
│   │
│   ├── design/               # Design interface components
│   │   └── DesignSidebar.tsx  # Desktop design sidebar
│   │
│   ├── landing/              # Landing page components
│   │   ├── LandingHeader.tsx  # Landing page header
│   │   └── LandingPage.tsx    # Main landing page
│   │
│   ├── layout/               # Layout components
│   │   └── DesignLayout.tsx   # Main design interface layout
│   │
│   ├── quote/                # Quote request components
│   │   ├── ContactInformationForm.tsx
│   │   ├── DesignSummaryDisplay.tsx
│   │   └── QuoteDialog.tsx
│   │
│   ├── shared/               # Shared/reusable components
│   │   ├── ColorPicker.tsx
│   │   ├── CourtDropdown.tsx
│   │   ├── CourtSelectionButton.tsx
│   │   ├── CourtSelectionGrid.tsx
│   │   ├── MobileBackdrop.tsx
│   │   └── MobileHeader.tsx
│   │
│   ├── sidebar/              # Sidebar components
│   │   ├── AccessoriesToggle.tsx
│   │   ├── CourtOverlaysSection.tsx
│   │   ├── ElementSelection.tsx
│   │   └── SidebarHeader.tsx
│   │
│   ├── ui/                   # UI components
│   │   ├── Button.tsx
│   │   ├── Drawer.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── index.ts
│   │
│   └── CourtDesigner.tsx     # Main designer component
│
├── config/                   # Configuration files
│   └── app.ts                # Application configuration
│
├── data/                     # Static data
│   └── colors.ts             # Color palette definitions
│
├── hooks/                    # Custom React hooks
│   ├── useCourtDesign.ts     # Court design state management
│   ├── useDesignInteractions.ts # Design interaction handlers
│   ├── useDesignUrlState.ts  # URL state synchronization
│   └── useMobileDetection.ts # Mobile device detection
│
├── lib/                      # Utility functions
│   └── utils.ts              # Helper utilities
│
├── types/                    # TypeScript type definitions
│   └── court.ts              # Court-related types
│
├── utils/                    # Utility functions
│   ├── courtHelpers.ts       # Court-specific helpers
│   └── quoteGenerator.ts     # Quote request generation
│
├── App.tsx                   # Main application component
├── index.css                 # Global styles with Tailwind
├── main.tsx                  # Application entry point
└── vite-env.d.ts            # Vite environment type definitions
```

## Technologies Used

- **React 18**: Modern UI library with hooks and functional components
- **TypeScript**: Type-safe JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing for multi-page navigation
- **Lucide React**: Modern icon library
- **React Icons**: Additional icon library
- **SVG**: Vector graphics for scalable court rendering
- **Azure Static Web Apps**: Cloud hosting and deployment platform
- **Local Storage**: Client-side state persistence

## Development

### Available Scripts

- `npm run dev`: Start the development server with hot reload
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm run type-check`: Run TypeScript type checking

### Development Workflow

1. **Design State Management**: The application uses a comprehensive state management system with local storage persistence
2. **Mobile-First Approach**: Components are designed with mobile responsiveness as a priority
3. **Modular Architecture**: Components are organized by feature and reusability
4. **Type Safety**: Full TypeScript coverage for better maintainability

### Adding New Court Types

To add a new court type:

1. Update the `CourtType` type in `src/types/court.ts`
2. Add new element types for the court in `src/types/court.ts`
3. Create SVG rendering logic in `src/components/court/CourtSVG.tsx`
4. Update court helpers in `src/utils/courtHelpers.ts`
5. Add default colors in the design system
6. Update element selection components

### Adding New Features

1. **New Color Palettes**: Add to `src/data/colors.ts`
2. **New UI Components**: Add to `src/components/ui/`
3. **New Hooks**: Add to `src/hooks/`
4. **Configuration Options**: Update `src/config/app.ts`

## Deployment

### Azure Static Web Apps

The application is configured for deployment on Azure Static Web Apps:

1. **Automatic Deployment**: GitHub Actions workflow handles CI/CD
2. **Environment Variables**: Configure in Azure portal
3. **Custom Domain**: Support for custom domains
4. **SSL**: Automatic SSL certificate management

### Build Configuration

- **Output Directory**: `dist/`
- **Build Command**: `npm run build`
- **Node Version**: 20.x
- **Framework**: Vite (React)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
