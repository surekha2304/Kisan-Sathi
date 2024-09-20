from flask import Flask, render_template, request
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load the trained machine learning model
model = joblib.load("crop recommendation")

@app.route('/')
def home():
    return render_template('pri.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input values from the form
    if request.method == 'POST':
        values = [float(x) for x in request.form.values()]
        features = np.array(values).reshape(1, -1)  # Reshape to match the input shape of the model

        # Make prediction
        prediction = model.predict(features)
        predicted_label = prediction[0]  # Assuming only one prediction is made

        # Get the label name corresponding to the predicted label index
        label_mapping = {0: 'Crop_1', 1: 'Crop_2', 2: 'Crop_3'}  # Update with your label mapping
        predicted_crop = label_mapping.get(predicted_label, "Unknown")

        return render_template('result.html', prediction=predicted_crop)

if __name__ == '__main__':
    app.run(debug=True)
