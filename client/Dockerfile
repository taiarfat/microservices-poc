FROM node:alpine
ENV CI=true
ENV WDS_SOCKET_PORT=0
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

# CMD ["npm", "run", "dev"]
RUN npm run build

COPY dist/ /usr/share/nginx/html

FROM nginx:alpine

EXPOSE 5713
CMD ["nginx", "-g", "daemon off;"]