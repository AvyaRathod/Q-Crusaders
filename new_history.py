from browser_history.browsers import Chrome
import csv
import datetime
import requests
from bs4 import BeautifulSoup
import time

browser = Chrome()
outputs = browser.fetch_history()
history_entries = outputs.histories
last_50_urls = history_entries
last_50_urls = list(set(last_50_urls))[::-1]
for i in last_50_urls:
    print(i[1])
    break
#print(last_50_urls)
"""
for i in last_50_urls:
    if i[1].find("https://www.google.com/search?q=") != -1:
        search = i[1].split("https://www.google.com/search?q=")[1].split("&")[0].split("+")
        google_search = " ".join(search)
        print(google_search)

"""