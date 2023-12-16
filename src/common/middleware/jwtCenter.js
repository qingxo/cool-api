const express = require('express');
const jwt = require('jsonwebtoken');
const MAGIIC_WORDS = 'ABCDEF_KAKA_BBss——0098*&##@';
let token = jwt.sign({ username: 'admin' }, MAGIIC_WORDS, { expiresIn: 60 });
console.log("the token is:", token);

//解析token
jwt.verify(token, MAGIIC_WORDS, (err, data) => {
    if (err) {
        console.log("校验失败：", err);
        return
    }
    console.log("校验数据是:", data);
});

