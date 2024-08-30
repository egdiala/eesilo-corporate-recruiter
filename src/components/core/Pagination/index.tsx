/* eslint-disable no-unused-vars */
import React from "react";
import "./pagination.css";
import { Button } from "../Button";
import { cn } from "@/libs/cn";

export interface PaginationProps {
  /**
   * Current page.
   */
  currentPage: number;
  /**
   * Total pages.
   */
  totalPages: number;
  /**
   * Go to previous page.
   */
  prev: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Go to next page.
   */
  next: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Other unknown attributes
   */
  [x: string]: any;
}

/**
 * Pagination component for iterating through data on a table
 */

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  prev,
  next,
  className,
}) => {

  return (
    <div className={cn("neesilo-pagination-container", className)}>
        <Button type="button" theme="neutral" variant="stroke" size="40" onClick={prev} disabled={currentPage === 1}>Previous</Button>
        <div className="text-sm text-[#2A2A2A] font-medium inline-flex justify-center w-full focus:outline-none items-center gap-2">
            Page {currentPage} of {totalPages}
        </div>
        <Button type="button" theme="neutral" variant="stroke" size="40" onClick={next} disabled={currentPage === totalPages}>Next</Button>
    </div>
  );
};