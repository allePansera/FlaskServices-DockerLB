# Frontend docs
## General
Front-end content is made of 3 element:
1) component: handle vars coming from html and related events; 
2) services: handle back-end interrogation for component and related var (such as auth subject);
3) guard: handle page access considering auth and permission
## Authentication & Login
The auth system is based on guard. Each route is activated only if guard permits it otherwise /login is called.
Auth information are stored inside session for 6 hours. 
AppComponent runs a service which check every 5 minutes for expired values inside session to remove.
# ToDo
- Build 'anagrafica' component (datatable section, filter section, button section)
- Create config file to set time param for login inside project or read it from backend
- Clean project from useless component
- Introduce roles for permission
- Read from server default configuration and store them inside app component (such as session expiration time)
