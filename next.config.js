/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  swSrc: "service-worker.js",
});

module.exports = withPWA({
  images: {
    domains: ["127.0.0.1"],
    port: "8000",
  },
  reactStrictMode: true,
});
