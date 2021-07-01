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

// function getImageObj(url) { //请求图片资源(Promise)
//     return new Promise((res, rej) => {
//         request(url, (err, data) => {
//             if (err) {
//                 console.log(err);
//                 rej(err);
//             }
//             res(data);
//         })
//     })
// }

handle.get("/", (req, res) => {
    request({
        method: "GET",
        url: req.query.url,
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36 Edg/91.0.864.59"
        }
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

// 存储资源
handle.post("/putFile", async (req, res) => {
    const { data, address, urlCode } = req.body;
    for (let i = 0; i < data.length; i++) {
        // const imageObj = await getImageObj(data[i].path, address); //读取下载缓存文件资源
        const ws = fs.createWriteStream(`${address}/${i}.png`);
        try {
            request(data[i].path).pipe(ws);
        } catch (e) {
            if (data[i].path.split("//")[0] !== "http" || data[i].path.split("//")[0] !== "https") {
                try {
                    request(urlCode + data[i].path).pipe(ws);
                } catch (e2) {
                    console.log(e2)
                    return res.send({
                        code: 500,
                        msg: "error",
                        data: null
                    })
                }
            }
        }
    }
    res.send({
        code: 200,
        msg: "success"
    })
})
module.exports = handle;
