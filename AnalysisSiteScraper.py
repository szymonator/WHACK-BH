from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

# We are using chrome, and the URL will be given by the user
driver = webdriver.Chrome()
URL = "https://www.amazon.com/White-Cloud-Comfort-Vitamin-Multipack/dp/B0CSLGP5MK/ref=sr_1_1_sspa?crid=RD9V40QZS5FB&dib=eyJ2IjoiMSJ9.9oAFbWU7MuCGDmwt7XOuXQBzIlCjh_8vrREvQ0b0-fs8nS0YW-s1LB2L57pU7YoPw38Lqe3s9Iv4rrUTg-edTpjo67oiVHHJ3K1CjeduWT1x7BOjI-kS4OJe1F6ukHHxSh9BfYCuIN_pcRIsi1iQQENY_tyD5tNwTVPXa_aFhMs32srCDGHLMEo58uWJcjWPShSqcgJti_d9frN6miH_nik3qsH4-0ipaSMA8mdv9zpewJj-Am8HTgRG4mtVLB1ZOATJQBu-H66lma6JdZlw-H_iTkY8sd-QrFW0Jprv1-U.-HfAczXLRc7OcreEF1KezYK1CtGgo5wwgfGf_rn1myw&dib_tag=se&keywords=kleenex&qid=1760796686&sprefix=kleene%2Caps%2C229&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"

# This is code to retrieve the site legitimacy from scamadviser.com

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
print(scamAdviserScore) # This is a score from 0-100

# ratebud.ai - only for amazon
driver.get('https://ratebud.ai')
inputBox = driver.find_element(By.XPATH, "/html/body/div/div[1]/div[2]/div/div[2]/div/form/div/input")
inputBox.send_keys(Keys.CLEAR, URL)
time.sleep(0.5)