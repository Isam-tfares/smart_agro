from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime,timedelta
from utils import *
app = Flask(__name__)
CORS(app)

# MongoDB connection
uri = "mongodb+srv://tfaresisam:zx6kbazwauPRrAbz@cluster0.abvx5ep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri)
db = client.SmartArgo
collection = db.data

@app.route('/data', methods=['GET'])
def get_data():
    data = list(collection.find({}, {'_id': 0}))  # Exclude the '_id' field
    return jsonify(data)

@app.route('/data/day/<year>/<month>/<day>/<column>', methods=['GET'])
def get_data_for_day(year,month,day,column):
   
    data = list(collection.find({}, {'_id': 0}))
    filtred_data=get_data_of_day_month_year(data,int(day),int(month),int(year),column)
    return jsonify(filtred_data)

@app.route('/data/month/<year>/<month>/<column>', methods=['GET'])
def get_data_for_month(year, month,column):
    data = list(collection.find({}, {'_id': 0}))  
    filtred_data=get_data_of_month_year(data,int(month),int(year),column)
    return jsonify(filtred_data)

@app.route('/current_data/<column>', methods=['GET'])
def get_current_data(column):
   
    data = list(collection.find({}, {'_id': 0}))
    data=get_data_of_current_hour(data,column)
    return jsonify(data)

if __name__ == '__main__':
    # app.run(debug=True, host='0.0.0.0')
    app.run(host='0.0.0.0', port=5000, debug=True)

