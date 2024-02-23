from app import app
from view.config.working_mode import get_working_mode_supported
from view.config.working_mode import get_db_connection_filename
import sys, os


PORT = 80
DEBUG = True

"""
Command example: python run.py 80 dev
"""
if len(sys.argv) == 3:

    PORT = int(sys.argv[1])
    MODE = sys.argv[2]
    if MODE not in get_working_mode_supported():
        raise Exception(f"Running mode '{MODE}' not supported")

    if MODE == "dev": DEBUG = True
    elif MODE == "release": DEBUG = False

    # Set OS var
    os.environ["WORKING_MODE"] = MODE
    os.environ["DB_CONNECTION_FILENAME"] = get_db_connection_filename(MODE)


app.run(host="0.0.0.0", debug=DEBUG, port=PORT)
