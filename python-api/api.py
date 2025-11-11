from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import numpy as np

# ------------------ Load Model ------------------
MODEL_PATH = os.path.join(os.path.dirname(__file__), "heart_model.pkl")

try:
    model = joblib.load(MODEL_PATH)
    print("✅ Model loaded successfully:", type(model))
except Exception as e:
    model = None
    print("⚠️ Error loading model:", e)

# ------------------ FastAPI Setup ------------------
app = FastAPI(title="Heart Disease Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Input Schema ------------------
class Patient(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int


@app.get("/")
def home():
    return {"message": "💓 Heart Disease Prediction API running successfully!"}


# ------------------ Warm-up ------------------
@app.on_event("startup")
def warm_up():
    global model
    if model is not None:
        try:
            model.predict_proba([[52, 1, 0, 125, 212, 0, 1, 168, 0, 1.0, 2, 2, 3]])
            print("🔥 Model warmed up at startup!")
        except Exception as e:
            print("⚠️ Warm-up failed:", e)


# ------------------ Prediction Route ------------------
@app.post("/predict")
def predict(patient: Patient):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded!")

    # Prepare features in correct order
    features = np.array([[
        patient.age, patient.sex, patient.cp, patient.trestbps,
        patient.chol, patient.fbs, patient.restecg, patient.thalach,
        patient.exang, patient.oldpeak, patient.slope, patient.ca, patient.thal
    ]])

    try:
        # ----------- Get probabilities + class labels -----------
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(features)[0]
            classes = getattr(model, "classes_", None)
        elif hasattr(model, "named_steps") and "model" in model.named_steps:
            model_step = model.named_steps["model"]
            proba = model_step.predict_proba(features)[0]
            classes = getattr(model_step, "classes_", None)
        else:
            raise ValueError("❌ Model does not support probability prediction")

        # ----------- Determine which class = disease -----------
        # Print to terminal so you can see it clearly
        print(f"🧩 Model classes_: {classes}")
        print(f"🧩 Raw predict_proba output: {proba}")

        # By convention in heart.csv: 1 = heart disease, 0 = healthy
        # Find the index of class '1' in model.classes_
        disease_index = None
        if classes is not None:
            if 1 in classes:
                disease_index = int(np.where(classes == 1)[0][0])
            else:
                # fallback if labels are reversed
                disease_index = 0
        else:
            disease_index = 1

        print(f"🩺 Using probability column index: {disease_index}")

        # ---------- Compute risk (with demo smoothing) ----------
        risk = 100 - (float(proba[disease_index]) * 100)



        # ----------- Interpretation -----------
        interpretation = (
            "High Risk ⚠️" if risk > 65 else
            "Moderate Risk ⚠" if risk > 35 else
            "Low Risk ✅"
        )

        print(f"✅ Final risk: {risk:.2f}% -> {interpretation}")

        return {
            "risk_percentage": round(risk, 2),
            "interpretation": interpretation
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
