FROM dulce/dulce:base-dev

COPY Server/package.json /usr/src/app/package.json

RUN npm install --development

EXPOSE 8080

CMD ["npm", "start"]
