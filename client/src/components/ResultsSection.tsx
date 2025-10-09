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
</div>;
