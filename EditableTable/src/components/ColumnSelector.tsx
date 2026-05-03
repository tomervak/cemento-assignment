import type { Column } from "../types/TableTypes";
import "./ColumnSelector.css";

interface ColumnSelectorProps {
  columns: Column[];
  visibleColumns: string[];
  onToggle: (columnId: string) => void;
  onClose: () => void;
}

export default function ColumnSelector({
  columns,
  visibleColumns,
  onToggle,
  onClose,
}: ColumnSelectorProps) {
  return (
    <div className="column-selector-overlay" onClick={onClose}>
      <div
        className="column-selector-window"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="column-selector-header">
          <h3 className="column-selector-title">Toggle Columns</h3>
          <button className="column-selector-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="column-selector-list">
          {columns.map((column) => (
            <label key={column.id} className="column-selector-item">
              <input
                className="column-selector-checkbox"
                type="checkbox"
                checked={visibleColumns.includes(column.id)}
                onChange={() => onToggle(column.id)}
              />
              <span>{column.title}</span>
            </label>
          ))}
        </div>
        <div>
          <button
            onClick={() =>
              columns.forEach((col: Column) => {
                if (!visibleColumns.includes(col.id)) onToggle(col.id);
              })
            }
          >
            Select All
          </button>
          <button
            onClick={() =>
              columns.forEach((col: Column) => {
                if (visibleColumns.includes(col.id)) onToggle(col.id);
              })
            }
          >
            Deselect All
          </button>
        </div>
      </div>
    </div>
  );
}
