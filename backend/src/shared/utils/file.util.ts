import { Readable } from 'stream';

/**
 * File format validation (case-insensitive).
 */
export function validateFileFormat(
  filename: string,
  allowedFileFormats: string[],
) {
  const fileParts = filename.split('.');
  const extension = fileParts[fileParts.length - 1]?.toLowerCase();

  return extension
    ? allowedFileFormats.map(f => f.toLowerCase()).includes(extension)
    : false;
}

/**
 * File size validation.
 * WARNING: This function consumes the stream. Use it only if you plan to work with Buffer
 * after validation or if the stream can be recreated.
 */
export async function validateFileSize(
  fileStream: Readable,
  allowedFileSizeInBytes: number,
) {
  return new Promise((resolve, reject) => {
    let fileSizeInBytes = 0;

    fileStream
      .on('data', (data: Buffer) => {
        fileSizeInBytes += data.byteLength;
        if (fileSizeInBytes > allowedFileSizeInBytes) {
          // Destroy the stream if the limit is exceeded to avoid reading extra data
          fileStream.destroy();
          resolve(false);
        }
      })
      .on('end', () => {
        resolve(true);
      })
      .on('error', err => {
        reject(err);
      });
  });
}
