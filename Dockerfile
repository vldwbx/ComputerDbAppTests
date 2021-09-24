FROM cypress/base:14.7.0
WORKDIR /app
COPY ./package.json ./package.json
RUN npm install

COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json
COPY ./merge-reports.js ./merge-reports.js
COPY ./tsconfig.json ./tsconfig.json

CMD ["npm","run","run-tests"]