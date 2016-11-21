var phantom = require("phantom");
var cheerio = require('cheerio');
var _ph, _page, _outObj;

phantom.create().then(ph => {
    _ph = ph;
    return _ph.createPage();
}).then(page => {
    _page = page;
    return _page.open('http://www.xxx.com');
}).then(status => {
    console.log(status);
    return _page.property('content')
}).then(content => {

    var $ = cheerio.load(content);


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

    // res.send(JSON.stringify(json));
    console.log(JSON.stringify(json));
    _page.close();
    _ph.exit();
}).catch(e => console.log(e));
