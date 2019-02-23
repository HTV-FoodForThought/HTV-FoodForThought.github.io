import io
import os

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

def run_quickstart(img_to_parse=None):
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
