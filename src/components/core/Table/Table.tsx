import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { Icon } from "@iconify/react";
import { Pagination, RenderIf } from "..";
import { EmptyState, TableLoader } from "./index";
import { useLocation } from "react-router-dom";
import { getPaginationParams } from "@/hooks/usePaginationParams";
import { cn } from "@/libs/cn";

interface TableProps {
  columns: ColumnDef<any>[]; // table columns; see Table.stories.tsx for sample use
  data: any[]; // table data
  page?: number;
  loading?: boolean;
  perPage?: number;
  paginateData?: boolean; // show pagination
  config?: Partial<TableOptions<any>>
  totalCount?: number; // total count of table data
  emptyStateText?: string;
  // eslint-disable-next-line no-unused-vars
  getData?: (page: number, rowsPerPage: number) => void; // handle pagination on page mount
  // eslint-disable-next-line no-unused-vars
  onClick?: (row: any) => void; // on click event for table row
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number, rowsPerPage: number) => void; // handle pagination change
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  page,
  perPage,
  loading = false,
  getData,
  totalCount,
  emptyStateText = "",
  onPageChange,
  onClick,
  paginateData = true,
  config
}) => {
  const location = useLocation();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(page as number);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
    ...config
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page, (perPage as number));
  };

  // Function to navigate to previous page
  const prev = () => {
    if ((page as number) > 1) {
      handlePageChange((page as number) - 1);
    }
  };

  // Function to navigate to next page
  const next = () => {
    if ((page as number) < totalCount!) {
      handlePageChange((page as number) + 1);
    }
  };

  React.useEffect(() => {
    if (paginateData) {
      getPaginationParams(location, setCurrentPage, () => {});
      getData?.(currentPage, (perPage as number));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div className="grid gap-6">
      <div className="lg:w-full lg:left-auto lg:relative lg:right-auto rounded-t-xl left-0 right-0 overflow-x-scroll scrollbar-hide">
        <table className="table-auto w-full">
          {/* Table Head */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-gray-200 rounded-t-xl cursor-pointer"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className={`text-left px-3 py-2 last:text-right ${header.column.getCanSort() ? "cursor-pointer select-none" : "cursor-default"}`}
                      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : () => { }}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                              ? "Sort descending"
                              : "Clear sort"
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-1 text-gray-600 text-sm font-normal whitespace-nowrap">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        <RenderIf condition={header.column.getCanSort()}>
                          <Icon
                            icon="ph:caret-up-down-fill"
                            className="text-neutral-40"
                          />
                        </RenderIf>
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <RenderIf condition={loading}>
            <tbody className="min-h-[20rem]">
              <TableLoader />
            </tbody>
          </RenderIf>
          <RenderIf condition={data.length > 0}>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    data-testid={row.id}
                    onClick={() => onClick?.(row)}
                    className={cn("transition duration-500 ease-out hover:bg-gray-50", !onClick ? "cursor-default" : "cursor-pointer", row?.getIsSelected() ? "font-medium" : "font-normal")}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="text-left pl-3 pr-5 py-3.5 text-gray-800 text-sm border-b border-b-[#E1E4EA]"
                          onClick={(e) => {
                            if (
                              cell.column.id === "action" ||
                              cell.column.id === "status"
                            ) {
                              e.stopPropagation();
                            }
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </RenderIf>
        </table>
        <RenderIf condition={data.length < 1 && !loading}>
            <div className="flex items-center justify-center">
              <EmptyState emptyStateText={emptyStateText} />
            </div>
        </RenderIf>
      </div>
      <RenderIf condition={paginateData && (totalCount as number) > 0 && !loading}>
        <Pagination
          className="px-0 py-3"
          count={totalCount as number}
          currentPage={page as number}
          dataLength={totalCount as number}
          totalPages={Math.ceil((totalCount as number) / (perPage as number))}
          prev={prev}
          next={next}
        />
      </RenderIf>
    </div>
  );
};