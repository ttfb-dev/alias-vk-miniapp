FROM node:14

# создание директории приложения
WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

FROM fholzer/nginx-brotli:latest

ENV TERM xterm

RUN apk upgrade --update && apk add bash \
  && rm -rf /apk /tmp/* /var/cache/apk/*

COPY build/nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=0 /usr/src/app/dist /var/www/public

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

