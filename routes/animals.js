var express = require('express');
var router = express.Router();
var userController = require('../controllers/animalController')

/* GET users listing. */
router.get('/:name', userController.getOne);
router.get('/', userController.getAll);

router.post('/',userController.register);
router.put('/:name', userController.update);
router.delete('/:name',userController.delete);

module.exports = router;
