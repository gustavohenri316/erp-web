interface PaginationProps {
  firstItemPage?: number;
  lastItemPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (pageNumber: number) => void;
  routerLink?: string;
}
