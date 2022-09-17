const jwt = require('jsonwebtoken')

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // 1-ым элементом идет тип токена, 2-ым сам токен, поэтому получаем второй элемент
            if (!token) {
                return res.status(401).json({message: "Необходимо авторизоваться"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            if (decoded.role !== role) {
                return res.status(403).json({message: "Нет прав доступа"})
            }

            req.user = decoded
            next() // Вызываем следующий в цепочке middleware
        } catch(e) {
            res.status(401).json({message: "Необходимо авторизоваться"})
        }
    }
}

