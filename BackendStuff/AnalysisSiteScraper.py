import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium_stealth import stealth



#SCAMADVISER 

def scamAdviserScraper(URL):
    print("--- Starting Scamadviser (Normal Driver) ---")
    try:
        driver = webdriver.Chrome()

        driver.get('https://www.scamadviser.com/')
        manageCookies = driver.find_element(By.ID, "ez-manage-settings")
        manageCookies.click()
        time.sleep(0.5)
        saveCookies = driver.find_element(By.ID, "ez-save-settings")
        saveCookies.click()
        time.sleep(0.5)


        inputBox = driver.find_element(By.XPATH, "/html/body/div[1]/div[3]/div[3]/div[1]/div[2]/div[1]/form/div[1]/input")
        inputBox.send_keys(Keys.CLEAR, URL)
        time.sleep(0.5)

        enterURL = driver.find_element(By.XPATH, "/html/body/div[1]/div[3]/div[3]/div[1]/div[2]/div[1]/form/button")
        enterURL.click()

        try:
            antiBot = driver.find_element(By.XPATH, "/html/body/div[1]/section[1]/div/div/div/div/div/div/div[2]/form/button")
            antiBot.click()
        except:
            pass

        time.sleep(3.5)
        scamAdviserScore = driver.find_element(By.XPATH, "/html/body/div[1]/section[1]/div/div[5]/div/div[1]/div/div/div/div/div/div[1]/div[2]/span").text
        driver.quit()
        return scamAdviserScore

    except Exception as e:
        driver.quit()
        return f"ScamAdviser script failed: {e}"


# RATEBUD.AI

def rateBudScraper(URL):
    print("\n--- Starting Ratebud.ai (Stealth Driver) ---")
    try:
        # --- Setup Stealth Driver ---
        options = Options()
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_argument("--disable-blink-features=AutomationControlled")
        options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36")
        options.add_argument("--start-maximized")
        options.add_argument("--disable-infobars")

        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options) 
        print("Stealth Chromedriver started.")

        stealth(driver,
                languages=["en-US", "en"],
                vendor="Google Inc.",
                platform="MacIntel",
                webgl_vendor="Intel Inc.",
                renderer="Intel Iris OpenGL Engine",
                fix_hairline=True,
                )
        print("Selenium-Stealth patches applied.")


        wait = WebDriverWait(driver, 10)
        driver.get('https://ratebud.ai')
        inputBox2 = wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "input[placeholder='Enter a valid Amazon URL']"))
        )
        print("Found the input box.")
        
        # Interact
        inputBox2.clear()
        inputBox2.send_keys(URL)
        
        print("Successfully sent keys to input box.")
        
        analyze_button = wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))
        )
        analyze_button.click()
        print("Clicked 'Analyze' button.")
        
        time.sleep(5)

        reviewTrustScore = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[1]/div[2]/div/div/div[1]/div[2]/div[2]/span[1]").text
        print(reviewTrustScore)

        authenticityRateBud = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[2]/div[2]/div[2]/div/div/div[1]/div[2]/div[1]").text
        print(authenticityRateBud)

        recommendationRateBud = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[2]/div[3]/div[1]/p").text
        print(recommendationRateBud)

        reviewsAnalysed = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[2]/div[3]/div[3]/p").text
        print(reviewsAnalysed)

        productName = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[1]/div[1]/div/div/div[2]/div[1]/h1").text
        print(productName)

        imageElement = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[1]/div[1]/div/div/div[1]/div/img")
        imageAddress = imageElement.get_attribute('src')

        productPrice = driver.find_element(By.XPATH, '/html/body/div/div[1]/div[2]/div[4]/div/div[1]/button/span[2]').text
        print(productPrice)
        
        driver.quit()
        return reviewTrustScore, authenticityRateBud, recommendationRateBud, reviewsAnalysed, productName, productPrice, imageAddress

    except Exception as e:
        print(f"\n--- RATEBUD SCRIPT FAILED ---")
        driver.quit()
        return f"Error: {e}"
