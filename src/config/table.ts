export interface ITableColumn {
  key: string;
  label: string;
  sortable: boolean;
  active: boolean;
}
export const displayColumns: ITableColumn[] = [
  { key: "name", label: "Helm Name", sortable: true, active: true },
  { key: "boat", label: "Boat Name", sortable: true, active: true },
  { key: "class", label: "Class", sortable: true, active: true },
  { key: "sailNo", label: "Sail number", sortable: true, active: true },
  { key: "rating", label: "Rating", sortable: false, active: false },
  { key: "fleet", label: "Fleet", sortable: true, active: false },
];
