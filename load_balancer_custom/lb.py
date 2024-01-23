from flask import Flask
from flask import redirect
import json
import time


SERVERS_JSON_PATH = "servers.json"

# Defining flask application
app = Flask(__name__)

# On app reload open close the json file and read it back
available_servers = open(SERVERS_JSON_PATH)
data = json.load(available_servers)
port_list = list(data["config"])


def next_available_server():
    """
    1) Scarico la lista delle porte disponibili
    2) Seleziono la prima porta libera che rimuovo dalle disponibili
    3) Rimuovo la porta selezionata dalle disponibili
    :return: {"hostname": HOSTNAME, "port": int(PORT)}
    """
    global port_list

    # Since port_list is global, it can be modified by
    # other requests coming to the server;
    # this cycle waits until there is at least 1 server available
    while len(port_list) < 1:
        time.sleep(0.01)

    next_port = port_list.pop(0)
    return next_port


# Function called by app server that has finished with its
# calculations and is free to accept other incoming connections
@app.route("/port_update/<str:host_name>/<int:available_port>")
def update_port(host_name, available_port):
    global port_list
    try:
        struct_to_append = {"hostname": host_name, "port": int(available_port)}
        port_list.append(struct_to_append)
        return 200, 'Port updated correctly!'
    except Exception as e:
        return 405, f'Error updating port list ({host_name}:{available_port}): {e}'


@app.route("/<str:redirect_endpoint>")
def entrypoint(redirect_endpoint):
    next_port = next_available_server()
    hostname = next_port["hostname"]
    port = next_port["port"]
    url = f"http://{hostname}:{port}/{redirect_endpoint}"
    return redirect(url, code=302)



