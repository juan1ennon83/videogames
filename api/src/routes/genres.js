const { Router } = require('express');
const getGenres = require('../handlers/getGenresHandlers');

const genresRoutes = Router();
genresRoutes.get('/', getGenres)
module.exports = genresRoutes;