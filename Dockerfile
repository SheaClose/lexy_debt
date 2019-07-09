FROM nginx:alpine
COPY ./build /usr/share/nginx/html
COPY ./build/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf