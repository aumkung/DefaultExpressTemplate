const express = require('express');
const router = express.Router();
const { BaseController } = require('../controllers')


/* GET users listing. */
router.get('/hello-world', BaseController.getData);

module.exports = router;
