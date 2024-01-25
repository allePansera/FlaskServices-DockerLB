##Problematiche
- Come posso gestire l'autenticazione necessaria per accedere ai servizi se questi risiedono su macchine diverse?
- Come posso fare per gestire l'esposizione delle porte?

##Proposta A
- Potrei procedere creando un clone dell'applicazione su porte diverse. SI basa sul load balancing.
  Soluzione descritta all'interno di questo link: https://github.com/cipz/FlaskLoadBalancer/tree/main
  - Devo creare un container docker per ogni servizio. 
  - Creo una variabile di sistema che indichi quella che sono porta e hostname del load balancer.
  LB_IP_ADDR; LB_PORT sono i nomi delle variabili globali.
  
  <br>
  <u>ToDo:</u> andare a verificare il funzionamento e gestire il caso per cui se faccio il reload del server 
  comunico al load balancer il mio stato. 

##Proposta B
- Utilizzo nginx e quindi dobbiamo poter accedere al load balancer offerto.
  - https://medium.com/@ruchirthaman/practical-implementation-of-a-load-balancer-using-nginx-and-flask-9562e2ea5095
  
  - https://dev.to/bravinsimiyu/flask-application-load-balancing-using-docker-compose-and-nginx-3nc3 
  <br>
  Avrei la possibilità di creare con docker l'immagine da eseguire e di duplicarla tra diversi servizi con una sola porta esposta.
  Oltre a questo offre soluzioni complesse che potrei rivalutare in futuro.
    - Nginx dovrà essere scaricato dal browser per la versione del proprio OS
    - Scarichiamo anche docker per windows
    - Settiamo nginx come variabile d'ambiente
    - Definiamo il file 'Dockerfile' e nginx.conf
  
  <br>
  Aggiornare propriamente il sistema andando a inserire una pagina di login 
  e una pagina semplice con dashboard.
  
  Controllare com aggiungere all'interno del Dockerfile l'esecuzione di angular e del db
  https://levioconsulting.com/insights/how-to-dockerize-an-angular-application-with-nginx/
  <br>
  https://medium.com/@RamkumarMrj/dockerizing-front-end-as-angular-and-back-end-as-flask-1e944a0ed77
  <br>
  https://github.com/delsner/python-flask-angular-starter/tree/master
  <br>
  Comandi Docker:
  - Build flask with angular:
  docker-compose up --build -d --scale app=4
  