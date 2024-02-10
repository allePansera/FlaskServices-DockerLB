import sqlite3


class SQLiteDBManager:
    """
    Execution pattern:
    1) connect()
    2) [operations]
    3) disconnect()

    initialize() on application restart with connect() and disconnect() before and after.
    """
    def __init__(self, db__path="db/database.sqlite", ddlscript="db/ddl.sql"):
        """
        Constructor method
        :param db__path: db path
        :param ddlscript: ddl script to create db
        """
        self.db__path = db__path
        self.ddlscript = ddlscript
        self.connection = None
        self.cursor = None

    def initialize(self):
        with open(self.ddlscript) as f:
            self.connection.executescript(f.read())

    def connect(self):
        try:
            self.connection = sqlite3.connect(self.db__path)
            self.cursor = self.connection.cursor()
        except sqlite3.Error as e:
            print("Error connecting to DB: ", e)

    def execute_query(self, query, params=None):
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            self.connection.commit()
        except sqlite3.Error as e:
            print("Error executing query: ", e)

    def fetch_all(self, query, params=None, json=False):
        try:
            if json:
                self.connection.row_factory = sqlite3.Row
                self.cursor = self.connection.cursor()
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            rows = self.cursor.fetchall()
            if json:
                return [{key: row[key] for key in row.keys()} for row in rows]
            else:
                return rows
        except sqlite3.Error as e:
            print("Error fetching data: ", e)

    def disconnect(self):
        if self.connection:
            self.connection.close()
        else:
            print("Cannot close connection until it's not open...")
