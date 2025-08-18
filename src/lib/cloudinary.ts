import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
// You'll need to set these environment variables:
// CLOUDINARY_CLOUD_NAME=your_cloud_name
// CLOUDINARY_API_KEY=your_api_key
// CLOUDINARY_API_SECRET=your_api_secret

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export const uploadImage = async (
  file: Buffer,
  options: {
    folder?: string;
    transformation?: any[];
    public_id?: string;
  } = {}
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'birthday-bear',
        transformation: options.transformation || [
          { width: 800, height: 600, crop: 'fill', quality: 'auto' }
        ],
        public_id: options.public_id,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type,
          });
        } else {
          reject(new Error('Upload failed'));
        }
      }
    );

    uploadStream.end(file);
  });
};

export const deleteImage = async (publicId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export default cloudinary;

