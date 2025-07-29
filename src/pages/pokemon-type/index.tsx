"use client"

import { typeColorReferences } from "@/components/Config/color.config";
import PokeTypeListFeature from "@/components/Features/PokeType/PokeTypeListFeature";
import { lightenHexColor } from "@/components/helper/hexcolor.helper";
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { Container, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Typography } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const queryClient = new QueryClient();

function PokemonType() {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<{ name: string; url: string}>();
  const [color, setColor] = useState<string>();

  const getAllCard = useQuery({
    queryKey: [],
    queryFn: async () => {
      const response = await api.get(
        `https://pokeapi.co/api/${API_PATH().card.getType}?offset=0&limit=100`
      );

      if(response?.data?.results) {
        setSelectedType(response?.data?.results[0]);
      }
      return response.data;
    },
  });

  useEffect(() => {
    if(selectedType?.name) {
      setColor(typeColorReferences.find((item: any) => item.name === selectedType?.name)?.color);
    }
  }, [selectedType?.name]);

  return (
    <>
      <section className="md:my-20 relative">
        {color && (
          <>
            <div className="absolute h-[560px] w-[280px] right-0 top-0 rounded-s-full border-[150px] border-e-0" style={{borderColor: color}}></div>
            <div className="absolute h-[560px] w-[280px] lef-0 bottom-0 rounded-e-full border-[150px] border-s-0" style={{borderColor: color}}></div>
          </>
        )}
        <Container>
          <Grid container spacing={0}>
            <Grid size={{ xs: 12, md: 2.5}} sx={{ paddingRight: { xs: 0, md: "3.8rem"}, borderRight: "1px solid var(--color-gray-200)"}}>
              <div className="flex flex-col gap-1">
                <Typography variant="h3" sx={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-gray-700)" }}>{t("Pokemon Type")}</Typography>
                <div className="flex flex-col md:h-full h-[200px] overflow-y-auto">
                  {getAllCard?.isLoading && Array.from({ length: 5 })?.map((item: any, index: number) => (
                    <ListItem key={index} component="div" disablePadding onClick={() => setSelectedType(item)}>
                      <ListItemButton style={{ padding: "0", backgroundColor: item?.name === selectedType?.name ? lightenHexColor(color as string, 50) : "" }}>
                        <ListItemIcon style={{ padding: "1rem", display: "flex", alignItems: "center", minWidth: "auto"}}>
                          <Skeleton variant="rounded" width={100} height={20} />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: "1rem", fontWeight: 400, color: "var(--color-gray-700)", textTransform: "capitalize" }} primary={item?.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  {getAllCard?.data?.results?.map((item: any, index: number) => (
                    <ListItem key={index} component="div" disablePadding onClick={() => setSelectedType(item)}>
                      <ListItemButton style={{ padding: "0", backgroundColor: item?.name === selectedType?.name ? lightenHexColor(color as string, 50) : "" }}>
                        <ListItemIcon style={{ padding: "1rem", display: "flex", alignItems: "center", minWidth: "auto"}}>
                          <div>
                            <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
                          </div>
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: "1rem", fontWeight: 400, color: "var(--color-gray-700)", textTransform: "capitalize" }} primary={item?.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </div>
              </div>
            </Grid>
            <Grid size={{ xs: 12, md: 9.5}} sx={{ paddingLeft: { xs: 0, md: "3.8rem"} }}>
              {selectedType && (
                <div className="flex flex-col gap-1 relative">
                  <Typography variant="h3" sx={{ fontSize: "2.66rem", textAlign: { xs: "center", md: "left"}, fontWeight: 600, color: "var(--color-gray-700)" }}>{t("Pokemon with")} <span className="capitalize">{selectedType?.name}</span></Typography>
                  <div className="mt-3" style={{minHeight: "107.376666667rem"}}>
                    <PokeTypeListFeature type={selectedType} color={color} />
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}

export default function PokemonTypePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonType />
    </QueryClientProvider>
  );
}