from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import os



# Load model
model_path = os.path.join(os.path.dirname(__file__), "heart_model.pkl")
model = joblib.load(model_path)


try:
    model = joblib.load(model_path)
except FileNotFoundError:
    model = None
    print("⚠️ Model file not found! Ensure heart_model.pkl is in the same directory.")



# Input schema
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

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Heart Disease Prediction API Running"}

@app.post("/predict")
def predict(patient: Patient):
    features = [[
        patient.age, patient.sex, patient.cp, patient.trestbps, patient.chol,
        patient.fbs, patient.restecg, patient.thalach, patient.exang,
        patient.oldpeak, patient.slope, patient.ca, patient.thal
    ]]
    risk = model.predict_proba(features)[0][1] * 100
    return {"risk_percentage": round(risk, 2)}
