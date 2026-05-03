import { useEffect, useState } from "react";
import type { Column, Row } from "../types/TableTypes";
import "./EditableCell.css";

interface EditableCellProps {
  row: Row;
  column: Column;
  onChange: (value: any) => void;
}

export default function EditableCell({
  row,
  column,
  onChange,
}: EditableCellProps) {
  const [value, setValue] = useState(row[column.id]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    !isEditing && setValue(row[column.id]);
  }, [row[column.id], isEditing, column.id]);

  function handleSave() {
    onChange(value);
    setIsEditing(false);
  }

  function handleCancel() {
    setValue(row[column.id]);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  }

  function renderDisplay() {
    switch (column.type) {
      case "boolean":
        return value ? "✓ Yes" : "✗ No";
      case "selection list":
        return value ?? "-";
      case "number":
        return value ?? "-";
      case "string":
        return value ?? "-";
      default:
        return String(value) ?? "-";
    }
  }

  function renderEditor() {
    switch (column.type) {
      case "boolean":
        return (
          <select
            className="cell-select"
            autoFocus
            value={value ? "true" : "false"}
            onChange={(e) => setValue(e.target.value === "true")}
            onBlur={handleCancel}
            onKeyDown={handleKeyDown}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        );
      case "selection list":
        return (
          <select
            className="cell-select"
            autoFocus
            value={(value as string) ?? ""}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleCancel}
            onKeyDown={handleKeyDown}
          >
            <option value="">Select...</option>
            {column.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "number":
        return (
          <input
            className="cell-input"
            autoFocus
            type="number"
            value={(value as number) ?? ""}
            onChange={(e) =>
              setValue(
                e.target.value === "" ? undefined : Number(e.target.value),
              )
            }
            onBlur={handleCancel}
            onKeyDown={handleKeyDown}
          />
        );
      case "string":
      default:
        return (
          <input
            className="cell-input"
            autoFocus
            type="text"
            value={(value as string) ?? ""}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleCancel}
            onKeyDown={handleKeyDown}
          />
        );
    }
  }

  return (
    <div
      className="cell-content"
      onClick={() => !isEditing && setIsEditing(true)}
    >
      {isEditing ? (
        <div> {renderEditor()} </div>
      ) : (
        <div> {renderDisplay()} </div>
      )}
    </div>
  );
}
