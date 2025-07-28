import { typeColorReferences } from "@/components/Config/color.config";
import { lightenHexColor } from "@/components/helper/hexcolor.helper";
import api from "@/services/api.service";
import { Divider, Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRef } from "react";

interface IPokeTypeItemProps {
  data: any;
}

export default function PokeTypeItem({ data }: IPokeTypeItemProps) {
  const getDataPokemon = useQuery({
    queryKey: [data?.pokemon?.url],
    queryFn: async () => {
      const response = await api.get(data?.pokemon?.url);

      return response.data;
    },
  });

  return (
    <div className="[perspective:1500px]">
      {getDataPokemon.isLoading && (
        <Grid container spacing={2}>
          <Grid size={2}>
            <Skeleton variant="rounded" width={120} height={120} />
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid size={2}>
            <div className="flex justify-center items-center h-full">
              <Skeleton variant="rounded" width={180} height={20} />
            </div>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid size={3}>
            <div className="flex justify-center items-center h-full">
              <Skeleton variant="rounded" width={200} height={20} />
            </div>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid size={4}>
            <div className="flex justify-center items-center h-full">
              <Skeleton variant="rounded" width={250} height={20} />
            </div>
          </Grid>
        </Grid>
      )}
      {getDataPokemon?.data && (
        <Grid container spacing={2}>
          <Grid size={2}>
            <div className="rounded-xl flex justify-center items-center" style={{backgroundColor: typeColorReferences.find((item: any) => item.name === getDataPokemon?.data?.types[0]?.type?.name)?.color, width: 120, height: 120}}>
              <Image
                src={getDataPokemon?.data?.sprites?.front_default}
                width={100}
                height={100}
                alt={getDataPokemon?.data?.types[0]?.type?.name || ""}
              />
            </div>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid size={2}>
            <div className="flex justify-center items-center h-full">
              <p className="text-xl font-bold text-gray-700">#{getDataPokemon?.data?.order}</p>
            </div>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid size={3}>
            <div className="flex justify-center items-center h-full">
              <p className="text-xl font-bold text-gray-700 capitalize">{getDataPokemon?.data?.name}</p>
            </div>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid size={4}>
            <div className="flex justify-center items-center h-full gap-3">
              {getDataPokemon?.data?.types?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-center py-1 px-3 rounded-full border-2`}
                    style={{
                      borderColor: typeColorReferences.find(
                        (type) => type.name === item.type.name
                      )?.color,
                      backgroundColor: lightenHexColor(
                        typeColorReferences.find(
                          (type) => type.name === item.type.name
                        )?.color as string,
                        10
                      ),
                    }}
                  >
                    <p className="text-sm font-bold text-white capitalize">
                      {item.type.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}