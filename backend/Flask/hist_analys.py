from browser_history.browsers import Chrome
import csv
import datetime
import requests
from bs4 import BeautifulSoup
import concurrent.futures  # Import the concurrent.futures module

browser = Chrome()
outputs = browser.fetch_history()
history_entries = outputs.histories
last_50_urls = history_entries[len(history_entries) - 51:]

# Function to get title from URL using web scraping
def get_title_from_url(url):
    try:
        response = requests.get(url)
        response.raise_for_status()

        soup = BeautifulSoup(response.content, 'html.parser')
        title = soup.title.string if soup.title else "No title found"
        return title.strip()

    except requests.exceptions.RequestException as e:
        print("Error:", e)
        return None

# Function to fetch titles in parallel using ThreadPoolExecutor
def fetch_titles_in_parallel(urls):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = executor.map(get_title_from_url, urls)
    return results

# Save the last 50 URLs and their titles to a CSV file
csv_filename = 'last_50_urls_optimized.csv'
with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(['Timestamp', 'URL', 'Title'])

    urls = [url for _, url in last_50_urls]
    titles = fetch_titles_in_parallel(urls)

    for (timestamp, url), title in zip(last_50_urls, titles):
        csv_writer.writerow([timestamp, url, title])

