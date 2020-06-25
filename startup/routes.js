
const express = require("express");

module.exports = function (app) {
    app.disable('X-Powered-By');
    app.disable('x-powered-by');
    app.disable('server');
    app.use(express.json({limit: '10MB', type: 'application/json'}));
    app.use(express.urlencoded({ extended: true, parameterLimit: 10000, limit: '10mb', }));
    
    const index = require("../routes/index");

    app.use("/", index);

    app.get("*", (req, res)=>{
        res.redirect('/')
    });
}