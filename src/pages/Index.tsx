import { useState, useMemo } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import VideoGrid from "@/components/VideoGrid";
import Footer from "@/components/Footer";

// Extract Google Drive file IDs from the provided links
const videoData = {
  "Talking Head": [
    "1-wTNkJp6f7CTYKg71MhcHF_HvC5ZuSG-",
    "185_Y6JgKl-XZHVziEatDRXkiRCzs55KH",
    "1GVD_svf60n6QlnjsuDzGEDgnDeG_Meeh",
    "1m8TDtW97g3155UVXlL6q8VA0hpned8t1",
  ],
  "Real Estate": [
    "1S7_3sCLPpBbuFsE0HofdxW5CEA-dZocM",
    "1Hu8rJoF4J5Y5WSFQpkLtU2TrhnUVsnCt",
  ],
  "Faceless": [
    "15a8c7qyGmzIlf1fasOR8vHNvOi3DQlbx",
    "1qfN182MXAakFNedkWU6b6Hry6tIcoxpW",
    "1n_fZI_5KmcZIwSMn5mtD8i5KuTLo5eR4",
    "1YYQ2X0hIF6xVYDhVwymfkEQktSActdVz",
  ],
  "Travel": [
    "1aRQIE6uAeXvv5pZ8SOVq4h2nzLgMTLTD",
    "1AVxcPaLePurrW3QpSx6POhxpeJqMV7nh",
    "1ptCgntmM7L6hAbreHU68AJ8Ump29xGU2",
  ],
  "Wedding": [
    "1okKBvyUNGFuC29Lgr7fvHWn3jBPIx98n",
    "1qnAMkZysC7vCfcPGfLaDFutG0gFWzdIh",
    "1utkSBAF1ZSdBEeXRJqTXkxmxDfz9sqdV",
  ],
};

const categories = ["All", ...Object.keys(videoData)];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") {
      return Object.entries(videoData).flatMap(([category, ids]) =>
        ids.map((id) => ({ id, category }))
      );
    }
    return (videoData[activeCategory as keyof typeof videoData] || []).map((id) => ({
      id,
      category: activeCategory,
    }));
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main key={activeCategory}>
        <VideoGrid videos={filteredVideos} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
