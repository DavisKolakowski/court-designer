# Court Designer

A customizable sports court design application built with React, TypeScript, and Tailwind CSS. This interactive tool allows users to visualize and customize different types of sports courts including basketball, tennis, and pickleball.

![Court Designer Screenshot](https://via.placeholder.com/800x400?text=Court+Designer+Screenshot)

## Features

- 🏀 Multiple court types (Basketball, Tennis, Pickleball)
- 🎨 Extensive color customization with preset color palettes
- 🧩 Customizable court elements (lines, playing areas, specific zones)
- 📊 Court overlays to visualize multiple sport layouts on a single court
- 📱 Responsive design for both desktop and mobile
- 📧 Export designs via email for further consultation

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Court Types](#court-types)
- [Customization Options](#customization-options)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Development](#development)
- [License](#license)

## Installation

To run this project locally, follow these steps:

```bash
# Clone the repository (if using git)
git clone <repository-url>

# Navigate to the project directory
cd court-designer

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port) in your browser.

## Usage

1. **Landing Page**: Select your desired court type (Basketball, Tennis, or Pickleball)
2. **Designer View**: Customize your court using the sidebar options:
   - Choose court elements to modify
   - Select colors from the color palettes
   - Toggle court accessories (nets, hoops)
   - Add overlay lines from other court types
3. **Export**: Click "Request Quote" to send your specifications for consultation

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
│   ├── ColorPicker.tsx        # Color selection component
│   ├── CourtDesigner.tsx      # Main designer component
│   ├── CourtSVG.tsx           # SVG rendering for courts
│   ├── LandingPage.tsx        # Initial court selection page
│   └── Sidebar.tsx            # Control panel for customization
│
├── data/                      # Static data
│   ├── colors.ts              # Color palette definitions
│   └── svg-template.ts        # SVG templates for courts
│
├── lib/                       # Utility functions
│   └── utils.ts               # Helper utilities
│
├── types/                     # TypeScript type definitions
│   └── court.ts               # Court-related types
│
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles
```

## Technologies Used

- **React**: UI library for building component-based interfaces
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool and development server
- **Lucide React**: Icon library
- **SVG**: Vector graphics for court rendering

## Development

### Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm run type-check`: Run TypeScript type checking

### Adding New Court Types

To add a new court type:

1. Update the `CourtType` type in `src/types/court.ts`
2. Add new element types in `src/types/court.ts`
3. Create SVG rendering logic in `CourtSVG.tsx`
4. Update the sidebar options in `Sidebar.tsx`
5. Add default colors in `CourtDesigner.tsx`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
