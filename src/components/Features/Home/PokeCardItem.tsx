import { typeColorReferences } from "@/components/Config/color.config";
import { lightenHexColor } from "@/components/helper/hexcolor.helper";
import api from "@/services/api.service";
import { Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRef } from "react";

interface IPokeCardItemProps {
  data: any;
}

export default function PokeCardItem({ data }: IPokeCardItemProps) {
  const boundingRef = useRef<DOMRect | null>(null);
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
    <div className="[perspective:1500px]">
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
          className="group relative grid h-[500px] w-[350px] grid-rows-[200px_120px_40px] rounded-3xl transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]"
          style={{
            backgroundColor: lightenHexColor(
              typeColorReferences.find(
                (item) => item.name === getDataCard?.data?.types?.[0]?.type?.name
              )?.color as string,
              20
            ),
          }}
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
                src={getDataCard?.data?.sprites?.front_default}
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
  );
}