import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig, type UserConfig } from "vite";

export default () => {
  const config: UserConfig = {};

  config.plugins = [react()];

  config.resolve = {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@api": fileURLToPath(new URL("./src/shared/api", import.meta.url)),
      "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
      "@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
      "@shared:ui": fileURLToPath(new URL("./src/shared/ui", import.meta.url)),
      "@helpers": fileURLToPath(new URL("./src/shared/helpers", import.meta.url)),
      "@widgets": fileURLToPath(new URL("./src/widgets", import.meta.url)),
    },
  };

  return defineConfig(config);
};
