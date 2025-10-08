import { motion } from "framer-motion";
import { HeartPulse, AlertTriangle, CheckCircle } from "lucide-react";

interface ResultsSectionProps {
  riskPercentage: number | null;
  isLoading: boolean;
}

export const ResultsSection = ({
  riskPercentage,
  isLoading,
}: ResultsSectionProps) => {
  if (isLoading || riskPercentage === null) return null;

  // Risk level logic
  let bgColor = "from-green-400 to-emerald-600";
  let textColor = "text-green-900";
  let icon = <CheckCircle className="w-10 h-10 text-green-800" />;
  let message = "Your heart seems healthy! Keep up your lifestyle ❤️";

  if (riskPercentage >= 70) {
    bgColor = "from-red-500 to-red-700";
    textColor = "text-red-100";
    icon = <AlertTriangle className="w-10 h-10 text-red-100" />;
    message = "High risk detected! Please consult a doctor immediately ⚠️";
  } else if (riskPercentage >= 40) {
    bgColor = "from-yellow-400 to-orange-500";
    textColor = "text-yellow-900";
    icon = <HeartPulse className="w-10 h-10 text-yellow-900" />;
    message = "Moderate risk — a lifestyle check is recommended 💡";
  }

  return (
    <section className="flex justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative bg-gradient-to-br ${bgColor} rounded-3xl shadow-2xl text-center text-white max-w-md w-full p-10`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex flex-col items-center"
        >
          {icon}
          <h3 className="text-2xl font-bold mt-4 mb-2">
            Predicted Heart Disease Risk
          </h3>

          {/* Animated Circular Ring */}
          <div className="relative w-48 h-48 mt-6 mb-4">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="80"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="16"
                fill="none"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="80"
                stroke="white"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={2 * Math.PI * 80}
                strokeDashoffset={2 * Math.PI * 80 * (1 - riskPercentage / 100)}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-5xl font-extrabold drop-shadow-lg">
                {riskPercentage}%
              </p>
              <p className="text-sm font-semibold mt-1 uppercase tracking-wide">
                Risk Level
              </p>
            </div>
          </div>

          <p
            className={`text-lg font-medium mt-4 ${textColor} bg-white/30 backdrop-blur-md px-4 py-2 rounded-xl`}
          >
            {message}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-8 bg-white text-red-600 font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition transform duration-300"
          >
            Check Again
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
