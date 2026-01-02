import { useState, useMemo, useRef } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import VideoGrid from "@/components/VideoGrid";
import ShortFormGrid from "@/components/ShortFormGrid";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";

// Long form video data
const longFormData = {
  "Talking Head": [
    "1utkSBAF1ZSdBEeXRJqTXkxmxDfz9sqdV",
    "1eDQuOKaMJWAVppOi_HGA8H0Cd4-nXLmK",
    "1-pSgFrZudsd9-xpa_nptd-Xv0TNnd5gY",
    "1tckgCRz2pM0hnsGT96ZRqiMmhb3N9s5G",
    "1y_qHaPeBmrBp1XbJqOflVS28kX1gWj8x",
    "1S_IgeaacexgayR5NlN1vaaDIo0VgF0zW",
  ],
  "Real Estate": [
    "1DdEUc-0ZkhFswS-KGqso78g2F8czOqqq",
    "1CXgZ19uNU5J_pc04VNQjSoTxl4YTmR90",
    "1FfP8i-UX4DJQGO7vZ6fQ0QdDc719lTOe",
    "1YQ4JJKE-_N5cdzmPCD_h6MD2Z3BHr5Qu",
    "1Ujgr0F4BjQXb04wKGcKXC7J13-5W_Hw5",
    "1l-CXG5PLoVFNO9lgU07B3l4gexjdhyle",
    "1mw9p8puvGEpBIlUiI8BaAusV9MzU82gj",
    "12VhoDNNc_W-9kkLWjOiaq2ToY91cOfrx",
  ],
  "Travel": [
    "11hBwMh8FlzWOS7o4Za99iwc0aqZfCHE2",
    "14E1lacZZIuIdGaZEpXHNi6eLomGLlq_G",
    "1X_PystO29iFbtx6fVaCKFbuskGB_7fAI",
    "109CirQMvlYVV-KL_Oh6FgsgQ69KKmbGS",
    "1W9QOXzt_awPpNqRIYhSvYZ-g1djckuRN",
    "1IxI4w0rZ37Tunq9OevPyaFMUTrfX0zud",
  ],
  "Wedding": [
    "1Eespy9U1elPREE3B--IEC6WA9ANC2F4r",
    "1OTBhHGPDcZ0nGzAZg3tTyU4_LcPpqWCc",
    "1XjvloZCO3ZUKyGg3F1ij6q6SukZL1Ci0",
    "1CwFq-Ie1_mAEkpwM68YunFqtrkCAjiFV",
    "1b3anH2DAjYGc1o4jG2GTTa1U6LWeyeGY",
    "1miVvXOfPdW3oTMnl-ERrh1YfUE7fty3T",
    "1plm6bnF5IQXh5XVfWLL7stAlteA_oXO9",
    "1Uf7zes7vrBdN9P6Axn7d_JUlxN6TEujX",
    "1mjnfJUYxrFzM7Hr30KwKw7KmGNo1XpPd",
    "1Cmp9PZcoi9udNaC5c4K1bNRTqd7FXHbe",
  ],
};

// Short form videos
const shortFormVideos = [
  "175rpKn2XU1m7FhWUbpbhVyvmQWLtQRtf",
  "1EDrpuzWrLU42gVVymTjsABsCrut2tBpw",
  "1WdHbPPXXC4CloyhIhXOLiAdaL_YyqWxv",
  "1eOQd2VzwvUZb6pTZxS5X9AN18Z7PALxE",
  "1HZ0gARcFn36td1pzM9wDZDkd8cp8ZzPn",
  "1qVbY9Gdmo1JFHAC6Ui6q_V58XIqV3t8V",
  "11c3fLJF70XfftEznajNswK7RI0EL_AlV",
  "1_COTDfcWxpWWLfETs6mQJl45CatlN9gW",
  "1H4zwBkwT_-mu5aiFrj0E6XXACE25Mbnv",
  "1gj-IXvCP9FPsCc3hLFMCn2ZxZ-yeOoQy",
  "11CrGAfB2NQ5-bGsOOBct1qcgso1HJel_",
  "1SVnhA094XW6Cv8Q5zOBWe6vuXZqcGkc9",
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
          subtitle="High-quality long-form content and cinematic storytelling"
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
