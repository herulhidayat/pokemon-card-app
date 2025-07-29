"use client";

import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function HeroFeature() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col-reverse md:flex-row h-auto md:h-full">
      <div className="md:w-1/2 flex flex-col justify-center">
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "1.333rem",
              md: "3.466rem",
            },
            textAlign: {
              xs: "center",
              md: "left",
            },
            fontWeight: 600,
            color: "var(--color-gray-700)",
            marginBottom: "1rem",
          }}
        >
          {t(`All the Pokémon data you'll ever need in one place!`)}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: {
              xs: "0.933rem",
              md: "1.333rem",
            },
            textAlign: {
              xs: "center",
              md: "left",
            },
            fontWeight: 400,
            color: "var(--color-gray-500)",
            marginBottom: "2.133rem",
          }}
        >
          {t("Thousands of data compiled into one place")}
        </Typography>
        <div className="flex md:justify-start justify-center">
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
            {t("Check PokèDex")}
          </Button>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center items-center p-10 md:p-0">
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
