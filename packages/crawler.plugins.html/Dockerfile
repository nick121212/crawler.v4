# cralwer.plugins.downloader
#
# VERSION               1.0.0

FROM daocloud.io/node:5
MAINTAINER nick121212@126.com

ENV NODE_HTTP_PORT 39999

COPY . /app
WORKDIR /app

RUN npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist install

# EXPOSE 39999

CMD ["npm", "start"]