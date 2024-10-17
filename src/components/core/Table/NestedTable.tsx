import React, { Fragment, useState } from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { RenderIf } from "../RenderIf";
import { Icon } from "@iconify/react";
import { cn } from "@/libs/cn";
import { AnimatePresence, motion } from "framer-motion";

interface NestedTableProps<T> {
  data: T[];
  columns: ColumnDef<any>[]; // Generic columns definition for the table
  // eslint-disable-next-line no-unused-vars
  groupAccessor: (item: T) => string; // Function to get the group name
  // eslint-disable-next-line no-unused-vars
  dataAccessor: (item: T) => any[]; // Function to get the nested data array
  // eslint-disable-next-line no-unused-vars
  renderRow?: (row: any) => React.ReactNode; // Optional custom row rendering
}

export const NestedTable = <T,>({
  data,
  columns,
  groupAccessor,
  dataAccessor,
  renderRow,
}: NestedTableProps<T>) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const toggleGroupExpansion = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((name) => name !== groupName)
        : [...prev, groupName]
    );
  };

  return (
    <div className="w-full lg:left-auto lg:relative lg:right-auto rounded-t-xl left-0 right-0 overflow-x-scroll scrollbar-hide">
      {data.map((groupItem, index) => {
        const groupName = groupAccessor(groupItem);
        const nestedData = dataAccessor(groupItem);

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const table = useReactTable({
          data: nestedData,
          columns,
          state: { sorting },
          onSortingChange: setSorting,
          getCoreRowModel: getCoreRowModel(),
          getSortedRowModel: getSortedRowModel(),
        });

        const isExpanded = expandedGroups.includes(groupName);
        const expandedProps = {
            colSpan: columns.length
        }

        return (
            <table key={groupName} className="table-auto w-full">
                <thead onClick={() => toggleGroupExpansion(groupName)} className="bg-gray-200">
                {(
                    <tr className={cn(index === 0 ? "rounded-t-xl" : "rounded-t-none")}>
                        {table.getHeaderGroups().map((headerGroup) =>
                            headerGroup.headers.map((header, idx) => (
                                <Fragment key={idx}>
                                    <RenderIf condition={idx === 0}>
                                        <th colSpan={columns.length} className="text-left text-gray-800 font-semibold text-sm px-3 py-2 md:w-[40%]">
                                            <div className="flex items-center whitespace-nowrap gap-0.5 w-40 md:w-auto">
                                                <Icon icon="ri:arrow-up-s-fill" className={cn("size-5 text-gray-600 transform transition-transform duration-300 ease-linear", isExpanded ? "rotate-180" : "rotate-0")} />
                                                {groupName}
                                            </div>
                                        </th>
                                    </RenderIf>
                                    <RenderIf condition={(idx !== 0)}>
                                        <th key={header.id} className="text-left text-gray-600 font-normal text-sm px-3 py-2">
                                            <RenderIf condition={true}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </RenderIf>
                                        </th>
                                    </RenderIf>
                                </Fragment>
                            ))
                        )}
                    </tr>
                )}
                </thead>
                <AnimatePresence mode="popLayout">
                    {isExpanded && (
                        <motion.tbody>
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell, idx) => (
                                        <td key={cell.id} {...(idx === 0 ? expandedProps : {})} className="text-left py-2.5 pl-3 pr-5 text-gray-900 text-sm font-normal">
                                            {renderRow ? renderRow(cell.getContext()) : flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </motion.tbody>
                    )}
                </AnimatePresence>
            </table>
        );
      })}
    </div>
  );
};

export default NestedTable;
