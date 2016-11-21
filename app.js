var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/', function(req, res) {

    url = 'http://www.xxx.com/';

    request(url, function(error, response, html) {
        if (!error) {

            var $ = cheerio.load(html);


            var codigo, nome, marca, preco
            var json = []
            var products = $('.price-list tbody').find('tr').toArray()

            for (index = 0; index < products.length; ++index) {
                var infos = $(products[index]).children().toArray()

                codigo = $(infos[0]).text()
                nome = $(infos[1]).text()
                marca = $(infos[2]).text()
                preco = $(infos[3]).text()

                json.push({
                    codigo: codigo,
                    nome: nome,
                    marca: marca,
                    preco: preco

                })
            }
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {
            console.log('File successfully written! - Check your project directory for the output.json file');
        })

        res.send('Check your console!')

    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
