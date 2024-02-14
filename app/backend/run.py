from app import app
import sys


PORT = 80
# Supported ["dev", "release"]
DEBUG = True
if len(sys.argv) == 3:
    PORT = int(sys.argv[1])
    DEBUG = sys.argv[2]
    if DEBUG not in ["dev", "release"]:
        raise Exception(f"Running mode '{DEBUG}' not supported")

    if DEBUG == "dev": DEBUG = True
    elif DEBUG == "release": DEBUG = False

app.run(host="0.0.0.0", debug=DEBUG, port=PORT)
