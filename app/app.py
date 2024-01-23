from flask import Flask, Response
import requests
import os

# Defining flask application
app = Flask(__name__)


def update_status():
    global port, hostname
    lb_ip_addr = os.environ['LB_IP_ADDR']
    lb_port = os.environ['LB_PORT']
    url = f"http://{lb_ip_addr}:{lb_port}/port_update/{hostname}/{port}"
    response = requests.get(url)
    return response.status_code


@app.route("/home_page_old")
def home_page_old():
    # aggiorno load balancer quando ho finito
    status_code = int(update_status())
    if status_code != 200:
        return 405, f'Failed to update port status :{status_code}'
    return Response(response="Old Home Page", status=200)


@app.route("/home_page")
def home_page():
    return Response(response="Home Page", status=200)



if '__main__' == __name__:
    app.run(host="0.0.0.0", debug=True)


