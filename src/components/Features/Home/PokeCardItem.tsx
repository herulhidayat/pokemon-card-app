import { typeColorReferences } from "@/components/Config/color.config";
import { lightenHexColor } from "@/components/helper/hexcolor.helper";
import api from "@/services/api.service";
import { Close } from "@mui/icons-material";
import { Box, Button, Grid, Modal, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface IPokeCardItemProps {
  data: any;
}

export default function PokeCardItem({ data }: IPokeCardItemProps) {
  const { t } = useTranslation();
  const boundingRef = useRef<DOMRect | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const router = useRouter();

  const getDataCard = useQuery({
    queryKey: [data?.url],
    queryFn: async () => {
      const response = await api.get(data?.url);

      return response.data;
    },
  });

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!boundingRef.current) return;
    const x = event.clientX - boundingRef.current.left;
    const y = event.clientY - boundingRef.current.top;
    const xPercentage = x / boundingRef.current.width;
    const yPercentage = y / boundingRef.current.height;
    const xRotation = (xPercentage - 0.5) * 20;
    const yRotation = (0.5 - yPercentage) * 20;

    if (event.currentTarget instanceof HTMLElement) {
      event.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
      event.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
      event.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
      event.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
    }
  };

  return (
    <>
      <div className="[perspective:1500px] flex items-center justify-center">
        {getDataCard?.isLoading || !data?.url && (
          <Skeleton variant="rounded" width={350} height={500} />
        )}
        {getDataCard?.data && (
          <div
            onMouseLeave={() => (boundingRef.current = null)}
            onMouseEnter={(e) => {
              boundingRef.current = e.currentTarget.getBoundingClientRect();
            }}
            onMouseMove={(e) => handleMouseMove(e)}
            className="group cursor-pointer relative grid h-[500px] w-[350px] grid-rows-[200px_120px_40px] rounded-3xl transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]"
            style={{
              backgroundColor: lightenHexColor(
                typeColorReferences.find(
                  (item) => item.name === getDataCard?.data?.types?.[0]?.type?.name
                )?.color as string,
                20
              ),
            }}
            onClick={() => setModal(true)}
          >
            <div
              className="h-[200px] w-[350px] rounded-[1.7rem_1.7rem_200px_200px] p-5 flex justify-center"
              style={{
                backgroundColor: typeColorReferences.find(
                  (item) => item.name === getDataCard?.data?.types?.[0]?.type?.name
                )?.color,
              }}
            >
              <div>
                <Image
                  src={getDataCard?.data?.sprites?.other?.['official-artwork']?.front_default}
                  width={200}
                  height={200}
                  alt=""
                />
              </div>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <p className="text-base font-bold text-white">
                #{getDataCard?.data?.order}
              </p>
              <p className="text-2xl font-bold text-white capitalize">
                {getDataCard?.data?.name}
              </p>
            </div>
            <div className="flex gap-2 p-5 justify-center">
              {getDataCard?.data?.types?.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-center py-4 px-6 rounded-full border-2`}
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
            <div className="pointer-events-none absolute inset-0 rounded-3xl group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]" />
          </div>
        )}
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: "1rem",
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row"
          },
          gap: 3
        }}>
          <div className="cursor-pointer md:hidden flex justify-end" onClick={() => setModal(false)}>
            <Close />
          </div>
          <div className="rounded-xl flex justify-center items-center md:w-[400px] md:h-[400px] w-auto h-auto" style={{backgroundColor: typeColorReferences.find((item: any) => item.name === getDataCard?.data?.types[0]?.type?.name)?.color}}>
            <Image
              src={getDataCard?.data?.sprites?.other?.['official-artwork']?.front_default}
              width={400}
              height={400}
              alt={getDataCard?.data?.types[0]?.type?.name || ""}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col md:min-w-sm min-w-80 gap-6">
              <div className="flex justify-between">
                <Typography variant="h2" sx={{ fontSize: "2.66rem", fontWeight: 600, color: "var(--color-gray-700)", textTransform: "capitalize" }}>
                  {getDataCard?.data?.name}
                </Typography>
                <div className="cursor-pointer md:visible invisible" onClick={() => setModal(false)}>
                  <Close />
                </div>
              </div>
              <Grid container spacing={2} sx={{ maxWidth: "400px"}}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <div className="flex gap-3">
                    <p className="text-gray-700 text-xl font-bold">{t("Weight")}:</p>
                    <p className="text-gray-700 text-xl">{getDataCard?.data?.weight}</p>
                  </div>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <div className="flex gap-3">
                    <p className="text-gray-700 text-xl font-bold">{t("Height")}:</p>
                    <p className="text-gray-700 text-xl">{getDataCard?.data?.height}</p>
                  </div>
                </Grid>
                <Grid size={12}>
                  <div className="flex gap-8 justify-start">
                    <p className="text-gray-700 text-xl font-bold">{t("Abilities")}:</p>
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
                    <p className="text-gray-700 text-xl font-bold">{t("Type")}:</p>
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
            <div>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "var(--color-primary-600)",
                    boxShadow: "none",
                  },
                  borderRadius: "0.933rem",
                  boxShadow: "none",
                  textTransform: "none",
                  fontSize: "1.33rem",
                  fontWeight: 600,
                  py: "0.2rem",
                  paddingX: "1.133rem",
                  marginTop: "2rem",
                }}
                onClick={() => {
                  router.push({
                    pathname: `/detail`,
                    query: { id: getDataCard?.data?.id },
                  });
                  setModal(false);
                }}
              >
                {t("More Detail")}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}