import pdf2img from 'pdf-img-convert';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { promises as fs } from 'fs';
import stream from 'stream';
// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dr3buczbc',
  api_key: '831329449195399',
  api_secret: 'btaBipINGy-1682Mzut_cMwr9qk'
});

export async function convertPDFToImagesAndUpload(pdfPath: string): Promise<string[]> {
    try {
        const outputImages = await pdf2img.convert(pdfPath);
        const imageUrls: string[] = [];

        for (let i = 0; i < outputImages.length; i++) {
            const imageData = outputImages[i]; // Get image data (this may not necessarily be a Buffer)

            // Convert image data to a format suitable for upload (if necessary)
            // For example, if imageData is a Buffer, you can directly upload it.
            // If not, you may need to convert it to a suitable format.
            // You might also need to adjust this part based on the actual data type of imageData.

            // Create a promise to handle the upload and get the URL
            const uploadPromise = new Promise<string>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder: 'images',
                    public_id: `image${i}`,
                    overwrite: true
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else if (result) {
                        resolve(result.secure_url);
                    } else {
                        reject('Upload failed, result is undefined.');
                    }
                });

                // Pipe image data directly to Cloudinary upload stream
                // Adjust this part based on the actual data type of imageData
                // For example, if imageData is a URL, you might need to download the image first.
                // If imageData is already in a suitable format, you can directly pipe it.
                // Here, we assume imageData is a Buffer for simplicity.
                const imageStream = new stream.PassThrough(); // Create a new pass-through stream
                imageStream.end(imageData); // Write image data to the stream
                imageStream.pipe(uploadStream); // Pipe image data to Cloudinary upload stream
            });

            // Wait for the upload to finish and get the URL
            const imageUrl = await uploadPromise;
            imageUrls.push(imageUrl);
        }

        return imageUrls;
    } catch (error) {
        console.error("Error converting PDF to images: ", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
}



export async function changeName(oldFileName: string,account_number: string, pageIndex: number): Promise<void> {
    try {
 
            
            const newFileName = `./uploads/${account_number}_${pageIndex}.pdf`;
            await fs.rename(oldFileName, newFileName);
            console.log(`File renamed: ${oldFileName} -> ${newFileName}`);
       
    } catch (error) {
        console.error('Error renaming file:', error);
    }
}

