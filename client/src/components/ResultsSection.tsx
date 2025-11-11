import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { HeartPulse, AlertTriangle, CheckCircle } from "lucide-react";

interface ResultsSectionProps {
  riskPercentage: number | null;
  isLoading: boolean;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  riskPercentage,
  isLoading,
}) => {
  // ---------------------------
  // Hooks (always at top-level)
  // ---------------------------
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  // Subscribe to rounded motion value -> update displayValue (safe to run always)
  useEffect(() => {
    const unsubscribe = rounded.on("change", (v: number) => {
      // rounded emits numbers; ensure state is number
      setDisplayValue(typeof v === "number" ? v : Number(v));
    });
    return () => unsubscribe();
  }, [rounded]);

  // Animate count whenever riskPercentage changes. If no result, animate to 0.
  useEffect(() => {
    // If loading or no result, reset the counter gracefully
    if (isLoading || riskPercentage === null) {
      const resetAnim = animate(count, 0, { duration: 0.5 });
      return () => resetAnim.stop();
    }

    // animate to the new riskPercentage
    const controls = animate(count, riskPercentage, {
      duration: 1.2,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [riskPercentage, isLoading, count]);

  // Show modal when risk >= 70 (keep effect separate)
  useEffect(() => {
    if (riskPercentage !== null && riskPercentage >= 70) {
      setShowDoctorModal(true);
    } else {
      setShowDoctorModal(false);
    }
  }, [riskPercentage]);

  // ---------------------------
  // Presentation logic (pure)
  // ---------------------------
  // Determine visual style even when riskPercentage is null
  const rp = typeof riskPercentage === "number" ? riskPercentage : 0;
  let bgColor = "from-green-50 to-white";
  let icon = <CheckCircle className="w-10 h-10 text-green-700" />;
  let message = "Your heart seems healthy! Keep up your lifestyle ❤️";
  let strokeColor = "#22c55e"; // green

  if (rp >= 70) {
    bgColor = "from-red-100 to-red-50";
    icon = <AlertTriangle className="w-10 h-10 text-red-700" />;
    message = "⚠️ High risk detected! Please consult a doctor immediately.";
    strokeColor = "#ef4444";
  } else if (rp >= 40) {
    bgColor = "from-yellow-50 to-orange-50";
    icon = <HeartPulse className="w-10 h-10 text-yellow-700" />;
    message = "Moderate risk — a lifestyle check is recommended 💡";
    strokeColor = "#f59e0b";
  }

  // ---------------------------
  // JSX - always rendered (no early return)
  // ---------------------------
  return (
    <section className="flex justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className={`relative bg-gradient-to-br ${bgColor} border rounded-3xl shadow-2xl text-center max-w-md w-full p-8`}
      >
        {/* top - icon and title */}
        <div className="flex flex-col items-center">
          {icon}
          <h3 className="text-2xl font-bold mt-4 mb-2 text-gray-900">
            Predicted Heart Disease Risk
          </h3>
        </div>

        {/* Gauge area */}
        <div className="relative flex items-center justify-center w-32 h-32 mt-4 mb-6 mx-auto">
          <svg
            className="absolute w-full h-full transform -rotate-90"
            viewBox="0 0 140 140"
          >
            {/* Background ring */}
            <circle
              cx="70"
              cy="70"
              r="55"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="10"
              fill="none"
            />
            {/* Animated progress ring */}
            <motion.circle
              cx="70"
              cy="70"
              r="55"
              stroke={strokeColor}
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={2 * Math.PI * 55}
              animate={{
                strokeDashoffset: 2 * Math.PI * 55 * (1 - rp / 100),
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>

          {/* Centered text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-extrabold text-gray-900">
              {displayValue}
              <span className="text-base font-semibold">%</span>
            </p>
            <p className="text-[10px] font-semibold mt-1 uppercase tracking-wide text-gray-700">
              Risk Level
            </p>
          </div>
        </div>

        <br></br>
        <br></br>

        {/* message + actions */}
        <p className="text-md font-medium mt-2 text-gray-700 bg-white/60 px-4 py-2 rounded-xl">
          {isLoading ? "Analyzing your heart health..." : message}
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-red-600 text-black font-bold px-5 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            Check Again
          </button>
        </div>
      </motion.div>
    </section>
  );
};
