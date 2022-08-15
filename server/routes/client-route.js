const express = require('express');
const { getClients } = require('../helpers/clients');
const { getAuthStatus } = require('../middlewares/authentication');
const router = express.Router();

router.get('/', getAuthStatus, getClients);

module.exports = router;
