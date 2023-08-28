const route = require('express').Router();

const { getAllPolices, signUp, deleteUser, activateUser, deActivateUser, signIn } = require('../services/auth.services');

route.post('/signup', signUp)
route.post('/signin', signIn)
route.delete('/deleteuser', deleteUser)
route.put('/deactivate', deActivateUser)
route.put('/activate', activateUser)

module.exports = route