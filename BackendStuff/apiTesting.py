from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from transformers import pipeline, AutoModel
import os
from dotenv import load_dotenv


load_dotenv()

# making a token to connect Hugging Face Transformers
analyzer = SentimentIntensityAnalyzer()
extraction = os.getenv("ACCESS_KEY")
detector = pipeline("text-classification", model="roberta-base-openai-detector", token=extraction)


def getInfo(ProductURL):
    driver = webdriver.Chrome()
    driver.get(ProductURL)
    wait = WebDriverWait(driver, 10)
    
    try:
        wait.until(
            EC.presence_of_element_located((By.CLASS_NAME, "fdbk-container__details__comment"))
        )
    except:
        print("Comments not found.")
        driver.quit()
        return
    
    html = driver.page_source


    # we need: item url, item name, item price, customer reviews
    # after that, try to get the seller reviews gone, just the reviews for the product itself
    # transformers AI detector
    product_info = {}
    soup = BeautifulSoup(html, 'html.parser')
    product_info["Name"] = driver.title
    product_info["Price"] = soup.find(class_="x-price-primary").get_text()
    product_info["Price"] = product_info["Price"].split(" ")[0]
    product_info["Comment"] = soup.find_all(class_="fdbk-container__details__comment") 
    product_info["Image"] = driver.find_element(By.XPATH, "/html/body/div[2]/main/div[1]/div[1]/div[4]/div/div/div[1]/div[1]/div/div[1]/div[1]/div[2]/div[4]/div[1]/img")
    product_info["ImageAddress"] = product_info["Image"].get_attribute('src')
    

    count = 0
    scoretotal = 0
    totalcount = 0
    for comment in product_info["Comment"]:
        commenttext = comment.get_text()
        detectorstats = detector(commenttext)      
        totalcount += 1 
        if detectorstats[0]['label'] == 'Real':
            count += 1
            scoretotal += analyzer.polarity_scores(commenttext)['compound']

    compoundaverage = scoretotal/count
    authenticity = str(round(count/totalcount*100))+"%"
    print("The average compound score is: " + str(compoundaverage))

    feedback = ""
    if compoundaverage > 0.2:
        # print("Overall, the users have POSITIVE feedback about this product")
        feedback = "Positive"
    elif compoundaverage < -0.2:
        # print("Overall, the users have NEGATIVE feedack about this product")
        feedback = "Negative"
    else:
        # print("Overall, the users have NEUTRAL feedback about this product")
        feedback = "Neutral"

    driver.quit()

    return product_info, authenticity, feedback