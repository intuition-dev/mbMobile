"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Serv_1 = require("mbake/lib/Serv");
const yaml = require('js-yaml');
const fs = require('fs');
var request = require('request');
const app = Serv_1.ExpressRPC.makeInstance(['*']);
const port = 3000;
app.post("/news", (req, res) => {
    const method = req.fields.method;
    const params = JSON.parse(req.fields.params);
    console.info("--params:", params);
    const resp = {};
    if ('get-news' == method) {
        resp['type '] = '';
        resp['ispacked'] = false;
        var pageSize = 20;
        var page = params['page'];
        console.info("--page:", page);
        request({
            url: "https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=" + pageSize + "&page=" + page + "&apiKey=c75812bea33d40efb539400d39f99c32",
            method: 'GET',
        }, function (error, response, body) {
            var result = JSON.parse(body);
            console.info("--body:", result.status);
            if (result.status == 'OK') {
                let articles = result['articles'].map(function (article) {
                    let temp = article;
                    let randomID = '_' + Math.random().toString(36).substr(2, 9);
                    temp['id'] = randomID;
                    return temp;
                });
                var feeds = {};
                feeds['articles'] = articles;
                feeds['totalResults'] = result['totalResults'];
                resp.result = feeds;
                res.json(resp);
            }
        });
    }
    else {
        resp.errorLevel = -1;
        resp.errorMessage = 'mismatch';
        console.log('noway', resp);
        res.json(resp);
    }
    console.info();
});
app.listen(port, () => {
    console.info(`app RPC listening on port ${port}!`);
});
