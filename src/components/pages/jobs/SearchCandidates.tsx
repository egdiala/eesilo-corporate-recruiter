import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDebounce } from "@/hooks/useDebounce";
import { AddToShortlist } from "./AddToShortlist";
import { Loader } from "@/components/core/Button/Loader";
import { Toggle } from "@/components/core";
import { useGetTalents } from "@/services/hooks/queries";
import { tabVariants } from "@/constants/animateVariants";
import { SearchCandidatesFilter } from "./SearchCandidatesFilter";
import { Avatar, InputField, RenderIf, Table } from "@/components/core";
import type { FetchedTalent, FetchedTalentCount } from "@/types/applicants";
import {
  getPaginationParams,
  setPaginationParams,
} from "@/hooks/usePaginationParams";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

export const SearchCandidates: React.FC = () => {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [isEnabled, setIsEnabled] = useState(false);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({});
  const [toggleModals, setToggleModals] = useState({
    openShortlistCandidate: false,
  });
  const [activeTalent, setActiveTalent] = useState<FetchedTalent | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { value: keyword, onChangeHandler } = useDebounce(500);
  const { data: candidates, isLoading } = useGetTalents<FetchedTalent[]>({
    keyword,
    job_id: isEnabled ? jobId : "",
    job_idd: jobId
  });
  const { data: count, isLoading: fetchingCount } =
    useGetTalents<FetchedTalentCount>({
      component: "count",
      keyword,
      job_id: isEnabled ? jobId : "",
      job_idd: jobId
    });

  const toggleShortlistCandidate = useCallback(() => {
    setToggleModals((prev) => ({
      ...prev,
      openShortlistCandidate: !toggleModals.openShortlistCandidate,
    }));
  }, [toggleModals.openShortlistCandidate]);

  const columns = [
    {
      header: () => "Name",
      accessorKey: "first_name",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedTalent;
        return (
          <div className="flex items-center gap-3">
            <Avatar
              size="40"
              image=""
              alt={`${item?.first_name}_${item?.last_name}`}
            />
            <div className="whitespace-nowrap capitalize">
              {item?.first_name}
            </div>
          </div>
        );
      },
    },
    {
      header: () => "Specialty",
      accessorKey: "specialty_data.title",
    },
    {
      header: () => "Sub-Specialty",
      accessorKey: "specialty_data.specialty_sub",
      enableSorting: false,
    },
    {
      header: () => "Qualification",
      accessorKey: "qualification",
    },
    {
      header: () => "Action",
      accessorKey: "status",
      enableSorting: false,
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedTalent;
        return (
          <button
            type="button"
            className="font-normal text-xs text-warning-600 whitespace-nowrap"
            onClick={() => {
              setActiveTalent(item);
              toggleShortlistCandidate();
            }}
          >
            Add to Shortlist
          </button>
        );
      },
    },
  ];

  const handlePageChange = (page: number) => {
    // in a real page, this function would paginate the data from the backend
    setPage(page);
    setPaginationParams(page, itemsPerPage, searchParams, setSearchParams);
  };

  useEffect(() => {
    getPaginationParams(location, setPage, () => {});
  }, [location, setPage]);

  return (
    <motion.div
      initial={tabVariants.initial}
      animate={tabVariants.final}
      exit={tabVariants.initial}
      className="flex flex-col gap-5"
    >
      <h2 className="font-medium text-gray-900 text-base">
        Invite New Candidates
      </h2>
      <div className="grid w-full gap-5 lg:gap-0 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center gap-5 md:gap-6">
          <h4 className="font-medium text-gray-900 text-sm">
            Apply job requirement filters
          </h4>
          <Toggle checked={isEnabled} onChange={setIsEnabled} />
        </div>
        <div className="flex items-center gap-5 flex-1 lg:max-w-96">
          <InputField
            type="text"
            placeholder="Search talents"
            iconRight="ri:search-2-line"
            onChange={onChangeHandler}
          />
          <SearchCandidatesFilter setFilters={setFilters} filters={filters} />
        </div>
      </div>
      <RenderIf condition={!isLoading && !fetchingCount}>
        <Table
          columns={columns}
          data={candidates ?? []}
          page={page}
          perPage={itemsPerPage}
          totalCount={count?.total}
          onPageChange={handlePageChange}
          emptyStateText="No candidates to be found here."
          onClick={({ original }) => navigate(`/jobs/${original?.job_id}/view`)}
        />
      </RenderIf>
      <RenderIf condition={isLoading || fetchingCount}>
        <div className="flex w-full h-96 items-center justify-center">
          <Loader className="spinner size-6 text-primary-500" />
        </div>
      </RenderIf>
      <AddToShortlist
        isOpen={toggleModals.openShortlistCandidate}
        onClose={toggleShortlistCandidate}
        talent={activeTalent!}
      />
    </motion.div>
  );
};
