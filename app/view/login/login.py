from flask_classful import FlaskView, route
from flask import redirect
from app.view.login.user import User
from app.app import login_manager
from app.app import app
import flask_login



@login_manager.user_loader
def load_user(idutenti):
    """Il metodo serve per creare l'oggetto User necessario per la creazione della sessione di autenticazione"""
    # 1. Scarico i dati dell'utente
    # 2. Create un oggetto con i dati dell'utente

    check, output = userManager.caricaUtente(idutenti)
    if check:
        return User(idutenti=output[0], utdescri=output[1], utavatar=output[2], utospite=output[3])
    else:
        return None

@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=360)

@login_manager.unauthorized_handler
def unauthorized_callback():
    """Il metodo definisce il comportamento in caso di tentato accesso senza login"""
    return redirect('/loginPage')

@app.errorhandler(500)
def internal_error(error):
    """Il metodo definisce il comportamento da adottare in caso di errore con codice 500"""
    return redirect('/login/logout')


class LoginView(FlaskView):
    #METODI ACCETTATI PER LA RICHIESTA
    default_methods = ['POST']

    @route('/request', methods=default_methods)
    @flask_login.login_required
    def request(self):
        pass