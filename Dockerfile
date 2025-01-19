FROM node:22.12.0 as build

WORKDIR /app

ARG GIT_COMMIT
ENV REACT_APP_GIT_COMMIT=$GIT_COMMIT

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
