FROM nginx:alpine

# Копіюємо вміст твоєї папки frontend у директорію Nginx
# (Якщо твій index.html лежить прямо в папці frontend, використовуй '.')
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/
EXPOSE 80