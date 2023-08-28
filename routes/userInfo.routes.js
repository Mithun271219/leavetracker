const route = require('express').Router();

const { getAllPolices } = require('../services/auth.services')

route.get('/', getAllPolices);

module.exports = route