export interface ITableColumn {
  key: string;
  label: string;
  active: boolean;
  sortable: boolean;
  sortByOrder?: TSortOrder;
}

export type TSortOrder = "asc" | "desc";
