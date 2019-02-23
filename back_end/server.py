from flask import Flask, jsonify, request
import VisionAPI

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify(
        response='',
        status=200,
        mimetype='application/json'
    )

@app.route('/upload_photo', methods=['POST'])
def upload_photo():
    img = request.files['image']
    # send img to google api and get results
    options = VisionAPI.run_quickstart(img)
    return jsonify(
        response=options,
        status=200,
        mimetype='application/json',
    )

@app.route('/get_recipies', methods=['POST'])
def get_recipies():
    list_of_ingredients = request.data
    # make request to recipe end point
    return jsonify(
        response='',
        status=200,
        mimetype='application/json'
    )

