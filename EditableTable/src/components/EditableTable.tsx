import { useEffect, useState } from "react";
import type { Column, Row } from "../types/TableTypes";
import EditableCell from "./EditableCell";
import ColumnSelector from "./ColumnSelector";
import "./EditableTable.css";

interface EditableTableProps {
  columns: Column[];
  rows: Row[];
  onDataChange: (rowId: string, columnId: string, value: any) => void;
}

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [5, 10, 20];

/**
 * A fully editable table component with pagination and column visibility controls.
 * @param columns - The column definitions for the table.
 * @param rows - The data rows to display in the table.
 * @param onDataChange - Callback function to handle changes to cell data.
 */
export default function EditableTable({
  columns,
  rows,
  onDataChange,
}: EditableTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  const startIndex = (page - 1) * pageSize;
  const pageRows = rows.slice(startIndex, startIndex + pageSize);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  function changePage(newPage: number) {
    setPage(Math.max(1, Math.min(newPage, pageCount)));
  }

  function changePageSize(newPageSize: number) {
    setPageSize(newPageSize);
    setPage(1);
  }

  const [visibleColumnIds, setVisibleColumnIds] = useState<string[]>(
    columns.map((col) => col.id),
  );
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const visibleColumns = columns.filter((col) =>
    visibleColumnIds.includes(col.id),
  );

  function handleToggleColumn(columnId: string) {
    setVisibleColumnIds((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId],
    );
  }

  return (
    <div>
      <button
        className="column-button"
        onClick={() => setShowColumnSelector(!showColumnSelector)}
      >
        <span>☰</span> Columns
      </button>
      {showColumnSelector && (
        <ColumnSelector
          columns={columns}
          visibleColumns={visibleColumnIds}
          onToggle={handleToggleColumn}
          onClose={() => setShowColumnSelector(false)}
        />
      )}
      <div className="table-container">
        <div className="table-scroll">
          <div className="header-row">
            <div style={{ display: "flex" }}>
              {visibleColumns.map((column) => (
                <div
                  key={column.id}
                  className="header-cell"
                  style={{
                    width: column.width || 150,
                    minWidth: column.width || 150,
                  }}
                >
                  {column.title}
                </div>
              ))}
            </div>
          </div>

          <div>
            {pageRows.map((row) => (
              <div key={row.id} className="row">
                {visibleColumns.map((column) => (
                  <div
                    key={column.id}
                    className="cell"
                    style={{
                      width: column.width || 150,
                      minWidth: column.width || 150,
                    }}
                  >
                    <EditableCell
                      row={row}
                      column={column}
                      onChange={(value) =>
                        onDataChange(row.id, column.id, value)
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pagination">
        <div>
          Showing {startIndex + 1}–{startIndex + pageRows.length} of{" "}
          {rows.length}
        </div>

        <div>
          <button onClick={() => changePage(1)} disabled={page === 1}>
            First
          </button>
          <button onClick={() => changePage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {page} of {pageCount}
          </span>
          <button
            onClick={() => changePage(page + 1)}
            disabled={page === pageCount}
          >
            Next
          </button>
          <button
            onClick={() => changePage(pageCount)}
            disabled={page === pageCount}
          >
            Last
          </button>
        </div>

        <label>
          Rows per page:
          <select
            value={pageSize}
            onChange={(e) => changePageSize(Number(e.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
