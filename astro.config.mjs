import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// import swup from "@swup/astro";
import { loadEnv } from "vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    // swup({
    //   globalInstance: true,
    //   theme: false,
    //   smoothScrolling: false,
    //   parallel: false,
    //   routes: [
    //     { name: "home", path: "/" },
    //     { name: "video", path: "/videos/:slug" },
    //   ],
    //   reloadScripts: false,
    //   native: false,
    //   resolveUrl: (url) => {
    //     if (url.startsWith("/videos/?")) {
    //       return "/videos/";
    //     }
    //     console.log(url);
    //     return url;
    //   },
    //   linkSelector: "a[href]",
    //   linkToSelf: "navigate",
    //   skipPopStateHandling: (event) => event.state?.source !== "swup",
    // }),
  ],
});
