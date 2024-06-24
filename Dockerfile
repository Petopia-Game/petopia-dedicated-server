FROM ubuntu

ARG DEBIAN_FRONTEND=noninteractive
ARG DOCKER_VERSION=17.06.0-ce
ENV GAME_ID=42540f17-f16e-4dbe-8738-3cab10e121d3
ENV GAME_ENV=DEV
ENV API_KEY=apiKey

RUN apt-get update
RUN apt-get install -y libglu1 libxcursor1 ca-certificates 
RUN update-ca-certificates

RUN apt-get -y install curl gnupg 
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash 
RUN apt-get -y install nodejs 

RUN apt-get clean 


EXPOSE 26000/udp
EXPOSE 26000/tcp

WORKDIR /app
COPY . .

CMD ["npm", "start"]