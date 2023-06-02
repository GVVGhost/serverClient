const express = require('express');
const router = express.Router();

// const userControllers = require('../userControllers');
const userControllers = require('@/modules/catalogs/users/controllers/index.js');
// const verifyProfile = require('../../../middleware/verifyProfile');

router.get('/', userControllers.findAll);
router.get('/:id', userControllers.findById);
// router.post('/login/', userControllers.findByEmailAndPassword);
router.post('/', userControllers.create);
router.put('/:id', userControllers.update);
router.delete('/:id', userControllers.remove);
// router.get('/profile', verifyProfile, userControllers.profile);

module.exports = router;