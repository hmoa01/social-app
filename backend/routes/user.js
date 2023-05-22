const {Router} = require('express');
const router = new Router();

router.get('/', require('../controllers/userController/getAllUsers'));
router.post('/signup', require('../controllers/userController/signup'));
router.put('/edit/:uid', require('../controllers/userController/editUser'));

module.exports = router;




