import type { Column, Row } from "../types/TableTypes";

const columns: Column[] = [
  { id: "id", ordinalNo: 1, title: "ID", type: "string", width: 50 },
  { id: "name", ordinalNo: 2, title: "Name", type: "string", width: 120 },
  { id: "age", ordinalNo: 3, title: "Age", type: "number", width: 80 },
  { id: "email", ordinalNo: 4, title: "Email", type: "string", width: 200 },
  { id: "department", ordinalNo: 5, title: "Department", type: "selection list", width: 150, options: ["Engineering", "Marketing", "Sales", "HR", "Finance"] },
  { id: "active", ordinalNo: 6, title: "Active", type: "boolean", width: 100 },
  { id: "salary", ordinalNo: 7, title: "Salary", type: "number", width: 120 },
  { id: "joinDate", ordinalNo: 8, title: "Join Date", type: "string", width: 120 },
  { id: "role", ordinalNo: 9, title: "Role", type: "selection list", width: 130, options: ["Junior", "Mid", "Senior", "Lead", "Manager"] },
  { id: "location", ordinalNo: 10, title: "Location", type: "string", width: 130 },
];

const firstNames = ["John", "Jane", "Michael", "Sarah", "David", "Emily", "Robert", "Lisa", "William", "Mary"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Martinez", "Wilson"];
const domains = ["gmail.com", "yahoo.com", "outlook.com", "company.com", "mail.com"];
const locations = ["New York", "San Francisco", "Chicago", "Austin", "Seattle", "Boston", "Denver", "Miami"];

function generateRandomDate(): string {
  const start = new Date(2018, 0, 1);
  const end = new Date(2024, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
}

function generateData(count: number): Row[] {
  const rows: Row[] = [];
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const deptOptions = columns[4].options!;
    const roleOptions = columns[8].options!;
    
    rows.push({
      id: `row-${i}`,
      name: `${firstName} ${lastName}`,
      age: Math.floor(Math.random() * 40) + 22,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${domains[Math.floor(Math.random() * domains.length)]}`,
      department: deptOptions[Math.floor(Math.random() * deptOptions.length)],
      active: Math.random() > 0.2,
      salary: Math.floor(Math.random() * 80000) + 40000,
      joinDate: generateRandomDate(),
      role: roleOptions[Math.floor(Math.random() * roleOptions.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
    });
  }
  return rows;
}

export const sampleColumns = columns;
export const sampleData = generateData(1000);