"use client"

import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { Grid, Skeleton, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PokeCardItem from "./PokeCardItem";
import NoData from "@/components/Error/NoData";
import PaginationComponent from "@/components/Pagination/PaginationComponent";

const queryClient = new QueryClient();

function PokeCardList() {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 9,
    count: 0
  });

  const getAllCard = useQuery({
    queryKey: [pagination.currentPage, pagination.itemsPerPage],
    queryFn: async () => {
      const response = await api.get(
        `https://pokeapi.co/api/${API_PATH().card.getAll}`,
        {
          params: {
            offset: (pagination.currentPage - 1) * pagination.itemsPerPage,
            limit: pagination.itemsPerPage
          }
        }
      );

      setPagination((prev) => ({
        ...prev,
        count: response?.data?.count
      }));
      return response.data;
    },
  });


  return(
    <div>
      <div className="flex flex-col justify-center items-center gap-4 mb-10">
        <Typography variant="h2" sx={{ fontSize: "2.66rem", fontWeight: 600, color: "var(--color-gray-700)" }}>
          PokèDex
        </Typography>
        <div className="flex flex-col gap-0 text-center">
          <p className="text-2xl text-gray-700">All Generation totaling</p>
          <p className="text-2xl text-gray-700">
            {pagination.count || 0} Pokemon
          </p>
        </div>
      </div>
      <Grid container spacing={4}>
        {getAllCard?.isLoading && Array.from({ length: pagination.itemsPerPage }, (_, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Skeleton variant="rounded" width={350} height={500} />
          </Grid>
        ))}
        {getAllCard?.isError && (
          <Grid size={12}>
            <NoData />
          </Grid>
        )}
        {
          getAllCard?.data?.results?.map((item: any, index: number) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <PokeCardItem data={item} />
            </Grid>
          ))
        }
        <Grid size={12}>
          {Boolean(pagination?.count) && (
            <PaginationComponent
                totalData={pagination.count}
                itemsPerPage={pagination.itemsPerPage}
                callbackPagination={(page) => setPagination((prev) => ({ ...prev, currentPage: page }))}
                callbackSelectedPageNumber={(value) => setPagination((prev) => ({ ...prev, itemsPerPage: parseInt(value?.value), currentPage: 1, count: 0 }))}
            />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default function PokeCardListFeature() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokeCardList />
    </QueryClientProvider>
  );
}