const Router = require('express')
const deviceController = require('../controllers/deviceController')
const checkRole = require('../middleware/CheckRoleMiddleware')
const router = new Router()


router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)
router.get('/search', deviceController.getSearchAllDeviceByName)
router.delete('/:id', checkRole("ADMIN"), deviceController.delete)
router.put('/:id', checkRole("ADMIN"), deviceController.update)

module.exports = router