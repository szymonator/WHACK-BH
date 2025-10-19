from flask import Flask, request, jsonify
from flask_cors import CORS
from apiTesting import getInfo
app = Flask(__name__)

CORS(app, supports_credentials=True, origins=['http://localhost:3000'], expose_headers=["Content-Type"])

@app.route('/analysis', methods=["POST"])
def analysis():
    url = request.get_json()["URL"]
    print(url)
    product_info, feedback = getInfo(url)
    return jsonify({ 
    "productName": product_info["Name"],
    "productPicture": product_info["ImageAddress"],
    "productPrice": product_info["Price"],
    # "scamAdviserScore" : 100,
    # "rateBudData" : {"score": 100, "authenticity": 87},
    # "ebayScraperAnalysis": {"score": 100, "authenticity": 87}, 
    'error':None})

# main driver function
if __name__ == '__main__':
    app.run()