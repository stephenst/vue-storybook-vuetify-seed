FROM node:latest as baseline

LABEL MAINTAINER="Tony Stephens <tstephens@groupw.com>"

# set working directory
RUN mkdir /ui
WORKDIR /ui

# install and cache app dependencies
COPY package.json /ui/package.json

RUN npm install -g @vue/cli prettier && \
    npm install && \
    npm install node-sass@latest && \
    npm rebuild node-sass

# add `/ui/node_modules/.bin` to $PATH
ENV PATH /ui/node_modules/.bin:$PATH

ADD . /ui/

# build app for production with minification
RUN npm run build

EXPOSE 6006
EXPOSE 8000
EXPOSE 8080
CMD [ "http-server", "dist" ]