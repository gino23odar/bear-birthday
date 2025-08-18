// API Types
export interface GenerateRequest {
  model: string;
  type: 'text' | 'image';
  prompt: string;
  options: {
    max_tokens: number;
    temperature: number;
    seed?: number | null;
    image_width: number;
    image_height: number;
  };
}

export interface GenerateResponse {
  id: string;
  status: 'completed' | 'processing' | 'failed';
  result: {
    type: 'text' | 'image';
    text?: string;
    imageBase64?: string;
    mime?: string;
  };
}

export interface StatusResponse {
  id: string;
  status: 'completed' | 'processing' | 'failed';
  result?: {
    type: 'text' | 'image';
    text?: string;
    imageBase64?: string;
    mime?: string;
  };
}

// Component Props
export interface BirdCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  habitat: string;
}

export interface SvinkaCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  personality: string;
}

export interface FortuneCardProps {
  id: string;
  message: string;
  theme: string;
  isRevealed?: boolean;
}

export interface LLMPlaygroundProps {
  // Add props if needed
}

// Trip Types
export interface Trip {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  images: TripImage[];
  createdAt: string;
  updatedAt: string;
}

export interface TripImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  uploadedAt: string;
}

export interface CreateTripRequest {
  title: string;
  description: string;
  location: string;
  date: string;
}

export interface UploadImageRequest {
  tripId: string;
  image: File;
  caption?: string;
}

// Mock Data
export interface MockData {
  birds: BirdCardProps[];
  svinkas: SvinkaCardProps[];
  fortuneMessages: Omit<FortuneCardProps, 'id'>[];
  samplePrompts: string[];
}
