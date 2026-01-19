import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface GalleryImage {
  id: string;
  name: string;
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren" as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function GalleryGrid() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/gallery");
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        setImages(data.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load images");
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl bg-pink-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-stone-500">
        <p>{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-10 text-stone-500">
        <p>No images in the gallery yet.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05, 
            rotate: index % 2 === 0 ? 2 : -2,
          }}
          whileTap={{ scale: 0.95 }}
          className="aspect-square rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-pink-50"
        >
          <img
            src={image.url}
            alt={image.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
