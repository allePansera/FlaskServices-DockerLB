import requests
import threading
from tqdm import tqdm


URL = "http://localhost/home_page"
LEN = 1000


def make_request():
    global URL
    requests.get(url=URL)


for i in tqdm(range(1000), total=1000):
    threading.Thread(target=make_request).start()

