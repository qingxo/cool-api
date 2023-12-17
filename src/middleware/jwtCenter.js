// jwt.js

const jwt = require('jsonwebtoken');

// 定义secret
const secret = 'ABCDEF_KAKA_BBss——0098*&##@';

// 生成JWT的函数
function generateToken(user) {
    return jwt.sign(user, secret, { expiresIn: '50s' });
}

// 验证JWT的中间件
function authJwt() {
    return (req, res, next) => {
        try {
            // 使用express-jwt模块验证
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1];
            req.user = jwt.verify(token, secret);
            next();
        } catch (error) {
            res.sendStatus(401);
        }

    }
}

// 暴露接口
module.exports = {
    generateToken,
    authJwt
};