export interface ITableColumn {
  key: string;
  label: string;
  sortable: boolean;
  active: boolean;
}
const displayColumns: ITableColumn[] = [
  { key: "name", label: "Helm Name", sortable: true, active: true },
  { key: "boat", label: "Boat Name", sortable: true, active: true },
  { key: "class", label: "Class", sortable: true, active: true },
  { key: "sailNo", label: "Sail number", sortable: true, active: true },
  { key: "rating", label: "Rating", sortable: false, active: false },
  { key: "fleet", label: "Fleet", sortable: true, active: false },
];

export const setActiveColumns = (active: boolean): ITableColumn[] => {
  const cols = [...getDisplayColumns()];
  cols.forEach((column) => {
    active ? (column.active = true) : column.active;
  });
  return cols;
};
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
