import React from "react";
import emptyState from "@/assets/empty_state.webp"

interface EmptyStateProps {
  emptyStateTitle?: string | null
  emptyStateText: string | null
}

export const EmptyState: React.FC<EmptyStateProps> = ({ emptyStateText = null, emptyStateTitle = null }) => {
  return (
    <div className="h-full w-full flex items-center flex-col gap-5 py-20 justify-center">
      <img src={emptyState} alt="empty_state_illustration" className="size-24" />
      <div className="grid gap-1">
        <h4 className="font-medium text-gray-900 text-base text-center">{emptyStateTitle ?? "Nothing here"}</h4>
        <p className="text-sm text-gray-600 text-center">
          {emptyStateText}
        </p>
      </div>
    </div>
  );
};