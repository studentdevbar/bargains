import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import React from "react";

interface DataTablePaginationProps {
  page: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  currentPageLength: number;
  pageSizeOptions?: number[];
  hideShowing?: boolean;
  hidePerPage?: boolean;
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  page,
  totalPages,
  perPage,
  totalItems,
  onPageChange,
  onPerPageChange,
  currentPageLength,
  hideShowing = false,
  hidePerPage = false,
  pageSizeOptions = [10, 20, 30, 40, 50],
}) => {
  return (
    <div className="flex items-center justify-between px-4">
      {!hideShowing && (
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          Showing {currentPageLength} of {totalItems} row(s).
        </div>
      )}
      <div className="flex w-full items-center gap-8 lg:w-fit">
        {!hidePerPage && (
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${perPage}`}
            onValueChange={(value) => onPerPageChange(Number(value))}
          >
            <SelectTrigger className="w-20" id="rows-per-page">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        )}
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(1)}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTablePagination; 