// public/service-worker.js

import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";

// Precache and route assets from the build output directory
precacheAndRoute(self.__WB_MANIFEST);

// Cache static assets from the public directory
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst()
);

// Cache fonts using StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => request.destination === "font",
  new StaleWhileRevalidate()
);

// Define a navigation route that serves an HTML file
registerRoute(new NavigationRoute(new StaleWhileRevalidate()));
