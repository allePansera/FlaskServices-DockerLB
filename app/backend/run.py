from app import app
import sys


PORT = 80
if len(sys.argv)==2: PORT = int(sys.argv[1])

app.run(host="0.0.0.0", debug=True, port=PORT)
