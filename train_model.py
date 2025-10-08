# train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
import joblib

# Load dataset
df = pd.read_csv(r"C:\Users\LENOVO\OneDrive\Desktop\CLASSROOM\PROJECTS\HEART_DETECTION\server/heart_data.csv")

# Features and target
X = df.drop("target", axis=1)
y = df["target"]

# Split dataset (optional, mainly for evaluation)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Decision Tree model
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Save trained model
joblib.dump(model, r"C:\Users\LENOVO\OneDrive\Desktop\CLASSROOM\PROJECTS\HEART_DETECTION\heart_model.pkl")
print("Model saved successfully!")
