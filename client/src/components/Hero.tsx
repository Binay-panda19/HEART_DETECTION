import { motion } from "framer-motion";
import { HeartPulse, Activity, Stethoscope } from "lucide-react";

interface HeroProps {
  onActionClick: () => void;
}

export const Hero = ({ onActionClick }: HeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-500 via-rose-600 to-pink-500 text-black py-28">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-pink-400 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-700 opacity-30 blur-3xl rounded-full"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 md:px-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left md:w-1/2 mt-10 md:mt-0"
        >
          <div className="flex justify-center md:justify-start mb-4 space-x-3">
            <HeartPulse className="w-10 h-10 text-white" />
            <Activity className="w-10 h-10 text-white" />
            <Stethoscope className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Predict Your <span className="text-yellow-300">Heart Risk</span> in
            Seconds
          </h1>

          <p className="text-lg md:text-xl mb-10 text-gray-100">
            Leverage{" "}
            <span className="font-semibold text-red">AI-driven insights</span>{" "}
            to understand your heart health. Enter your details and get a quick,
            personalized risk assessment.
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={onActionClick}
            className="bg-white text-red-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-all"
          >
            Get Started
          </motion.button>

          <div className="mt-6 text-sm text-gray-200">
            100% Secure • No Data Stored • AI Powered
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src="https://cdn.pixabay.com/photo/2018/06/26/08/28/heart-3498851_640.jpg"
            alt="Heart health illustration"
            className="w-80 md:w-96 drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
};
