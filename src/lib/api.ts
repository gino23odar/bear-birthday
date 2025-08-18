import { GenerateRequest, GenerateResponse, StatusResponse } from '@/types';

// Environment variable for backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Toggle to switch between mock and real backend
const USE_MOCK = !process.env.NEXT_PUBLIC_API_BASE_URL;

// Mock API responses
const mockGenerateResponse = (request: GenerateRequest): Promise<GenerateResponse> => {
  const delay = Math.random() * 1000 + 1000; // 1-2 seconds
  
  return new Promise<GenerateResponse>((resolve) => {
    setTimeout(() => {
      if (request.type === 'text') {
        resolve({
          id: `mock-${Date.now()}`,
          status: 'completed',
          result: {
            type: 'text',
            text: `Mock response to: "${request.prompt}"\n\nThis is a simulated response from the local LLM. When you connect to the real backend, this will be replaced with actual model output.\n\nModel: ${request.model}\nTemperature: ${request.options.temperature}\nMax tokens: ${request.options.max_tokens}`
          }
        });
      } else {
        // Mock image response with a placeholder SVG
        const placeholderSvg = `<svg width="${request.options.image_width}" height="${request.options.image_height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f0f0f0"/>
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666" font-family="Arial" font-size="16">
            Mock Image: ${request.prompt.substring(0, 30)}...
          </text>
        </svg>`;
        
        resolve({
          id: `mock-${Date.now()}`,
          status: 'completed',
          result: {
            type: 'image',
            imageBase64: btoa(placeholderSvg),
            mime: 'image/svg+xml'
          }
        });
      }
    }, delay);
  });
};

// Real API functions
const realGenerate = async (request: GenerateRequest): Promise<GenerateResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

const realGetStatus = async (id: string): Promise<StatusResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/status/${id}`);
  
  if (!response.ok) {
    throw new Error(`Status request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Public API functions
export const generateContent = async (request: GenerateRequest): Promise<GenerateResponse> => {
  if (USE_MOCK) {
    return mockGenerateResponse(request);
  }
  
  return realGenerate(request);
};

export const getStatus = async (id: string): Promise<StatusResponse> => {
  if (USE_MOCK) {
    throw new Error('Status checking not available in mock mode');
  }
  
  return realGetStatus(id);
};

// Utility function to check if we're using mock mode
export const isMockMode = () => USE_MOCK;

// Helper to get the current API configuration
export const getApiConfig = () => ({
  baseUrl: API_BASE_URL,
  isMock: USE_MOCK,
  hasBackend: !USE_MOCK,
});
