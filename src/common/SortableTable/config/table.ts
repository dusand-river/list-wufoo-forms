import { TTableRow } from "../hooks/useSortableTable";
import { ITableColumn } from "./interface";

const displayColumns: ITableColumn[] = [
  { key: "name", label: "Helm Name", sortable: true, active: true },
  { key: "boat", label: "Boat Name", sortable: true, active: true },
  { key: "class", label: "Class", sortable: true, active: true },
  { key: "sailNo", label: "Sail number", sortable: true, active: true },
  { key: "fleet", label: "Fleet", sortable: true, active: true },
  { key: "rating", label: "Rating", sortable: false, active: true },

  { key: "division", label: "Start", sortable: true, active: false },
  {
    key: "needPhrfCertificate",
    label: "Need PHRF",
    sortable: false,
    active: false,
  },
];

export const getActiveColumns = (active: boolean): ITableColumn[] => {
  const cols = displayColumns.filter((column, index) => {
    if (active === true) return true;
    return column.active;
  });

  return cols;
};

export const getDisplayColumns = (): ITableColumn[] => {
  return displayColumns;
};

export function convertTable<T>(table: T[]) {
  return table.map((row) => {
    return row as TTableRow;
  });
}
