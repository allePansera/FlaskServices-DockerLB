# Base image for the Flask application
FROM python:3.8
# Expose Flask server port
EXPOSE 5000
EXPOSE 80
#Working Directory for the Flask application
WORKDIR /app
#It will copy the Flask application files and the requirements.txt file
COPY .. /app
#It will install the dependencies for the Flask application
RUN pip install requests
RUN pip install -r config/requirements.txt
# execute flask app
CMD python run.py 5000
