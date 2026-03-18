const imageCache = new Map();

export const getBlobUrl = async (imageUrl: string) => {
  if (imageCache.has(imageUrl)) {
    return imageCache.get(imageUrl);
  }

  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);

  imageCache.set(imageUrl, objectURL);
  return objectURL;
};

export const cleanupBlobUrl = (imageUrl: string) => {
  const url = imageCache.get(imageUrl);
  if (url) {
    URL.revokeObjectURL(url);
    imageCache.delete(imageUrl);
  }
};
