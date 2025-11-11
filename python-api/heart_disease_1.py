# -*- coding: utf-8 -*-
"""
Heart Disease Prediction - Calibrated Random Forest
Author: Binaya Kumar Panda
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
import joblib
import matplotlib.pyplot as plt

# ---------------------- Step 1: Load Dataset ----------------------
DATA_PATH = r"C:\Users\LENOVO\OneDrive\Desktop\CLASSROOM\PROJECTS\HEART_DETECTION\python-api\heart.csv"
df = pd.read_csv(DATA_PATH)
print("✅ Dataset loaded successfully!")
print(df.head(), "\n")

# ---------------------- Step 2: Features and Target ----------------------
X = df.drop("target", axis=1)
y = df["target"]

# Just to verify labeling
print("Target distribution:\n", y.value_counts(), "\n")

# ---------------------- Step 3: Train-Test Split ----------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# ---------------------- Step 4: Random Forest + Calibration Pipeline ----------------------
rf = RandomForestClassifier(
    n_estimators=300,
    max_depth=6,
    random_state=42,
    min_samples_leaf=5
)

# The calibration layer smooths out raw probabilities
calibrated_rf = CalibratedClassifierCV(rf, method="sigmoid", cv=5)

# Combine scaling + calibrated model in one pipeline
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", calibrated_rf)
])

# ---------------------- Step 5: Train ----------------------
print("🚀 Training model...")
pipeline.fit(X_train, y_train)
print("✅ Model trained successfully!")

# ---------------------- Step 6: Evaluate ----------------------
y_pred = pipeline.predict(X_test)
y_proba = pipeline.predict_proba(X_test)[:, 1]
acc = accuracy_score(y_test, y_pred)
roc_auc = roc_auc_score(y_test, y_proba)

print(f"\n✅ Accuracy on test set: {acc*100:.2f}%")
print(f"🏆 ROC-AUC Score: {roc_auc:.3f}")
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# ---------------------- Step 7: Feature Importance (Optional) ----------------------
try:
    # Newer sklearn: access the underlying estimator safely
    calibrated = pipeline.named_steps["model"]
    rf_model = calibrated._get_estimator()  # works in sklearn ≥1.2

    importances = rf_model.feature_importances_
    indices = np.argsort(importances)[::-1]

    plt.figure(figsize=(10,6))
    plt.title("Feature Importance - Random Forest")
    plt.bar(range(X.shape[1]), importances[indices], align="center")
    plt.xticks(range(X.shape[1]), X.columns[indices], rotation=90)
    plt.tight_layout()
    plt.show()

except Exception as e:
    print("⚠️ Could not plot feature importance:", e)


# ---------------------- Step 8: Save Model ----------------------
MODEL_PATH = r"C:\Users\LENOVO\OneDrive\Desktop\CLASSROOM\PROJECTS\HEART_DETECTION\python-api\heart_model.pkl"
joblib.dump(pipeline, MODEL_PATH)
print(f"\n💾 Model saved successfully at: {MODEL_PATH}")

# ---------------------- Step 9: Test with Example ----------------------
example = np.array([[52, 1, 0, 125, 212, 0, 1, 168, 0, 1.0, 2, 2, 3]])
prob = pipeline.predict_proba(example)[0][1] * 100
print(f"\n🧠 Example prediction risk: {prob:.2f}%")
