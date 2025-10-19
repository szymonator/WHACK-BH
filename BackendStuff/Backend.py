from flask import Flask, request, jsonify
from apiTesting import getInfo
app = Flask(__name__)

@app.route('/request')
def request():
    url = request.get_json()
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