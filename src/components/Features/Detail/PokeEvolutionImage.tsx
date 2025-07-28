import { API_PATH } from "@/services/_path.service";
import api from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function PokeEvolutionImage({ name }: { name: string }) {
    const getDataCard = useQuery({
        queryKey: [name],
        queryFn: async () => {
            if(!name) return
          const response = await api.get(`https://pokeapi.co/api/${API_PATH().card.getAll}/${name}`);
    
          return response.data;
        },
      });

    return (
        <>
            {getDataCard?.data?.sprites?.front_default && (
                <Image src={getDataCard?.data?.sprites?.front_default} alt={name} width={200} height={200} />
            )}
        </>
    )
}