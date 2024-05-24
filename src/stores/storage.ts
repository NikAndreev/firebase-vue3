import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
import http from "../http";

const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;

export const useStorageStore = defineStore("storage", () => {
  const store = useAuthStore();

  const uploadFile = async (file: File) => {
    const fileName = `${file.name}#${Date.now()}`;

    try {
      const response = await http({
        method: "post",
        url: `https://firebasestorage.googleapis.com/v0/b/${STORAGE_BUCKET}/o/${encodeURIComponent(
          fileName
        )}?uploadType=media`,
        headers: {
          Authorization: `Bearer ${store.tokens?.id}`,
          "Content-Type": file.type,
        },
        data: file,
      });

      const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/${STORAGE_BUCKET}/o/${encodeURIComponent(
        response.data.name
      )}?alt=media&token=${response.data.downloadTokens}`;

      return downloadUrl;
    } catch (error: unknown) {
      throw error;
    }
  };

  return {
    uploadFile,
  };
});
