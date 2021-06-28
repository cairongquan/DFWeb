const express = require("express");
const handle = express.Router();
const request = require("request");

const cheerio = require("cheerio");

//requets 解析网站资源
//url 用于解析网站url地址
handle.get("/", (req, res) => {
    request({
        method: "GET",
        url: req.query.url,
    }, (err, data) => {
        if (err) {
            console.log(err);
            return res.send({
                code: 500,
                msg: "error",
                data: err
            })
        }
        const $ = cheerio.load(data.body);

        const images = $("body").find("img");
        let finalArray = [];
        for (let i = 0; i < images.length; i++) {
            try {
                const nameArray = images[i].attribs.src.split("/");
                finalArray.push({
                    name: nameArray[nameArray.length - 1],
                    path: images[i].attribs.src
                })
            } catch (e) {
                console.log(e);
            }
        }
        if (!finalArray.length) {
            return res.send({
                codZe: 500,
                data: null,
                msg: "fail no file"
            })
        }
        res.send({
            code: 0,
            msg: "success",
            data: finalArray
        })
    })
})

module.exports = handle;
