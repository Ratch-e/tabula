const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./api/routes/users');

const tabula = express();

// логгер
tabula.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// статика
tabula.use(express.static(path.resolve(__dirname, '..', 'frontend', 'build')));
tabula.use(bodyParser.urlencoded({ extended: true }));
tabula.use(bodyParser.json());

tabula.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
});

tabula.use('/api', routes);

module.exports = tabula;

