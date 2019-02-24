from flask import Flask, jsonify, request
import VisionAPI
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify(
        response='',
        status=200,
        mimetype='application/json'
    )

@app.route('/upload_photo', methods=['POST'])
def upload_photo():
    # print(request.files.get['image'])
    img = request.files.get('image')
    # send img to google api and get results
    options = VisionAPI.retrieve_labels(img)
    return jsonify(
        response=options,
        status=200,
        mimetype='application/json',
    )

@app.route('/get_recipes', methods=['GET'])
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

if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)