
export const convertFileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve({ base64: reader.result, mimeType: file.type });
      } else {
        reject(new Error("Failed to read file as Base64 string."));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
