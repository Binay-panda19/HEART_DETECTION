interface ResultsSectionProps {
  riskPercentage: number | null;
  isLoading: boolean;
}

export const ResultsSection = ({
  riskPercentage,
  isLoading,
}: ResultsSectionProps) => {
  if (isLoading || riskPercentage === null) return null;

  // Risk color logic
  let riskColor = "bg-red-200";
  let textColor = "text-red-800";
  if (riskPercentage >= 70) {
    riskColor = "bg-red-600";
    textColor = "text-black";
  } else if (riskPercentage >= 40) {
    riskColor = "bg-red-400";
    textColor = "text-black";
  }

  return (
    <section className=" py-20 flex justify-center">
      <div
        className={`p-12 rounded-3xl shadow-2xl text-center ${riskColor} ${textColor} max-w-md w-full border-3 border-black rounded`}
      >
        <h3 className="text-2xl font-bold mb-4">
          Predicted Heart Disease Risk
        </h3>
        <p className="text-5xl font-extrabold">{riskPercentage}%</p>
      </div>
    </section>
  );
};
