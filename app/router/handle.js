const express = require("express");
const handle = express.Router();
const request = require("request");

handle.get("/", (req, res) => {
    request({
        method: "GET",
        url: req.query.url,
    }, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: "error",
                data: err
            })
        }
        return res.send({
            code: 200,
            msg: "success",
            data
        })
    })
})

module.exports = handle;