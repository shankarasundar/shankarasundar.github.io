// Downscales/recompresses an image file in the browser before upload — keeps
// real phone photos well under the server's request-size limit and keeps
// the site fast, without needing any server-side image processing.

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function slugifyFilename(name) {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "photo"}.jpg`;
}

export async function resizeImageFile(file, { maxDimension = 1600, quality = 0.82 } = {}) {
  const img = await loadImage(file);
  URL.revokeObjectURL(img.src);

  const scale = Math.min(1, maxDimension / Math.max(img.width, img.height));
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(img, 0, 0, width, height);

  const dataUrl = canvas.toDataURL("image/jpeg", quality);
  const dataBase64 = dataUrl.slice(dataUrl.indexOf(",") + 1);

  return { dataBase64, filename: slugifyFilename(file.name) };
}
