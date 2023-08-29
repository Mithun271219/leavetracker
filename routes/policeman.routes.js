const route = require('express').Router();

const { getAllPoliceMan, createPoliceMan, deletePoliceMan } = require('../services/policeman.services');

route.get('/', getAllPoliceMan);
route.post('/createpolice', createPoliceMan)
route.delete('/deletepolice', deletePoliceMan)

module.exports = route