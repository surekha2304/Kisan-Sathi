from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
import pickle
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# Load the ML model
trained_model = pickle.load(open('crop_recommendation.pkl', 'rb'))

# Define a label encoder
encoder = LabelEncoder()

# Serve the index.html file
@app.route("/")
def home():
    return render_template("pri.html")

# Define a route for making predictions
@app.route("/predict", methods=["POST"])
def predict():
    # Get the features from the form submission
    features = {
        "N": float(request.form["N"]),
        "P": float(request.form["P"]),
        "K": float(request.form["K"]),
        "temperature": float(request.form["temperature"]),
        "humidity": float(request.form["humidity"]),
        "ph": float(request.form["ph"]),
        "rainfall": float(request.form["rainfall"])
    }
    
    # Convert features to numpy array
    features_array = np.array([features["N"], features["P"], features["K"], features["temperature"], features["humidity"], features["ph"], features["rainfall"]]).reshape(1, -1)
    
    # Make prediction
    prediction = trained_model.predict(features_array)
    
    # Get the predicted label
    predicted_label = encoder.inverse_transform(prediction)[0]
    
    # Return the predicted label
    return render_template("result.html", predicted_crop=predicted_label)

if __name__ == "__main__":
    app.run(debug=True)




# from flask import Flask, request, jsonify, render_template
# import joblib  # Use joblib for compatibility with saved model
# import numpy as np
# import pickle  # Remove pickle import (not needed here)
# from sklearn.preprocessing import LabelEncoder

# app = Flask(__name__)

# # Load the ML model using joblib (assuming it was saved with joblib)
# trained_model = joblib.load('crop recommendation.pkl')  # Adjust filename if needed

# # Define a label encoder
# encoder = LabelEncoder()

# # Serve the index.html file
# @app.route("/")
# def home():
#     return render_template("index.html")

# # Define a route for making predictions
# @app.route("/predict", methods=["POST"])
# def predict():
#     # Get the features from the form submission
#     features = {
#         "N": float(request.form["N"]),
#         "P": float(request.form["P"]),
#         "K": float(request.form["K"]),
#         "temperature": float(request.form["temperature"]),
#         "humidity": float(request.form["humidity"]),
#         "ph": float(request.form["ph"]),
#         "rainfall": float(request.form["rainfall"])
#     }

#     # Convert features to numpy array
#     features_array = np.array([features["N"], features["P"], features["K"], features["temperature"], features["humidity"], features["ph"], features["rainfall"]]).reshape(1, -1)

#     # Make prediction
#     prediction = trained_model.predict(features_array)

#     # Get the predicted label
#     predicted_label = encoder.inverse_transform(prediction)[0]

#     # Return the predicted label
#     return render_template("result.html", predicted_crop=predicted_label)

# if __name__ == "__main__":
#     app.run(debug=True)

