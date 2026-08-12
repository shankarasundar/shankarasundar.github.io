import { useRef, useState } from "react";
import { useEditMode } from "./EditModeContext.jsx";
import { uploadImage } from "./api.js";
import { resizeImageFile } from "./imageResize.js";

// A single-image picker: shows a thumbnail + "Change"/"Remove" once an image
// is set, or an "Add photo" button when empty. Resizes client-side, uploads
// via the shared API, and calls onChange with the new public path (or null).
export function ImageUpload({ site, value, onChange, label = "Add photo" }) {
  const { apiBase, isEditMode } = useEditMode();
  const inputRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | error

  if (!isEditMode) return null;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    setStatus("uploading");
    try {
      const { dataBase64, filename } = await resizeImageFile(file);
      const result = await uploadImage(apiBase, site, filename, dataBase64);
      onChange(result.path);
      setStatus("idle");
    } catch (err) {
      console.error("Image upload failed:", err);
      setStatus("error");
    }
  };

  return (
    <div className="ek-image-upload">
      {value && (
        <div className="ek-image-upload-preview">
          <img src={value} alt="" />
        </div>
      )}
      <div className="ek-image-upload-controls">
        <button type="button" onClick={() => inputRef.current?.click()} disabled={status === "uploading"}>
          {status === "uploading" ? "Uploading…" : value ? "Change photo" : label}
        </button>
        {value && (
          <button type="button" className="ek-image-upload-remove" onClick={() => onChange(null)}>
            Remove
          </button>
        )}
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
      </div>
      {status === "error" && <p className="ek-image-upload-error">Upload failed — try a smaller photo.</p>}
    </div>
  );
}
