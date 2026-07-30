import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  async redirects() {
    const wires = [
      "/polycab-wires.php",
      "/polycab-wires/polycab-wires.php",
      "/building-wire/polycab-etira-fr-lsh.php",
      "/building-wire/polycab-etira-fr.php",
      "/building-wire/polycab-fr-lf.php",
      "/building-wire/polycab-fr-lsh.php",
      "/building-wire/polycab-hffr-70.php",
      "/building-wire/polycab-hr-frlsh-lf-green-wire.php",
      "/service-wire/polycab-service-wire.php",
    ];

    const cables = [
      "/polycab-cables.php",
      "/polycab-cables/communication-cables.php",
      "/polycab-cables/energy-cables.php",
      "/polycab-cables/special-cables.php",
      "/panel-wire/polycab-panel-wires-bs.php",
      "/panel-wire/polycab-panel-wires-is-17048.php",
      "/panel-wire/polycab-panel-wires-is-694.php",
      "/lv-power-cable/polycab-lv-aerial-bunched-cable-is.php",
      "/lv-power-cable/polycab-lv-power-cable-bs-5467.php",
      "/lv-power-cable/polycab-lv-power-cable-bs-6724.php",
      "/lv-power-cable/polycab-lv-power-cable-is.php",
      "/lv-control-cable/polycab-lv-control-cable-is.php",
      "/mv-power-cable/polycab-ht-aerial-bunched-cable.php",
      "/mv-power-cable/polycab-mv-power-cable-as-nzs.php",
      "/mv-power-cable/polycab-mv-power-cable-bs-5467.php",
      "/mv-power-cable/polycab-mv-power-cable-bs-6622.php",
      "/mv-power-cable/polycab-mv-power-cable-bs-6724.php",
      "/mv-power-cable/polycab-mv-power-cable-bs-7835.php",
      "/mv-power-cable/polycab-mv-power-cable-bs.php",
      "/mv-power-cable/polycab-mv-power-cable-icea.php",
      "/mv-power-cable/polycab-mv-power-cable-iec-60502-2.php",
      "/mv-power-cable/polycab-mv-power-cable-is.php",
      "/industrial-cable/polycab-festoon-cable.php",
      "/industrial-cable/polycab-industrial-braided-cable.php",
      "/industrial-cable/polycab-industrial-flexible-cable-bs-6004.php",
      "/industrial-cable/polycab-industrial-flexible-cable-bs-7211.php",
      "/industrial-cable/polycab-industrial-flexible-cable-bs-en-50525-2-31-1.php",
      "/industrial-cable/polycab-industrial-flexible-cable-bs-en-50525-3-41-1.php",
      "/industrial-cable/polycab-industrial-flexible-cable-is-17048-1.php",
      "/industrial-cable/polycab-industrial-flexible-cable-is-694-1.php",
      "/industrial-cable/polycab-mining-cable-is-14494.php",
      "/industrial-welding-cable/polycab-industrial-welding-cable-bs.php",
      "/industrial-welding-cable/polycab-industrial-welding-cable-is.php",
      "/instrumentation-cable/polycab-bms-cable.php",
      "/instrumentation-cable/polycab-instrumentation-cable-bs.php",
      "/fire-resistant-cable/polycab-fire-servival-cable-bs-ignis.php",
      "/heat-resistant-cable/polycab-heat-resistant-cable-bs.php",
      "/heat-resistant-cable/polycab-heat-resistant-cable-is.php",
      "/rubber-cable/polycab-rubber-cable-bs-en-50525-2-21.php",
      "/rubber-cable/polycab-rubber-cable-is-9968-P1.php",
      "/rubber-cable/polycab-rubber-cable-is-9968-P2.php",
      "/submersible-cable/polycab-3-core-flat-cable.php",
      "/submersible-cable/polycab-submersible-wires-is.php",
      "/ehv-power-cable-iec/polycab-ehv-power-cable-iec.php",
      "/lighting-and-domestic-aplliances/polycab-lighting-and-domestic-aplliances.php",
      "/metal-clad-cable/polycab-metal-clad-cable.php",
      "/marine-shipwiring-cables/polycab-marineshipwiring-cables.php",
      "/optical-fiber-cable/polycab-optical-fiber-cables.php",
      "/cctv-cable/polycab-cctv.php",
      "/coaxial-cable/polycab-coaxial-cable.php",
      "/speaker-cable/polycab-speaker-cable.php",
    ];

    return [
      // Top-level pages
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      { source: "/pricelist.php", destination: "/pricelist", permanent: true },
      { source: "/contact.php", destination: "/contact", permanent: true },
      { source: "/catalogue.php", destination: "/catalogue", permanent: true },
      { source: "/catalogue_cables.php", destination: "/catalogue/cables", permanent: true },
      { source: "/catalogue_wires.php", destination: "/catalogue/wires", permanent: true },

      // Every legacy wires page (product-line pages under /building-wire/, /service-wire/, etc.)
      // now consolidates into the single, fully-catalogued Wires page.
      ...wires.map((source) => ({ source, destination: "/products/wires", permanent: true })),

      // Every legacy cables page (60+ individual product-type pages under
      // /lv-power-cable/, /mv-power-cable/, /industrial-cable/, etc., plus the three
      // energy/special/communication category pages) consolidates into the single,
      // fully-catalogued Cables page.
      ...cables.map((source) => ({ source, destination: "/products/cables", permanent: true })),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arihantcables.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
