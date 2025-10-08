# -*- coding: utf-8 -*-
"""
Heart Disease Prediction - Local Version
Author: Your Name
"""

# Step 1: Import libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import classification_report, accuracy_score
import matplotlib.pyplot as plt
import joblib  # For saving/loading model

# Step 2: Load dataset
DATA_PATH = r"C:\Users\LENOVO\OneDrive\Desktop\CLASSROOM\PROJECTS\HEART_DETECTION\heart.csv"
df = pd.read_csv(DATA_PATH)

print("Dataset loaded successfully!\n")
print(df.head())
print("\nDataset info:\n")
print(df.info())

# Step 3: Define features (X) and target (y)
X = df.drop('target', axis=1)  # Target column
y = df['target']

# Step 4: Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Step 5: Initialize and train Decision Tree model
dt_model = DecisionTreeClassifier(random_state=42)
dt_model.fit(X_train, y_train)

# Step 6: Evaluate model
y_pred = dt_model.predict(X_test)
print("\nAccuracy on test set:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Step 7: Optional - Visualize decision tree (limited depth for clarity)
plt.figure(figsize=(16,8))
plot_tree(
    dt_model,
    feature_names=X.columns,
    class_names=['No Disease', 'Heart Disease'],
    filled=True,
    max_depth=3
)
plt.show()

# Step 8: Save model to file for future use
MODEL_PATH = r"C:\Users\LENOVO\OneDrive\Desktop\CLASSROOM\PROJECTS\HEART_DETECTION\heart_model.pkl"
joblib.dump(dt_model, MODEL_PATH)
print(f"\nModel saved at: {MODEL_PATH}")

# Step 9: Example - Predict heart disease probability for a single patient
# Make sure the input order matches dataset columns
example_patient = [52, 1, 0, 125, 212, 0, 1, 168, 0, 1.0, 2, 2, 3]  

risk_probability = dt_model.predict_proba([example_patient])[0][1] * 100
print(f"\nPredicted risk of heart disease for example patient: {risk_probability:.2f}%")
