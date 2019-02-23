import io
import os
import urllib.request
import json

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

def retrieve_labels(img_to_parse=None):
    """
    (image file in bytes) -> List[string]

    Given an image file in bytes, return a list of food items represented as
    strings
    """
    # Instantiates a client
    client = vision.ImageAnnotatorClient()

    # --- UNCOMMENT THESE LINES OF CODE AND USE A CUSTOM PATH FOR IMAGE FOR DEBUGGING PURPOSES ---
    # # The name of the image file to annotate
    # file_name = 'C:\\Users\\tonoc\\Pictures\\pizza.jpg'

    # # Loads the image into memory
    # with io.open(file_name, 'rb') as image_file:
    #     content = image_file.read()

    if img_to_parse is not None:
        # Performs label detection on the image file
        response = client.label_detection(image=img_to_parse)
        labels = response.label_annotations
    else:
        labels = []

    label_descriptions = []
    for label in labels:
        label_descriptions.append(label.description)

    return label_descriptions

def retrieve_labels_and_detect_food(img_to_parse=None):
    """
    Similar to retrieve_labels, this method will only gather the items which are actually a food
    """
    client = vision.ImageAnnotatorClient()

    if img_to_parse is not None:
        # Performs label detection on the image file
        response = client.label_detection(image=img_to_parse)
        labels = response.label_annotations
    else:
        labels = []
    
    label_descriptions = []
    for label in labels:
        hits = query_food_item_choices(label.description)
        if len(hits) != 0:
            label_descriptions.append(label.description)
            
    return label_descriptions


def query_food_item_choices(food_items, page=None):
    """
    (string, string) -> List[{string: string, ...:...}*10]

    Given a string of food items delimited by commas and a page number, return
    a list of dictionaries where the keys are food properties and their values
    are...their values
    """
    if page is not None:
        recipe_puppy_url = 'http://www.recipepuppy.com/api/?i=' + food_items + '&p=' + page
    else:
        recipe_puppy_url = 'http://www.recipepuppy.com/api/?i=' + food_items

    # Extract the JSON data from the page and return the results desired
    page_form = urllib.request.urlopen(recipe_puppy_url).read()
    data = json.loads(page_form.decode())

    return data["results"]

# if __name__=="__main__":
#     print(query_food_item_choices("apple,orange", "1"))
