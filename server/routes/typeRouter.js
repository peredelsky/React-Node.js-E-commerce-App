const Router = require('express')
const typeController = require('../controllers/typeController')
const CheckRole = require('../middleware/CheckRoleMiddleware')
const router = new Router()


router.post('/', CheckRole('ADMIN'), typeController.create) 
router.get('/', typeController.getAll)

module.exports = router