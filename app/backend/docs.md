# Frontend docs
## General
Front-end content is made of the following element:
1) config: contains config parameter, for example project required libs; 
2) db: contains sql lite (TEMPORARY) and related class for connection;
3) static: not used at the moment, keep it there 4 flask structure;
4) tests: not implemented, check inside ToDo;
5) view: contains blueprint view. View script ends with '_view.py', class ends with no suffix and manager ends with '_manager.py';
6) app.py: connect blueprints to the application and start login manager and debug tool;
7) run.py: run app.py checking for the port
## Authentication & Login
Auth is based on session with time expiration. 
Output is a simple message or instance of an object, status code follows jsonify
so client http handler can use its own 'error' handler without using extra if statements.
## View structure
Blueprint are used to handle page requests. 
The structure is similar to Classful but we can incapsulate services considering also url prefix.
## Class structure

## DB

## Tests
# ToDo
- Tests implementation
- Log implementation
