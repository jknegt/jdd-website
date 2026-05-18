FROM nginx:alpine
COPY site/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .htpasswd-pcp /etc/nginx/.htpasswd-pcp
EXPOSE 80
