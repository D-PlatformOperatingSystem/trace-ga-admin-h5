FROM nginx:1.18
USER root
ADD ./H5 /site/html
ADD nginx.conf /etc/nginx/nginx.conf
