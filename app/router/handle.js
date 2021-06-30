const express = require("express");
const handle = express.Router();
const request = require("request");
const path = require("path");
const fs = require('fs');
const os = require('os');
const cheerio = require("cheerio");
const diskInfo = require("diskinfo");
const USER_HOME = process.env.HOME || process.env.USERPROFILE
//requets 解析网站资源
//url 用于解析网站url地址
handle.get("/", (req, res) => {
    request({
        method: "GET",
        url: req.query.url,
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59"
        }
    }, (err, data) => {
        console.log(data);
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
                code: 500,
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


handle.get("/osInfo", (req, res) => {
    let tempObj = {};
    diskInfo.getDrives(async (err, dirverData) => {
        for (let i = 0; i < dirverData.length; i++) {
            const fileList = fs.readdirSync(dirverData[i].mounted + "\\");
            tempObj[`${dirverData[i].mounted}ok`] = {
                info: dirverData[i],
                fileList
            }
        }
        fs.writeFileSync(`${USER_HOME}/Desktop/info.json`, JSON.stringify(tempObj));
        res.send('ok');
    })
})

module.exports = handle;
