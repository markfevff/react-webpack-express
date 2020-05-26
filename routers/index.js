const express = require('express');
const router = express.Router();
const api = require('../api/index.js');

router.post('/testapi',api.testApi);
router.post('/testapijson',api.testApiJson);
router.post('/testUmerapi',api.testApiUmer);

module.exports = router;