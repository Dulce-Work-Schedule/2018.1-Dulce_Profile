FROM dulce/dulce:base-dev

COPY Client/package.json /usr/src/app/package.json

RUN npm install --development

EXPOSE 8080

CMD ["npm", "start"]
