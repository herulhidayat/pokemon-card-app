import { Button, Typography } from "@mui/material";
import Image from "next/image";

export default function HeroFeature() {
  return (
    <div className="flex h-full">
      <div className="w-1/2 flex flex-col justify-center">
        <Typography
          variant="h1"
          sx={{
            fontSize: "3.466rem",
            fontWeight: 600,
            color: "var(--color-gray-700)",
            marginBottom: "1rem",
          }}
        >
          {'All the Pokémon data you\'ll ever need in one place!'}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: "1.33rem",
            fontWeight: 400,
            color: "var(--color-gray-500)",
            marginBottom: "2.133rem",
          }}
        >
          Thousands of data compiled into one place
        </Typography>
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
              paddingY: "0.5rem",
              paddingX: "2.133rem",
            }}
            onClick={() => {
              const element = document.getElementById("poke-dex");
              if (element) {
                const offset = -8.5 * 15;
                const yPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
                window.scrollTo({ top: yPosition, behavior: "smooth" });
              }
            }}
          >
            Check PokèDex
          </Button>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <Image
          src="/assets/home-img.png"
          alt="Hero Image"
          width={534}
          height={631.5}
        />
      </div>
    </div>
  );
}
