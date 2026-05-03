import { useState } from "react";
import { sampleColumns,sampleData } from "./data/sampleData";
import type { Row } from "./types/TableTypes";
import EditableTable from "./components/EditableTable";

function App() {
  const [data, setData] = useState<Row[]>(sampleData);

  const handleDataChange = (
    rowId: string,
    columnId: string,
    value: unknown,
  ) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === rowId ? { ...row, [columnId]: value } : row,
      ),
    );
  };

  return (
    <div>
      <h1>Editable Table Example</h1>
      <EditableTable
        columns={sampleColumns}
        rows={data}
        onDataChange={handleDataChange}
      />
    </div>
  );

}

export default App
