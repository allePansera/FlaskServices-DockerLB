from flask_login import UserMixin


class User(UserMixin):
    def __init__(self, ut____id, utdescri, ut__role="G"):
        """
        Build UserMixin override class used inside flask login module to handle auth.
        :param ut____id: user id
        :param utdescri: user description
        :param ut__role: user role
        """
        self.id = ut____id
        self.ut____id = ut____id
        self.utdescri = utdescri
        self.ut__role = ut__role
