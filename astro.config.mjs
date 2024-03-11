import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import swup from "@swup/astro";
import { loadEnv } from "vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    swup({
      theme: "slide",
      smoothScrolling: true,
      resolveUrl: (url) => {
        if (url.startsWith("/videos/?")) {
          return "/videos/";
        }
        console.log(url);
        return url;
      },
      linkSelector: "a[href]",
    }),
  ],
});
