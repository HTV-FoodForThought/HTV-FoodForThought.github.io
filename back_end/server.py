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
    options = VisionAPI.retrieve_labels_and_detect_food(img)
    return jsonify(
        response=options,
        status=200,
        mimetype='application/json',
    )

@app.route('/get_recipies', methods=['POST'])
def get_recipes():
    list_of_ingredients = request.args.get('ingredients')
    page = request.args.get('page')
    # ensure valid page
    if int(page) <= 0:
        page = '1'
    recipes = VisionAPI.query_food_item_choices(list_of_ingredients, page)
    return jsonify(
        response=recipes,
        status=200,
        mimetype='application/json'
    )

