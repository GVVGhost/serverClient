const express = require('express');
const router = express.Router();

const controllers = require('@/modules/catalogs/customers/controllers/index.js');

router.get('/', controllers.findAll);
router.get('/:id', controllers.findById);
router.post('/', controllers.create);
router.put('/:id', controllers.update);
router.delete('/:id', controllers.remove);

module.exports = router;