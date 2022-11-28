FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]