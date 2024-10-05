import { useEffect, useState } from "react";

export const useFileSize = (fileSize: number) => {
  const [formattedSize, setFormattedSize] = useState("");

  useEffect(() => {
    const formatSize = (sizeInBytes: number) => {
      if (sizeInBytes === 0) {return "0B";}

      const units = ["B", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));

      return Math.round(sizeInBytes / Math.pow(1024, i)) + " " + units[i];
    };

    setFormattedSize(formatSize(fileSize));
  }, [fileSize]);

  return formattedSize;
};