"use client";

import api from "@/services/api.service";
import { Divider, Grid, Skeleton } from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import NoData from "@/components/Error/NoData";
import PaginationComponent from "@/components/Pagination/PaginationComponent";
import { OPTIONS_SELECT_PAGINATION_10 } from "@/components/Config/options.config";
import PokeTypeItem from "./PokeTypeItem";

const queryClient = new QueryClient();

function PokeTypeList({ type, color }: any) {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    count: 0,
  });

  const getAllType = useQuery({
    queryKey: [type?.url],
    queryFn: async () => {
      const response = await api.get(
        type.url
      );

      setPagination((prev) => ({
        ...prev,
        count: response?.data?.pokemon?.length,
      }));
      return response.data;
    },
  });

  const sliceList = (data: any, pagination: any) => {
   return data?.pokemon?.slice(
     (pagination?.currentPage - 1) * pagination?.itemsPerPage,
     pagination?.currentPage * pagination?.itemsPerPage
   ) 
  }

  const renderList = useMemo(() => {
    return sliceList(getAllType?.data, pagination)?.map((item: any, index: number) => (
      <React.Fragment key={index}>
        <Grid size={12}>
          <PokeTypeItem data={item} />
        </Grid>
        <Grid size={12}>
          <Divider orientation="horizontal" variant="fullWidth" />
        </Grid>
      </React.Fragment>
    ))
  }, [pagination?.currentPage, pagination?.itemsPerPage, getAllType?.data]);

  return (
    <div className="backdrop-blur-2xl shadow-2xl rounded-2xl p-5">
      <Grid container spacing={2}>
        {getAllType?.isLoading && Array.from({ length: pagination.itemsPerPage }, (_, index) => (
          <Grid size={12} key={index}>
            <Skeleton variant="rounded" width={"100%"} height={140} />
          </Grid>
        ))}
        {(getAllType?.isError || !Boolean(getAllType?.data?.pokemon?.length)) && (
          <Grid size={12}>
            <NoData text="We couldn't find any Pokè data"/>
          </Grid>
        )}
        {renderList}
        <Grid size={12}>
          {Boolean(pagination?.count) && (
            <PaginationComponent
              totalData={pagination.count}
              itemsPerPage={pagination.itemsPerPage}
              oprionsSelect={OPTIONS_SELECT_PAGINATION_10}
              callbackPagination={(page) =>
                setPagination((prev) => ({ ...prev, currentPage: page }))
              }
              callbackSelectedPageNumber={(value) =>
                setPagination((prev) => ({
                  ...prev,
                  itemsPerPage: parseInt(value?.value),
                  currentPage: 1,
                  count: 0,
                }))
              }
              color={color}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default function PokeTypeListFeature({ type, color }: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <PokeTypeList type={type} color={color} />
    </QueryClientProvider>
  );
}
