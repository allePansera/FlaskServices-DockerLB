# Base image for the Flask application
FROM python:3.8
# Base image for angular application
FROM node:latest as node
# Expose Flask server port
EXPOSE 5000
#Working Directory for the Flask application
WORKDIR /app
#It will copy the Flask application files and the requirements.txt file
COPY . /app
#It will install the dependencies for the Flask application
RUN pip install requests
RUN pip install -r config/requirements.txt
# Run angular dependency
RUN npm install -g @angular/cli
RUN npm install
# Generate the build of the angular application
RUN npm run build
# Move build inside flask dir to let nginx expose them
COPY --from=build /usr/local/app/dist/sample-angular-app /usr/share/nginx/html
# execute flask app
CMD python app.py
