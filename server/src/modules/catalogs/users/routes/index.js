const express = require('express');
const router = express.Router();

// const controllers = require('../controllers');
const controllers = require('@/modules/catalogs/users/controllers/index.js');
// const verifyProfile = require('../../../middleware/verifyProfile');

router.get('/', controllers.findAll);
router.get('/:id', controllers.findById);
router.post('/login/', controllers.findByEmailAndPassword);
router.post('/', controllers.create);
router.put('/:id', controllers.update);
router.delete('/:id', controllers.remove);
// router.get('/profile', verifyProfile, controllers.profile);

module.exports = router;