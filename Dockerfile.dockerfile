FROM ubuntu

ARG DEBIAN_FRONTEND=noninteractive
ARG DOCKER_VERSION=17.06.0-ce
ENV GAME_ID=5

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