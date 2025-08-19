import { render, screen } from "@testing-library/react";
import TripCollectionModal from "../TripCollectionModal";
import { Trip, TripImage } from "@/types";

// Mock the child components
jest.mock("../InfiniteCarousel", () => {
  return function MockInfiniteCarousel({
    images,
    onImageClick,
  }: {
    images: TripImage[];
    onImageClick: (image: TripImage) => void;
  }) {
    return (
      <div data-testid="infinite-carousel">
        <div data-testid="image-count">{images.length} images</div>
        {images.map((image: TripImage) => (
          <button
            key={image.id}
            onClick={() => onImageClick(image)}
            data-testid={`image-${image.id}`}
          >
            {image.alt}
          </button>
        ))}
      </div>
    );
  };
});

jest.mock("../ImageLightbox", () => {
  return function MockImageLightbox({
    image,
    onClose,
  }: {
    image: TripImage;
    onClose: () => void;
  }) {
    return (
      <div data-testid="image-lightbox">
        <img src={image.url} alt={image.alt} />
        <button onClick={onClose} data-testid="close-lightbox">
          Close
        </button>
      </div>
    );
  };
});

const mockTrip: Trip = {
  id: "1",
  title: "Test Trip",
  description: "A test trip description",
  location: "Test Location",
  date: "2024-01-01",
  images: [
    {
      id: "1",
      url: "https://example.com/image1.jpg",
      alt: "Test Image 1",
      caption: "Test Caption 1",
      uploadedAt: "2024-01-01T00:00:00Z",
    },
    {
      id: "2",
      url: "https://example.com/image2.jpg",
      alt: "Test Image 2",
      caption: "Test Caption 2",
      uploadedAt: "2024-01-01T01:00:00Z",
    },
  ],
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

describe("TripCollectionModal", () => {
  it("renders trip information correctly", () => {
    const onClose = jest.fn();

    render(
      <TripCollectionModal
        trip={mockTrip}
        onClose={onClose}
        layoutId="test-layout-id"
      />
    );

    expect(screen.getByText("Test Trip")).toBeInTheDocument();
    expect(
      screen.getByText("📍 Test Location • 📅 1/1/2024 • 📸 2 images")
    ).toBeInTheDocument();
    expect(screen.getByText("A test trip description")).toBeInTheDocument();
  });

  it("renders infinite carousel with images", () => {
    const onClose = jest.fn();

    render(
      <TripCollectionModal
        trip={mockTrip}
        onClose={onClose}
        layoutId="test-layout-id"
      />
    );

    expect(screen.getByTestId("infinite-carousel")).toBeInTheDocument();
    expect(screen.getByTestId("image-count")).toHaveTextContent("2 images");
  });

  it("renders shuffle and close buttons", () => {
    const onClose = jest.fn();

    render(
      <TripCollectionModal
        trip={mockTrip}
        onClose={onClose}
        layoutId="test-layout-id"
      />
    );

    expect(screen.getByLabelText("Shuffle images")).toBeInTheDocument();
    expect(screen.getByLabelText("Close collection")).toBeInTheDocument();
  });
});
