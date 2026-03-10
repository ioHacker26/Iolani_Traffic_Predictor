# Tensorflow example
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

# TODO 0: Install flask/joblib libraries into your ml env
# pip install flask
# pip install flask_cors
# pip install joblib


#Initialize the flask app
app = Flask(__name__)

# CORS allows for cross-origin requests 
# (addresses an error related to accessing endpoints from a different server)
CORS(app)

# --------------------------- Model Setup ------------------------------------
# TODO 1: From your training file, save your trained model as a file (.h5 or .pkl)
# From your training file, add a line of code that saves the trained model in a file format. 
#       If your model was trained using TensorFlow, save it as a .h5 file.
#       If your model was trained using scikit-learn, save it as a .pkl file using joblib
# Train your model as you would normally. This should create a file for the trained model
# Then replace ___file_name__ with your file name. Make sure it is in the same directory 
#    as this file
def load_model():
    model = joblib.load("modelAnais.pkl")
    return model


model = load_model()

# TODO 2: From your training file, save your label encoder as a .pkl file using joblib. 
# This will allow your model to convert from a numerical prediction back into its original label 



# TODO 3: Create a function that formats your input data for your model
# Think about what your user might input, and then how it would need to be 
# formatted to be input into your model. For example (ATGC... -> 0123...)
# If using scikit-learn, this may include turning an object into a dataframe
# and label encoding as needed
def format(input_data):

    seconds_since_midnight = input_data["seconds_since_midnight"]

    df = pd.DataFrame([[seconds_since_midnight]])

    return df



#TODO 4: Let's put it all together now. 
# Define a function predict that takes in some input and uses your model to
# produce a prediction. Decode the prediction into a human readable format.
def predict(input_data):

    formatted_input = format(input_data)

    model = load_model()

    prediction = model.predict(formatted_input)

    return float(prediction[0])


def run_test():

    SAMPLE_INPUT = {
        "seconds_since_midnight": 7 * 3600 + 6 * 60
    }


    result = predict(SAMPLE_INPUT)

    print("Model Predicted (seconds): ", result)

    return result



# ------------------------------- ROUTES --------------------------------------
    
# This code uses Flask to create an API endpoint 
# TODO 6: replace __yourname___ with your name. This is just to demonstrate how
# you can change api route names to be whatever you want
@app.route('/api/seant/test', methods=['GET'])
def get_prediction():

    unix_time = int(request.args.get("unix_time"))
    #unix_time = 1769014800
    print(unix_time)
    midnight_unix = 1768989600  # Jan 21 2026 00:00:00

    seconds_since_midnight = unix_time - midnight_unix

    input_data = {
        "seconds_since_midnight": seconds_since_midnight
    }

    predicted = predict(input_data)

    print("Seconds since midnightL:", seconds_since_midnight)
    
    return jsonify({"success": True, "prediction": round(predicted/60, 2)})


# TODO 7: Test it out by running this file (as you would run any python file)
# and then paste this url into your browser, replacing routeName with the route 
# you defined above:  http://127.0.0.1:5000/ + routeName

# ------------------------------- MAIN ----------------------------------------
if __name__ == '__main__':
    run_test() # Runs your test code
    app.run() # creates your api at http://127.0.0.1:5000