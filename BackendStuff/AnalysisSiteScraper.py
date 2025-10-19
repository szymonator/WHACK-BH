import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# --- Imports for Stealth Driver ---
from webdriver_manager.chrome import ChromeDriverManager
from selenium_stealth import stealth

# --- Define your URL (used by both) ---
URL = "https://www.amazon.com/White-Cloud-Comfort-Vitamin-Multipack/dp/B0CSLGP5MK/ref=sr_1_1_sspa?crid=RD9V40QZS5FB&dib=eyJ2IjoiMSJ9.9oAFbWU7MuCGDmwt7XOuXQBzIlCjh_8vrREvQ0b0-fs8nS0YW-s1LB2L57pU7YoPw38Lqe3s9Iv4rrUTg-edTpjo67oiVHHJ3K1CjeduWT1x7BOjI-kS4OJe1F6ukHHxSh9BfYCuIN_pcRIsi1iQQENY_tyD5tNwTVPXa_aFhMs32srCDGHLMEo58uWJcjWPShSqcgJti_d9frN6miH_nik3qsH4-0ipaSMA8mdv9zpewJj-Am8HTgRG4mtVLB1ZOATJQBu-H66lma6JdZlw-H_iTkY8sd-QrFW0Jprv1-U.-HfAczXLRc7OcreEF1KezYK1CtGgo5wwgfGf_rn1myw&dib_tag=se&keywords=kleenex&qid=1760796686&sprefix=kleene%2Caps%2C229&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"
scamAdviserScore = "N/A" # Default value in case it fails

# -----------------------------------------------------------------
# BLOCK 1: SCAMADVISER (using your 'normal' driver)
# -----------------------------------------------------------------
def scamAdviserScraper(URL):
    print("--- Starting Scamadviser (Normal Driver) ---")
    try:
        # Your method:
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


    


# -----------------------------------------------------------------
# BLOCK 2: RATEBUD.AI (using 'stealth' driver)
# -----------------------------------------------------------------
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
        driver = webdriver.Chrome(service=service, options=options) # <-- This is a NEW driver
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

        # --- Create a NEW wait object for this new driver ---
        wait = WebDriverWait(driver, 10)

        # --- Run Ratebud.ai logic ---
        driver.get('https://ratebud.ai')

        # Wait for the INPUT BOX to be clickable
        inputBox2 = wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "input[placeholder='Enter a valid Amazon URL']"))
        )
        print("Found the input box.")
        
        # Interact
        inputBox2.clear()
        inputBox2.send_keys(URL)
        
        print("Successfully sent keys to input box.")
        
        # Click the Analyze button
        analyze_button = wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))
        )
        analyze_button.click()
        print("Clicked 'Analyze' button.")
        
        time.sleep(5) # Wait for results to load

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
