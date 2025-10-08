import { useState } from "react";
import axios from "axios";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { InputSection } from "./components/InputSection";
import { ResultsSection } from "./components/ResultsSection";
import { Footer } from "./components/Footer";

export default function App() {
  // State for all 13 input fields
  const [patientData, setPatientData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [riskPercentage, setRiskPercentage] = useState<number | null>(null);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPatientData({
      ...patientData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form to backend
  const handleSubmit = async () => {
    setIsLoading(true);
    setRiskPercentage(null);

    try {
      // Convert all input values to numbers
      const numericData = Object.fromEntries(
        Object.entries(patientData).map(([key, value]) => [key, Number(value)])
      );

      // POST request to backend Node.js server
      const response = await axios.post(
        "http://localhost:5000/api/scan",
        numericData
      );

      // Set risk percentage from response
      setRiskPercentage(response.data.risk_percentage);
    } catch (err) {
      console.error("Error predicting risk:", err);
      alert("Failed to get prediction. Make sure your backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to input section when clicking Hero button
  const scrollToInput = () => {
    const inputSection = document.getElementById("input-section");
    inputSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <Header />
      <Hero onActionClick={scrollToInput} />
      <InputSection
        id="input-section"
        patientData={patientData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <ResultsSection riskPercentage={riskPercentage} isLoading={isLoading} />
      <Footer />
    </div>
  );
}
