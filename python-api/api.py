from fastapi import FastAPI
from pydantic import BaseModel
import joblib

# Load model
model = joblib.load(r"C:\Users\LENOVO\OneDrive\Desktop\CLASSROOM\PROJECTS\HEART_DETECTION\python-api\heart_model.pkl")

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
