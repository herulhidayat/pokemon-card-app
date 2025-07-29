"use client";

import { typeColorReferences } from "@/components/Config/color.config";
import { lightenHexColor } from "@/components/helper/hexcolor.helper";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import PokeEvolution from "@/components/Features/Detail/PokeEvolutionFeatures";

const queryClient = new QueryClient();

function PokemonDetail() {
  const searchParams = useSearchParams()
  const idPokemon = searchParams.get('id')
  const getDataCard = useQuery({
    queryKey: [idPokemon],
    queryFn: async () => {
      const response = await api.get(`https://pokeapi.co/api/${API_PATH().card.getAll}/${idPokemon}`);

      return response.data;
    },
  });

  // useEffect(() => {
  //   if(!idPokemon) {
  //     router.push('/')
  //   }
  // }, [idPokemon])

  return (
    <>
      <section className="my-20 relative">
        <Container>
          <div className="flex flex-col gap-10">
            <div className="flex gap-5">
              <div className="rounded-xl flex justify-center items-center" style={{backgroundColor: typeColorReferences.find((item: any) => item.name === getDataCard?.data?.types[0]?.type?.name)?.color, width: 400, height: 400}}>
                <Image
                  src={getDataCard?.data?.sprites?.front_default}
                  width={400}
                  height={400}
                  alt={getDataCard?.data?.types[0]?.type?.name || ""}
                />
              </div>
              <div className="flex flex-col min-w-sm gap-6">
                <Typography variant="h2" sx={{ fontSize: "2.66rem", fontWeight: 600, color: "var(--color-gray-700)", textTransform: "capitalize" }}>
                  {getDataCard?.data?.name}
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <div className="flex gap-3">
                      <p className="text-gray-700 text-xl font-bold">Weight:</p>
                      <p className="text-gray-700 text-xl">{getDataCard?.data?.weight}</p>
                    </div>
                  </Grid>
                  <Grid size={6}>
                    <div className="flex gap-3">
                      <p className="text-gray-700 text-xl font-bold">Height:</p>
                      <p className="text-gray-700 text-xl">{getDataCard?.data?.height}</p>
                    </div>
                  </Grid>
                  <Grid size={12}>
                    <div className="flex gap-8 justify-start">
                      <p className="text-gray-700 text-xl font-bold">Abilities:</p>
                      <ul className="text-gray-700 text-xl list-disc">
                        {getDataCard?.data?.abilities?.map((item: any, index: number) => (
                          <li key={index}>
                            <p>{item?.ability?.name}{item?.is_hidden && " (Hidden)"}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Grid>
                  <Grid size={12}>
                    <div className="flex gap-3">
                      <p className="text-gray-700 text-xl font-bold">Type:</p>
                      <div className="flex justify-center items-center h-full gap-3">
                        {getDataCard?.data?.types?.map((item: any, index: number) => {
                          return (
                            <div
                              key={index}
                              className={`flex py-0 px-3 rounded-full border-2`}
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
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-gray-700)", padding: "1rem 0"}}>
                Other Images :
              </Typography>
              <div className="flex gap-6 overflow-x-auto overflow-y-hidden">
                {[ 'front_default', 'front_shiny', 'back_default', 'back_shiny'].map((item: any, index: number) => (
                  <div key={index} className="rounded-xl flex justify-center items-center" style={{backgroundColor: typeColorReferences.find((item: any) => item.name === getDataCard?.data?.types[0]?.type?.name)?.color, width: 170, height: 170}}>
                    {getDataCard?.data?.sprites?.[item] && (
                      <Image
                        src={getDataCard?.data?.sprites?.[item]}
                        width={170}
                        height={170}
                        alt={getDataCard?.data?.types[0]?.type?.name || ""}
                        style={{maxWidth: 'none'}}
                      />
                    )}
                  </div>
                ))}
                <div className="rounded-xl flex justify-center items-center" style={{backgroundColor: typeColorReferences.find((item: any) => item.name === getDataCard?.data?.types[0]?.type?.name)?.color, width: 170, height: 170}}>
                  {getDataCard?.data?.sprites?.other?.dream_world?.front_default && (
                    <Image
                      src={getDataCard?.data?.sprites?.other?.dream_world?.front_default}
                      width={170}
                      height={170}
                      alt={getDataCard?.data?.types[0]?.type?.name || ""}
                      style={{maxWidth: 'none'}}
                    />  
                  )}
                </div>
                <div className="rounded-xl flex justify-center items-center" style={{backgroundColor: typeColorReferences.find((item: any) => item.name === getDataCard?.data?.types[0]?.type?.name)?.color, width: 170, height: 170}}>
                  {getDataCard?.data?.sprites?.other?.home?.front_default && (
                    <Image
                      src={getDataCard?.data?.sprites?.other?.home?.front_default}
                      width={170}
                      height={170}
                      alt={getDataCard?.data?.types[0]?.type?.name || ""}
                      style={{maxWidth: 'none'}}
                    />
                  )}
                </div>
                <div className="rounded-xl flex justify-center items-center" style={{backgroundColor: typeColorReferences.find((item: any) => item.name === getDataCard?.data?.types[0]?.type?.name)?.color, width: 170, height: 170}}>
                  {getDataCard?.data?.sprites?.other?.home?.front_shiny && (
                    <Image
                      src={getDataCard?.data?.sprites?.other?.home?.front_shiny}
                      width={170}
                      height={170}
                      alt={getDataCard?.data?.types[0]?.type?.name || ""}
                      style={{maxWidth: 'none'}}
                    />
                  )}
                </div>
                <div className="rounded-xl flex justify-center items-center" style={{backgroundColor: typeColorReferences.find((item: any) => item.name === getDataCard?.data?.types[0]?.type?.name)?.color, width: 170, height: 170}}>
                  {getDataCard?.data?.sprites?.other?.['official-artwork']?.front_default && (
                    <Image
                      src={getDataCard?.data?.sprites?.other?.['official-artwork']?.front_default}
                      width={170}
                      height={170}
                      alt={getDataCard?.data?.types[0]?.type?.name || ""}
                      style={{maxWidth: 'none'}}
                    />
                  )}
                </div>
                <div className="rounded-xl flex justify-center items-center" style={{backgroundColor: typeColorReferences.find((item: any) => item.name === getDataCard?.data?.types[0]?.type?.name)?.color, width: 170, height: 170}}>
                  {getDataCard?.data?.sprites?.other?.['official-artwork']?.front_shiny && (
                    <Image
                      src={getDataCard?.data?.sprites?.other?.['official-artwork']?.front_shiny}
                      width={170}
                      height={170}
                      alt={getDataCard?.data?.types[0]?.type?.name || ""}
                      style={{maxWidth: 'none'}}
                    />
                  )}
                </div>
                {[ 'front_default', 'front_shiny', 'back_default', 'back_shiny'].map((item: any, index: number) => (
                  <div key={index} className="rounded-xl flex justify-center items-center" style={{backgroundColor: typeColorReferences.find((item: any) => item.name === getDataCard?.data?.types[0]?.type?.name)?.color, width: 170, height: 170}}>
                    {getDataCard?.data?.sprites?.other?.showdown?.[item] && (
                      <Image
                        src={getDataCard?.data?.sprites?.other?.showdown?.[item]}
                        width={170}
                        height={170}
                        alt={getDataCard?.data?.types[0]?.type?.name || ""}
                        style={{maxWidth: 'none'}}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-gray-700)", padding: "1rem 0"}}>
                Stats :
              </Typography>
              <div className="flex gap-6 overflow-x-auto overflow-y-hidden">
                {getDataCard?.data?.stats?.map((item: any, index: number) => (
                  <Box
                    position="relative"
                    width={200}
                    height={200}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    key={index}
                  >
                    {/* Gauge tanpa text */}
                    <Gauge
                      value={item?.base_stat}
                      startAngle={0}
                      endAngle={360}
                      cornerRadius="50%"
                      innerRadius="80%"
                      outerRadius="110%"
                      text="" // kosongkan
                      sx={{
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: colorStats[index] || '#0571A6',
                        },
                      }}
                    />

                    {/* Custom text manual */}
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      sx={{
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: colorStats[index], lineHeight: 1 }}>
                        {item?.base_stat}
                      </Typography>
                      <Typography sx={{ fontSize: 18 }}>
                        {item.stat.name}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <Typography variant="h3" sx={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--color-gray-700)", padding: "1rem 0"}}>
                Evolution :
              </Typography>
              <div className="flex gap-6 overflow-x-auto overflow-y-hidden justify-center">
                <PokeEvolution speciesUrl={getDataCard?.data?.species?.url} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default function PokemonDetailPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonDetail />
    </QueryClientProvider>
  );
}

const colorStats = [
  '#0571A6',
  '#E66D00',
  '#E6AB09',
  '#01B956',
  '#3C48CF',
  '#DE2C2C'
]