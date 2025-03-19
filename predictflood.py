from flask import Flask, jsonify, request
import mysql.connector
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)

# 🔹 Connect to MySQL database
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",  # Use the correct password here
    "database": "floodcare"
}

def fetch_data(station_name):
    """Fetch historical flood data for the given station"""
    try:
        conn = mysql.connector.connect(**db_config)
        query = f"""
            SELECT Year, Month, Max_Temp, Min_Temp, Rainfall, Relative_Humidity, Wind_Speed, 
                   Cloud_Coverage, Bright_Sunshine, Flood
            FROM flooddata
            WHERE Station_Names = %s
        """
        # Use parameterized queries to avoid SQL injection
        df = pd.read_sql(query, conn, params=(station_name,))
        conn.close()
        return df
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return pd.DataFrame()  # Return empty dataframe in case of an error

def train_model(df):
    """Train a flood prediction model using historical data"""
    if df.empty:
        return None  # Return None if no data

    # 🔹 Feature selection
    X = df[['Year', 'Month', 'Max_Temp', 'Min_Temp', 'Rainfall', 'Relative_Humidity',
            'Wind_Speed', 'Cloud_Coverage', 'Bright_Sunshine']]
    y = df['Flood']  # Target variable (1 = Flood, 0 = No Flood)

    # 🔹 Train/Test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 🔹 Train model (Random Forest Classifier)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    return model

def predict_flood_probability(model, current_year):
    """Predict flood probability for this year and next 5 years"""
    predictions = []
    
    for year in range(current_year, current_year + 6):  # Predict for current and next 5 years
        future_data = np.array([[year, 6, 35, 25, 500, 80, 20, 5, 8]])  # Example input
        prob = model.predict_proba(future_data)[0][1]  # Probability of flood
        predictions.append({"year": year, "flood_probability": round(prob * 100, 2)})  # Convert to percentage

    return predictions

@app.route('/predict_flood', methods=['GET'])
def predict_flood():
    station_name = request.args.get('station', 'Dhaka')  # Default to 'Dhaka'
    df = fetch_data(station_name)

    if df.empty:
        return jsonify({"error": "No data available for this station"})

    model = train_model(df)

    if model is None:
        return jsonify({"error": "Not enough data to train the model"})

    current_year = 2024
    predictions = predict_flood_probability(model, current_year)

    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)