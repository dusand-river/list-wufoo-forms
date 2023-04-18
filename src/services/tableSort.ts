import { IEntry } from "./mapper";

interface ItableSortProps {
  tableData: { [key: string]: any }[];
  sortField: string;
  sortOrder: string;
}
const tableSort = ({ tableData, sortField, sortOrder }: ItableSortProps) => {
  if (sortField) {
    const sorted = [...tableData].sort((a, b) => {
      return (
        a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
          numeric: true,
        }) * (sortOrder === "asc" ? 1 : -1)
      );
    });
    const sortTab: IEntry[] = [...sorted];
    return sortTab;
  }
};

export default tableSort;
