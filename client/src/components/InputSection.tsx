interface InputSectionProps {
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: () => void;
  patientData: Record<string, string>;
  isLoading: boolean;
}

export const InputSection = ({
  onInputChange,
  onSubmit,
  patientData,
  isLoading,
}: InputSectionProps) => {
  return (
    <section className="bg-red-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-red-700">
          Enter Patient Details
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-10 rounded-2xl shadow-xl">
          {/* Age */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">Age</label>
            <input
              type="number"
              name="age"
              placeholder="e.g. 55"
              value={patientData.age}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            />
          </div>

          {/* Sex */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">Sex</label>
            <select
              name="sex"
              value={patientData.sex}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            >
              <option value="">Select</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>

          {/* Chest Pain Type (cp) */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              Chest Pain Type (cp)
            </label>
            <select
              name="cp"
              value={patientData.cp}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            >
              <option value="">Select</option>
              <option value="0">Typical Angina</option>
              <option value="1">Atypical Angina</option>
              <option value="2">Non-Anginal Pain</option>
              <option value="3">Asymptomatic</option>
            </select>
          </div>

          {/* Resting Blood Pressure */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              Resting BP (trestbps)
            </label>
            <input
              type="number"
              name="trestbps"
              placeholder="e.g. 140"
              value={patientData.trestbps}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            />
          </div>

          {/* Cholesterol */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              Cholesterol (chol)
            </label>
            <input
              type="number"
              name="chol"
              placeholder="e.g. 250"
              value={patientData.chol}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            />
          </div>

          {/* Fasting Blood Sugar */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              Fasting Blood Sugar &gt;120 (fbs)
            </label>
            <select
              name="fbs"
              value={patientData.fbs}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            >
              <option value="">Select</option>
              <option value="1">True</option>
              <option value="0">False</option>
            </select>
          </div>

          {/* Resting ECG */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              Resting ECG (restecg)
            </label>
            <select
              name="restecg"
              value={patientData.restecg}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            >
              <option value="">Select</option>
              <option value="0">Normal</option>
              <option value="1">ST-T Wave Abnormality</option>
              <option value="2">Left Ventricular Hypertrophy</option>
            </select>
          </div>

          {/* Max Heart Rate */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              Max Heart Rate (thalach)
            </label>
            <input
              type="number"
              name="thalach"
              placeholder="e.g. 150"
              value={patientData.thalach}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            />
          </div>

          {/* Exercise Induced Angina */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              Exercise Angina (exang)
            </label>
            <select
              name="exang"
              value={patientData.exang}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          {/* Oldpeak */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              ST Depression (oldpeak)
            </label>
            <input
              type="number"
              step="0.1"
              name="oldpeak"
              placeholder="e.g. 1.5"
              value={patientData.oldpeak}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            />
          </div>

          {/* Slope */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              Slope of ST Segment (slope)
            </label>
            <select
              name="slope"
              value={patientData.slope}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            >
              <option value="">Select</option>
              <option value="0">Upsloping</option>
              <option value="1">Flat</option>
              <option value="2">Downsloping</option>
            </select>
          </div>

          {/* Number of Vessels */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              Major Vessels Colored (ca)
            </label>
            <input
              type="number"
              name="ca"
              placeholder="0-3"
              value={patientData.ca}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            />
          </div>

          {/* Thalassemia */}
          <div>
            <label className="block mb-1 font-semibold text-red-600">
              Thalassemia (thal)
            </label>
            <select
              name="thal"
              value={patientData.thal}
              onChange={onInputChange}
              className="border border-red-300 focus:ring-2 focus:ring-red-400 focus:border-red-500 p-3 rounded-lg w-full"
            >
              <option value="">Select</option>
              <option value="1">Normal</option>
              <option value="2">Fixed Defect</option>
              <option value="3">Reversible Defect</option>
            </select>
          </div>
        </form>

        {/* Submit Button */}
        <div className="text-center mt-10">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-red-600 text-black font-bold px-10 py-4 rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition transform duration-300 disabled:opacity-50 border-2 border-red-800"
          >
            {isLoading ? "Analyzing..." : "Predict Risk"}
          </button>
        </div>
      </div>
    </section>
  );
};
