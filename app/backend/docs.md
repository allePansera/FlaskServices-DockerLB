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
Avoid creating, as we did before, a 'OOP' directory. Class are inside the related view.
## DB
Temporary SQLite is used to share the db as a file inside GitHub.
Update also the connector for further connection type.
## Tests
To implements, used to check for data_manager functionalities.
- 'apache jmeter' tests and flask: traffic analysis
- 'unittest' testing for single blueprint
## Logging
Build granular logging system with frequent zip archive building per day
# ToDo
- Create API for all registry: listing all possible data for 
datatable given father table and sons
- Tests implementation
- Log implementation
- Params for session inside db with related view for angular setup
- Before edit on registry check for all related dependencies
