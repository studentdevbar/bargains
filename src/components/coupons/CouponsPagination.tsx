"use client";

import DataTablePagination from "@/lib/DataTablePagination";

type Props = {
  page: number;
  totalPages: number;
  perPage: number;
  totalItems: number;
  currentPageLength: number;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
};

export default function CouponsPagination(props: Props) {
  return (
    <DataTablePagination
      page={props.page}
      totalPages={props.totalPages}
      perPage={props.perPage}
      totalItems={props.totalItems}
      currentPageLength={props.currentPageLength}
      onPageChange={props.onPageChange || (() => {})}
      onPerPageChange={props.onPerPageChange || (() => {})}
      hidePerPage
    />
  );
}


