import type { APIRoute } from "astro";
import ImageKit from "@imagekit/nodejs";

export const prerender = false;

const imagekit = new ImageKit({
  privateKey: import.meta.env.IMAGEKIT_PRIVATE_KEY,
});

interface ImageKitFile {
  fileId: string;
  name: string;
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  type: string;
}

export const GET: APIRoute = async () => {
  try {
    const result = await imagekit.assets.list({
      path: "gallery",
      fileType: "image",
    });

    const images = (result as ImageKitFile[])
      .filter((item) => item.type === "file")
      .map((file) => ({
        id: file.fileId,
        name: file.name,
        url: file.url,
        thumbnail: file.thumbnail,
        width: file.width,
        height: file.height,
      }));

    return new Response(JSON.stringify({ images }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gallery API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch images" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
