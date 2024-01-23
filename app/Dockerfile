#Base image for the Flask application
FROM python:3.8
EXPOSE 5000
#Working Directory for the Flask application
WORKDIR /app
#It will copy the Flask application files and the requirements.txt file
COPY . /app
#It will install the dependencies for the Flask application
RUN pip install requests
RUN pip install -r config/requirements.txt
# execute flask app
CMD python app.py
