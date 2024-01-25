FROM node:18.12.1
WORKDIR /app
COPY package.json /app
COPY . /app
# set up angular cli
RUN npm install
RUN npm install -g @angular/cli@16.1.8
# create dist
RUN ng build
# run the angular dist
EXPOSE 4200
CMD ng serve --host 0.0.0.0 --port 4200  --disable-host-check


