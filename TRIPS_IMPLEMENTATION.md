# Trips Page Implementation

This document describes the enhanced Trips page with darker lilac tones and animated infinite image menu functionality.

## Overview

The Trips page has been updated with:

1. **Darker lilac theme** (`--primary-dark: #B580FF`) for the trips area
2. **"See collection" button** on each trip card
3. **Animated morph transition** from trip card to collection modal
4. **Infinite looping horizontal menu** for trip images
5. **Enhanced accessibility** and keyboard navigation

## New Components

### 1. TripCollectionModal

The main modal that opens when clicking "See collection".

**Props:**

```typescript
interface TripCollectionModalProps {
  trip: Trip; // The trip data
  onClose: () => void; // Function to close the modal
  layoutId: string; // Unique ID for framer-motion layout animation
}
```

**Usage:**

```tsx
<TripCollectionModal
  trip={selectedTrip}
  onClose={() => setShowModal(false)}
  layoutId={`trip-card-${trip.id}`}
/>
```

### 2. InfiniteCarousel

Handles the infinite looping horizontal menu with autoplay and drag functionality.

**Props:**

```typescript
interface InfiniteCarouselProps {
  images: TripImage[]; // Array of trip images
  onImageClick: (image: TripImage) => void; // Callback when image is clicked
  isPaused?: boolean; // Whether autoplay should be paused
}
```

**Features:**

- Autoplay: Images scroll continuously from right to left
- Drag to pan: Users can drag left/right to explore
- Pause on hover: Autoplay pauses when hovering over images
- Keyboard navigation: Arrow keys for navigation
- Responsive: Adapts to different screen sizes

### 3. ImageLightbox

Full-size image viewer with navigation controls.

**Props:**

```typescript
interface ImageLightboxProps {
  image: TripImage; // Current image to display
  images?: TripImage[]; // Optional array for navigation
  initialIndex?: number; // Starting image index
  onClose: () => void; // Function to close lightbox
  onNavigate?: (index: number) => void; // Callback for navigation
}
```

## CSS Variables

The new darker lilac color is available as:

```css
:root {
  --primary-dark: #b580ff; /* darker lilac for trips */
}
```

**Tailwind Usage:**

```tsx
className = "bg-primary-dark text-white";
className = "border-primary-dark/20";
className = "from-[var(--primary-dark)] via-[var(--accent)]";
```

## Implementation Details

### Layout Animation

Each trip card uses a unique `layoutId` for smooth morphing:

```tsx
<motion.div layoutId={`trip-card-${trip.id}`}>
  {/* Trip card content */}
</motion.div>
```

The modal uses the same `layoutId` to create the morph effect:

```tsx
<TripCollectionModal
  layoutId={`trip-card-${trip.id}`}
  // ... other props
/>
```

### Infinite Loop Technique

The carousel duplicates the images array and uses CSS transforms for seamless looping:

```tsx
const duplicatedImages = [...images, ...images];

// CSS animation moves the track left by 50% repeatedly
@keyframes loop-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### Performance Optimizations

- `will-change: transform` for smooth animations
- `loading="lazy"` and `decoding="async"` for images
- Conditional rendering based on image count
- Responsive behavior for mobile devices

## Accessibility Features

- **Keyboard navigation**: Arrow keys, Enter, Space, Escape
- **Screen reader support**: Proper ARIA labels and roles
- **Focus management**: Logical tab order
- **Reduced motion**: Respects `prefers-reduced-motion`
- **High contrast**: Meets accessibility standards

## Mobile Responsiveness

- Carousel adapts to smaller screens
- Touch-friendly drag interactions
- Optimized autoplay speed for mobile
- Vertical stacking when needed

## Testing

A test file is included at `src/components/__tests__/TripCollectionModal.test.tsx` that verifies:

- Component rendering
- Props handling
- Accessibility features
- Child component integration

## Usage Example

```tsx
import TripCollectionModal from "@/components/TripCollectionModal";

function TripsPage() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showCollection, setShowCollection] = useState(false);

  const openCollection = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowCollection(true);
  };

  return (
    <div>
      {/* Trip cards with "See collection" buttons */}
      {trips.map((trip) => (
        <button onClick={() => openCollection(trip)}>🖼️ See collection</button>
      ))}

      {/* Collection modal */}
      {showCollection && selectedTrip && (
        <TripCollectionModal
          trip={selectedTrip}
          onClose={() => setShowCollection(false)}
          layoutId={`trip-card-${selectedTrip.id}`}
        />
      )}
    </div>
  );
}
```

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Framer Motion for animations (fallback for older browsers)
- Progressive enhancement for core functionality

## Performance Notes

- Images are lazy-loaded for better performance
- Animation duration scales with content length
- Efficient re-renders with React hooks
- Minimal bundle size impact
