# Exectution
Segue una breve guida al deploy dell'architettura ideata sia per lo sviluppo che per un ambiente production.
## Development
### Front-End
1) Scaricare la versione di note LTS più recente, almeno la versione 18.13
2) Clonare il repo e posizionarsi all'interno della cartella 'frontend'
3) Eseguire il comando npm install
4) Eseguire il comando ng serve
5) Controllare che l'applicazione sia stata correttamente rilasciata presso l'indirizzo http://localhost:4200
### Back-End
1) Scaricare la versione di python 3.8
2) Posizionarsi all'interno della cartella 'backend'
3) Eseguire i seguenti comandi:
  3.1)  pip install requests
  3.2)  pip install -r config/requirements.txt
4) Eseguire il webserver con il comando python run.py 80 
## Production
Da definire quando Angular sarà funzionante in ambiente di sviluppo
