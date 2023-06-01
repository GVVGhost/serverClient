const express = require('express');
const router = express.Router();

const controllers = require('@/modules/auth/controllers');

router.post('/', controllers);

module.exports = router;