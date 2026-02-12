import { motion } from "framer-motion";

const logos = [
  "/logos/42.png",
  "/logos/confidohealth.png",
  "/logos/humanic.png",
  "/logos/kwanzoo.png",
  "/logos/maya.png",
  "/logos/nebulaiq.png",
  "/logos/reachiso.png",
  "/logos/roworksai.png",
  "/logos/scalekit.png",
  "/logos/shelfex.png",
  "/logos/vibrantlabs.png",
  "/logos/wayto.png",
];

// duplicate logos for seamless infinite scroll
const marqueeLogos = [...logos, ...logos];

const PartnerLogos = () => {
  return (
    <section className="mt-20 border-t border-black/5 pt-12 overflow-hidden">
      <p className="text-sm tracking-widest text-muted mb-8 uppercase">
        Trusted by 100+ startups and businesses
      </p>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeLogos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Partner logo"
              className="
                h-10 w-auto object-contain
                grayscale opacity-70
                hover:grayscale-0 hover:opacity-100
                transition-all duration-300
              "
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerLogos;
