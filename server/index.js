'use strict';

const tabula = require('./app');

const PORT = process.env.PORT || 9000;

tabula.listen(PORT, (err) => {
  if(err) {
    console.log(`Что-то пошло не так: ${err}`);
  }
  console.log(`Сервер на порту ${PORT}`);
});