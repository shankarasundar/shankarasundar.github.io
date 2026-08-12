import { useEditMode } from "./EditModeContext.jsx";

// Renders `as` (default "span") with no extra wrapper in either mode — a
// wrapper div here would break the mobile display:contents + order reorder
// trick that App.css relies on. In edit mode the same tag just gains
// contentEditable + an onBlur commit; the DOM shape never changes.
export function EditableText({ as: Tag = "span", value, onChange, className, ...rest }) {
  const { isEditMode } = useEditMode();

  if (!isEditMode) {
    return (
      <Tag className={className} {...rest}>
        {value}
      </Tag>
    );
  }

  const handleBlur = (e) => {
    const next = e.target.innerText.trim();
    if (next !== value) onChange(next);
  };

  return (
    <Tag
      className={`${className || ""} ek-editable`.trim()}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      {...rest}
    >
      {value}
    </Tag>
  );
}
