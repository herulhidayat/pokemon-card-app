import api from "@/services/api.service";
import { ArrowDownward, ArrowForward } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import PokeEvolutionImage from "./PokeEvolutionImage";
import { useTranslation } from "react-i18next";

export default function PokeEvolution({ speciesUrl }: any) {
  const { t } = useTranslation();
  const [evolution, setEvolution] = useState<any>();
  const router = useRouter();

  useQuery({
    queryKey: [speciesUrl],
    queryFn: async () => {
      const response = await api.get(
        speciesUrl
      );

      if(response?.data?.evolution_chain?.url) {
        const responseEvolution = await api.get(
          response?.data?.evolution_chain?.url
        );
        
        setEvolution(getEvolutionChain(responseEvolution?.data?.chain))
        return responseEvolution?.data
      }

      return response.data;
    },
  });
  
  return (
    <>
      {evolution && evolution?.map((item: any, index: number) => (
        <div key={index} className="flex md:flex-row flex-col gap-6 justify-center md:items-start items-center">
          <div className="flex flex-col gap-3 cursor-pointer" onClick={() => router.push(`/detail?id=${item?.name}`)}>
            <div className="w-[200px] h-[200px] rounded-full border-8 flex justify-center items-center" style={{borderColor: colorEvo[index]}}>
              <PokeEvolutionImage name={item?.name} />
            </div>
            <div className="w-full text-center capitalize text-xl font-bold text-gray-700">
              <p>
                {t("Pokemon Evolution")}
              </p>
              <p>
                {item?.name}
              </p>
            </div>
          </div>
          <div className="md:mt-17 md:visible hidden">
            {index < evolution?.length - 1 && (
              <ArrowForward sx={{ fontSize: "4rem", color: "var(--color-gray-700)"}}/>
            )}
          </div>
          <div className="md:hidden">
            {index < evolution?.length - 1 && (
              <ArrowDownward sx={{ fontSize: "4rem", color: "var(--color-gray-700)"}}/>
            )}
          </div>
        </div>
      ))} 
    </>
  );
}

const  getEvolutionChain = (chain: any) => {
  const evolutionList: any = [];

  const traverse = (node:any) => {
    if (!node) return;
    evolutionList.push({
      name: node?.species?.name,
      url: node?.species?.url,
      evolves_to: node?.evolves_to?.length > 0,
      details: node?.evolution_details || [],
    });

    if (node?.evolves_to && node?.evolves_to.length > 0) {
      for (const evolution of node?.evolves_to) {
        traverse(evolution);
      }
    }
  }

  traverse(chain);
  return evolutionList;
}

const colorEvo = [
  '#01B956',
  '#E6AB09',
  '#E66D00',
  '#DE2C2C',
]