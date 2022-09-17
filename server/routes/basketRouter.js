const Router = require('express');
const router = new Router();
const BasketController = require('./../controllers/basketController');
const AuthMiddleware = require('./../middleware/AuthMiddleware');
const checkDeleteDeviceFromBasket = require('./../middleware/checkDeleteDeviceFromBasket');

router
    .post('/', AuthMiddleware, BasketController.addDevice)
    .get('/', AuthMiddleware, BasketController.getDevices)
    .delete('/:id', AuthMiddleware, checkDeleteDeviceFromBasket, BasketController.deleteDevice);

module.exports = router;