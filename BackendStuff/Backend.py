from flask import Flask, request, jsonify
from flask_cors import CORS
from apiTesting import getInfo
from AnalysisSiteScraper import scamAdviserScraper, rateBudScraper
app = Flask(__name__)

CORS(app, supports_credentials=True, origins=['http://localhost:3000'], expose_headers=["Content-Type"])

@app.route('/analysis', methods=["POST"])
def analysis():
    url = request.get_json()["URL"]
    print(url)
    if "https://www.amazon.com" in url or "https://www.amazon.co.uk" in url:
        rateBudScore, rateBudAuth, recommendationRateBud, numOfReviews = rateBudScraper(url)
        return jsonify({"type": "amazon",
                        "rateBudData" : {"score": rateBudScore, "authenticity": rateBudAuth, "recommended?": recommendationRateBud, "numOfReviews": numOfReviews}})
    
    elif "https://www.ebay.com" in url or "https://www.ebay.co.uk" in url:
        product_info, authenticity, feedback = getInfo(url)
        return jsonify({ "type": "ebay",
                        "productName": product_info["Name"],
                        "productPicture": product_info["ImageAddress"],
                        "productPrice": product_info["Price"],
                        "ebayScraperAnalysis": {"commentResult": feedback, "authenticity": authenticity}
                        })
    else:
        scamAdviserScoreVal = scamAdviserScraper(url)
        return jsonify({"type":"random",
                        "scamAdviserScore" : scamAdviserScoreVal})
    

# main driver function
if __name__ == '__main__':
    app.run()