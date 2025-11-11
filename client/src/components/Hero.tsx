import { motion } from "framer-motion";

interface HeroProps {
  onActionClick: () => void;
}

export const Hero = ({ onActionClick }: HeroProps) => {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-40 bg-gradient-to-br from-red-50 to-pink-100 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6"
      >
        AI Heart Health Predictor
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg text-gray-700 max-w-xl mb-10"
      >
        Analyze your heart health instantly using AI and get personalized risk
        predictions.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onActionClick}
        className="bg-red-600 hover:bg-red-700 text-black px-8 py-4 rounded-full shadow-lg font-semibold text-lg"
      >
        Check Your Heart Risk
      </motion.button>
    </section>
  );
};
