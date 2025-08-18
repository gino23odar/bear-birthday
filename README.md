# 🐻 Birthday Bear - A Special Birthday Website

A beautiful, polished Next.js website created with love for a philologist who finds poetry in nature, rivers, birds, and tiny creatures called "svinkas".

## ✨ What I Built

- **Modern Next.js 15 Application** with TypeScript and TailwindCSS
- **Beautiful, Responsive UI** with smooth animations using Framer Motion
- **LLM Playground** that can connect to local ComfyUI + WAN 2.2 models
- **Interactive Fortune Cards** with shuffle animations and poetic messages
- **Gallery** showcasing birds and svinkas with lightbox viewing
- **Trips Page** for creating and managing travel memories with image uploads
- **Mock Backend System** for development and demonstration
- **Complete API Contract** for easy backend integration
- **Production-Ready** with proper error handling and accessibility

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd birthday-bear

# Install dependencies
npm install

# Start development server
npm run dev
```

The website will be available at `http://localhost:3000`

## 📁 Project Structure

```
birthday-bear/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and API client
│   ├── types/              # TypeScript type definitions
│   ├── mocks/              # Mock data for development
│   └── styles/             # Global styles and Tailwind config
├── public/
│   └── assets/             # SVG placeholders and images
├── tests/                  # Test files (to be implemented)
└── README.md               # This file
```

## 🎨 Design Features

- **Color Palette**: Soft lilac (#D9A8FF), warm coral (#FFB4A2), charcoal (#1E293B)
- **Typography**: Inter and Poins fonts for modern, readable text
- **Animations**: Smooth entrance animations, hover effects, and micro-interactions
- **Responsive**: Mobile-first design that works beautifully on all devices
- **Accessibility**: Proper ARIA labels, keyboard navigation, and contrast ratios

## 🗺️ Trips Feature

### What It Does
The **Trips page** allows you to:
- **Create new trips** with titles, descriptions, locations, and dates
- **Upload images** for each trip (currently using mock uploads)
- **Organize memories** by location and date
- **View trip galleries** with lightbox image viewing
- **Manage your adventures** with edit and delete functionality

### Image Upload System
Currently uses a **mock API** that returns placeholder images. When ready for production:

1. **Sign up for Cloudinary** (free tier available)
2. **Configure environment variables** (see `CLOUDINARY_SETUP.md`)
3. **Update the API route** to use real Cloudinary uploads

### Getting Started
1. Navigate to `/trips` in your browser
2. Click "Create New Trip" to add your first adventure
3. Use "Add Photo" to include images (currently mock)
4. Click "View Trip" to see your memories in a gallery

## 🔌 Backend Integration

### Current Status
The website runs with **mock data by default** for immediate use and demonstration.

### Connecting to Real Backend
To connect to your local ComfyUI + WAN 2.2 setup:

1. **Set Environment Variable**:
   ```bash
   echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8000" > .env.local
   ```

2. **Restart the development server**:
   ```bash
   npm run dev
   ```

### API Contract

#### Base URL
- Environment Variable: `NEXT_PUBLIC_API_BASE_URL`
- Default: `http://localhost:8000`

#### Endpoints

**POST /api/v1/generate**
Generate text or images using local models.

```json
Request Body:
{
  "model": "wan-2.2",
  "type": "text" | "image",
  "prompt": "string",
  "options": {
    "max_tokens": 512,
    "temperature": 0.7,
    "seed": null,
    "image_width": 512,
    "image_height": 512
  }
}
```

**Response (200)**:
```json
{
  "id": "uuid",
  "status": "completed",
  "result": {
    "type": "text",
    "text": "the output text..."
  }
}
```

**GET /api/v1/status/:id**
Check job status and retrieve results.

```json
Response:
{
  "id": "uuid",
  "status": "completed" | "processing" | "failed",
  "result": {
    "type": "text" | "image",
    "text": "output text...",
    "imageBase64": "<base64data>",
    "mime": "image/png"
  }
}
```

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Adding New Features
1. **Components**: Add to `src/components/`
2. **Pages**: Add to `src/app/`
3. **Types**: Extend `src/types/index.ts`
4. **API**: Modify `src/lib/api.ts`

### Customization
- **Colors**: Update `tailwind.config.ts`
- **Content**: Modify `src/mocks/data.ts`
- **Styling**: Edit `src/app/globals.css`

## 🔒 Security Considerations

### Local Development
- This setup is designed for **local development only**
- Exposing a local LLM to the internet is **insecure**

### Remote Access
For secure remote access, consider:
- **ngrok** with authentication
- **SSH tunnels** with proper key management
- **VPN** connections
- **API key authentication** for production use

### CORS Configuration
Ensure your backend allows requests from the frontend origin:
```python
# Example Python/Flask CORS setup
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
```

## 🎯 Next Steps

1. **Implement Backend**: Create the API endpoints in your ComfyUI setup
2. **Test Integration**: Verify the LLM Playground works with real models
3. **Customize Content**: Replace placeholder images and add your own content
4. **Deploy**: When ready, deploy the frontend (remember to secure the backend)
5. **Enhance**: Add more features like user authentication, model selection, etc.

## 📝 Sample Prompts

The LLM Playground includes sample prompts tailored for a philologist:

- "Write a short, lyrical birthday message in Russian and English, each 3–4 lines, that references birds, the countryside, and a river. Use sophisticated but tender language suitable for a philologist."
- "Create a poetic description of a morning by the river, with birds singing and the gentle sound of water. Use rich, evocative language."

## 🤝 Contributing

This is a personal birthday project, but feel free to:
- Report bugs or issues
- Suggest improvements
- Fork and customize for your own needs

## 📄 License

This project is created for personal use. The placeholder SVG images are simple geometric shapes and can be freely replaced with your own assets.

## 🎉 Happy Birthday, Bear! 🐻

May this website bring joy and inspiration, just like the birds, rivers, and tiny svinkas that bring beauty to our world.

---

*Built with ❤️ using Next.js, TypeScript, TailwindCSS, and Framer Motion*
