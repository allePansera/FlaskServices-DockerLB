# Execution
Segue una breve guida al deploy dell'architettura ideata sia per lo sviluppo che per un ambiente production.
## Development
### Front-End
[Docs](/app/frontend/docs.md)
1) Download latest node lts version, at least 18.13
2) Clone repo and move inside 'app/frontend' directory
3) Run npm install
4) Run npm build (credo ci sia un errore: **ng** build, oppure npm run build)
5) Run ng serve --proxy-config proxy.conf.json
6) Check the result at: http://localhost:4200
### Back-End
1) Download python 3.8
2) Move inside 'app/backend'
3) Execute the following commands:
   1) pip install requests 
   2) pip install -r config/requirements.txt
4) Execute python run.py 80 or configure pycharm env to run app.py
## Production
Move inside /app directory and execute the following command:
<br>
docker-compose up --build -d --scale backend=<NUM_ISTANCES>
