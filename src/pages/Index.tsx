import { useState, useMemo, useRef } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import VideoGrid from "@/components/VideoGrid";
import ShortFormGrid from "@/components/ShortFormGrid";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

// Long form video data (removed Faceless)
const longFormData = {
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

// Short form videos (previously Faceless)
const shortFormVideos = [
  "15a8c7qyGmzIlf1fasOR8vHNvOi3DQlbx",
  "1qfN182MXAakFNedkWU6b6Hry6tIcoxpW",
  "1n_fZI_5KmcZIwSMn5mtD8i5KuTLo5eR4",
  "1YYQ2X0hIF6xVYDhVwymfkEQktSActdVz",
];

const categories = ["All", ...Object.keys(longFormData)];

// Round-robin function to interleave videos from all categories
const getRoundRobinVideos = () => {
  const categoryArrays = Object.entries(longFormData).map(([category, ids]) => ({
    category,
    ids: [...ids],
    currentIndex: 0,
  }));
  
  const result: { id: string; category: string }[] = [];
  let hasMore = true;
  
  while (hasMore) {
    hasMore = false;
    for (const cat of categoryArrays) {
      if (cat.currentIndex < cat.ids.length) {
        result.push({
          id: cat.ids[cat.currentIndex],
          category: cat.category,
        });
        cat.currentIndex++;
        hasMore = hasMore || cat.currentIndex < cat.ids.length;
      }
    }
  }
  
  return result;
};

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const longFormRef = useRef<HTMLDivElement>(null);
  const shortFormRef = useRef<HTMLDivElement>(null);

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") {
      return getRoundRobinVideos();
    }
    return (longFormData[activeCategory as keyof typeof longFormData] || []).map((id) => ({
      id,
      category: activeCategory,
    }));
  }, [activeCategory]);

  const handleNavigate = (section: 'long' | 'short') => {
    const ref = section === 'long' ? longFormRef : shortFormRef;
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} />
      
      {/* Long Form Section */}
      <section ref={longFormRef} className="pt-8">
        <SectionTitle 
          title="Long Form" 
          subtitle="Documentary-style videos and full-length content"
        />
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <main>
          <VideoGrid key={activeCategory} videos={filteredVideos} />
        </main>
      </section>

      {/* Short Form Section */}
      <section ref={shortFormRef} className="pt-16 pb-16">
        <SectionTitle 
          title="Short Form" 
          subtitle="Vertical content optimized for social media"
        />
        <ShortFormGrid videos={shortFormVideos} />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
