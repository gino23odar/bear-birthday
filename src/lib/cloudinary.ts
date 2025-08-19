import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
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

/**
 * Minimal typed shape we expect from Cloudinary's upload response.
 * We keep this deliberately narrow to avoid using `any` while still
 * being practical.
 */
interface CloudinaryUploadResponse {
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
    transformation?: Array<Record<string, unknown>>;
    public_id?: string;
  } = {}
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder ?? 'birthday-bear',
        transformation:
          options.transformation ?? [
            { width: 800, height: 600, crop: 'fill', quality: 'auto' },
          ],
        public_id: options.public_id,
      },
      // Use `unknown` and then narrow to our typed shape before use.
      (error: unknown, result: unknown) => {
        if (error) {
          // prefer Error if available, otherwise wrap
          if (error instanceof Error) reject(error);
          else reject(new Error(String(error)));
          return;
        }

        if (result) {
          const r = result as CloudinaryUploadResponse;
          resolve({
            public_id: r.public_id,
            secure_url: r.secure_url,
            width: r.width,
            height: r.height,
            format: r.format,
            resource_type: r.resource_type,
          });
        } else {
          reject(new Error('Upload failed: empty result'));
        }
      }
    );

    uploadStream.end(file);
  });
};

export const deleteImage = async (publicId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // mark unused second param with leading underscore to satisfy eslint/no-unused-vars
    cloudinary.uploader.destroy(publicId, (error: unknown, _result: unknown) => {
      if (error) {
        if (error instanceof Error) reject(error);
        else reject(new Error(String(error)));
      } else {
        resolve();
      }
    });
  });
};

export default cloudinary;



