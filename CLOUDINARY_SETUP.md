# Cloudinary Setup Guide

## What is Cloudinary?

Cloudinary is a cloud-based service that provides solutions for image and video management. It offers a generous free tier that's perfect for personal projects like Birthday Bear.

## Free Tier Benefits

- **25 GB storage**
- **25 GB monthly bandwidth**
- **25 GB monthly transformations**
- **No credit card required**
- **Automatic image optimization**
- **CDN delivery worldwide**

## Setup Steps

### 1. Create Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Click "Sign Up For Free"
3. Fill in your details and create account

### 2. Get Your Credentials

After signing up, you'll be taken to your dashboard. Look for:

- **Cloud Name** (e.g., `myapp123`)
- **API Key** (e.g., `123456789012345`)
- **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

### 3. Configure Environment Variables

Copy `env.example` to `.env.local` and fill in your credentials:

```bash
cp env.example .env.local
```

Edit `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

### 4. Test the Setup

1. Restart your development server
2. Go to the Trips page
3. Try uploading an image
4. Check the browser console for any errors

## How It Works

### Current Implementation

The app currently uses a mock API that returns placeholder images. When you're ready to use Cloudinary:

1. **Update the API route** in `src/app/api/upload/route.ts`
2. **Replace the mock response** with actual Cloudinary upload
3. **Use the Cloudinary helper functions** from `src/lib/cloudinary.ts`

### Example Upload Flow

```typescript
// In your API route
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('image') as File;
  
  // Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());
  
  // Upload to Cloudinary
  const result = await uploadImage(buffer, {
    folder: 'birthday-bear/trips',
    transformation: [
      { width: 800, height: 600, crop: 'fill', quality: 'auto' }
    ]
  });
  
  return NextResponse.json({
    success: true,
    image: {
      id: result.public_id,
      url: result.secure_url,
      // ... other fields
    }
  });
}
```

## Security Considerations

- **Never expose your API secret** in client-side code
- **Use environment variables** for all sensitive data
- **Set up proper CORS** if needed
- **Validate file types and sizes** on both client and server
- **Consider rate limiting** for production use

## Alternative Services

If you prefer other options:

- **AWS S3** - More complex but very powerful
- **Firebase Storage** - Good Google ecosystem integration
- **Supabase Storage** - Open source alternative
- **Local storage** - For development only

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Double-check your environment variables
   - Ensure `.env.local` is in the project root
   - Restart your development server

2. **"File too large" error**
   - Check the file size limit in your API route
   - Compress images before upload if needed

3. **CORS errors**
   - The API route includes CORS headers
   - Check browser console for specific errors

### Getting Help

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary Support](https://support.cloudinary.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## Next Steps

Once Cloudinary is working:

1. **Customize image transformations** (resize, crop, filters)
2. **Add image optimization** (WebP, AVIF formats)
3. **Implement image deletion** when trips are removed
4. **Add image galleries** with lazy loading
5. **Set up backup strategies** for important images


