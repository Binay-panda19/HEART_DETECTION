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
  let bgColor = "from-red-50 to-white";
  let textColor = "text-green-900";
  let borderColor = "border-green-400";
  let icon = <CheckCircle className="w-10 h-10 text-green-700" />;
  let message = "Your heart seems healthy! Keep up your lifestyle ❤️";

  if (riskPercentage >= 70) {
    bgColor = "from-red-100 to-red-50";
    textColor = "text-red-700";
    borderColor = "border-red-500";
    icon = <AlertTriangle className="w-10 h-10 text-red-700" />;
    message = "High risk detected! Please consult a doctor immediately ⚠️";
  } else if (riskPercentage >= 40) {
    bgColor = "from-yellow-50 to-orange-50";
    textColor = "text-yellow-800";
    borderColor = "border-yellow-400";
    icon = <HeartPulse className="w-10 h-10 text-yellow-700" />;
    message = "Moderate risk — a lifestyle check is recommended 💡";
  }

  return (
    <section className="flex justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative bg-gradient-to-br ${bgColor} border ${borderColor} rounded-3xl shadow-lg text-center max-w-md w-full p-10`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="flex flex-col items-center"
        >
          {icon}
          <h3 className="text-2xl font-bold mt-4 mb-2 text-black">
            Predicted Heart Disease Risk
          </h3>

          {/* Animated Circular Ring */}
          <div className="relative w-56 h-56 mt-6 mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="112"
                cy="112"
                r="96"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="16"
                fill="none"
              />
              <motion.circle
                cx="112"
                cy="112"
                r="96"
                stroke="#ef4444"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={2 * Math.PI * 96}
                strokeDashoffset={2 * Math.PI * 96 * (1 - riskPercentage / 100)}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <p className="text-5xl font-extrabold text-black drop-shadow-sm">
                {riskPercentage}%
              </p>
              <p className="text-sm font-semibold mt-1 uppercase tracking-wide text-red-700">
                Risk Level
              </p>
            </div>
          </div>

          <p
            className={`text-lg font-medium mt-4 ${textColor} bg-red-100/50 backdrop-blur-sm px-4 py-2 rounded-xl`}
          >
            {message}
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-8 bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            Check Again
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
