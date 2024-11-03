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
  renderRow?: (row: any, parentData?: T) => React.ReactNode; // Optional custom row rendering
  // eslint-disable-next-line no-unused-vars
  renderHeader?: (groupItem: T) => React.ReactNode; // Optional header content rendering
  // eslint-disable-next-line no-unused-vars
  checkPermission?: (groupItem: T) => boolean; // Function to check permissions
  // eslint-disable-next-line no-unused-vars
  parentAccessor?: (item: T) => any; // Function to get parent-level data like has_permission
}

export const NestedTable = <T,>({
  data,
  columns,
  groupAccessor,
  dataAccessor,
  renderRow,
  renderHeader,
  checkPermission,
  parentAccessor,
}: NestedTableProps<T>) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(data.length > 0 ? [groupAccessor(data[0])] : []);
  const [sorting, setSorting] = useState<SortingState>([]);

  const toggleGroupExpansion = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((name) => name !== groupName)
        : [...prev, groupName]
    );
  };

  return (
    <div className="grid w-full lg:left-auto lg:relative lg:right-auto rounded-t-xl left-0 right-0 overflow-x-scroll scrollbar-hide">
      {data.map((groupItem, index) => {
        const groupName = groupAccessor(groupItem);
        const nestedData = dataAccessor(groupItem);
        const hasPermission = checkPermission ? checkPermission(groupItem) : true;
        const parentData = parentAccessor ? parentAccessor(groupItem) : undefined;

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
                <thead className="bg-gray-200">
                {(
                    <tr className={cn(index === 0 ? "rounded-t-xl" : "rounded-t-none")}>
                        {table.getHeaderGroups().map((headerGroup) =>
                            headerGroup.headers.map((header, idx) => (
                                <Fragment key={idx}>
                                    <RenderIf condition={idx === 0}>
                                        <th onClick={() => toggleGroupExpansion(groupName)} colSpan={columns.length} className="cursor-pointer text-left text-gray-800 font-semibold text-sm px-3 py-2 md:w-[40%]">
                                            <div className="flex items-center whitespace-nowrap gap-0.5 w-40 md:w-auto">
                                                <Icon icon="ri:arrow-up-s-fill" className={cn("size-5 text-gray-600 transform transition-transform duration-300 ease-linear", isExpanded ? "rotate-180" : "rotate-0")} />
                                                {groupName}
                                            </div>
                                        </th>
                                    </RenderIf>
                                    <RenderIf condition={(idx !== 0)}>
                                        <th key={header.id} className={cn("text-left font-normal text-sm px-3 py-2", index === 0 ? "text-gray-600" : "text-gray-200")}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    </RenderIf>
                                </Fragment>
                            ))
                        )}
                        <RenderIf condition={!!renderHeader && !hasPermission}>
                            <th className="text-right px-3 py-2">
                                <div className="flex justify-end">{renderHeader ? renderHeader(groupItem) : null}</div>
                            </th>
                        </RenderIf>
                    </tr>
                )}
                </thead>
                <AnimatePresence mode="popLayout">
                    {isExpanded && (
                        <motion.tbody animate transition={{ type: "spring", bounce: 0, duration: 0.5 }}>
                            {table.getRowModel().rows.map((row, id) => (
                                <motion.tr transition={{ duration: 0.2, delay: 0.2 * id }} key={row.id}>
                                    {row.getVisibleCells().map((cell, idx) => (
                                        <td key={cell.id} {...(idx === 0 ? expandedProps : {})} className="text-left py-2.5 pl-3 pr-5 text-gray-900 text-sm font-normal">
                                            {renderRow ? renderRow(cell.getContext(), parentData) : flexRender(cell.column.columnDef.cell, { ...cell.getContext(), parentData })}
                                        </td>
                                    ))}
                                </motion.tr>
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
