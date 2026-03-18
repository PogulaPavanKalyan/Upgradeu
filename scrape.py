import requests
from bs4 import BeautifulSoup

url = "https://www.frontlinesedutech.com/"
try:
    r = requests.get(url, timeout=10)
    soup = BeautifulSoup(r.text, 'html.parser')
    links = set()
    for a in soup.find_all('a', href=True):
        href = a['href']
        if '/s/' in href or 'course' in href or 'category' in href:
            if href.startswith('/'):
                href = "https://www.frontlinesedutech.com" + href
            links.add(href)
    print("Found links:")
    for l in sorted(links): print(l)
except Exception as e:
    print("Error:", e)
