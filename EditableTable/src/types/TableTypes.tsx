export interface Column {
  id: string;
  ordinalNo: number;
  title: string;
  type: string;
  width?: number;
  options?: string[];
}

export interface Row {
  id: string;
  [columnId: string]: any;
}