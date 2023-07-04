export const FileParser = (file) => {
  return new Promise((resolve, reject) => {
    if (typeof file === "string") {
      resolve(file);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    }
  });
};
