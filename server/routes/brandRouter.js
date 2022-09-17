const Router = require('express')
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/CheckRoleMiddleware')
const router = new Router()


router.post('/', brandController.create)
router.get('/', brandController.getAll)
router.delete('/:id', checkRole("ADMIN"), brandController.delete);

module.exports = router