var jpp = require("json-pointer");
var _ = require("lodash");

var data = {
    result: [{
        result: {
            skus: [1, 2, 3, 4, 5, 6],
            items: [{
                url: "www.baidu1.com"
            }, {
                url: "www.baidu2.com"
            }]
        }
    }]
};
var jpp1 = jpp(data);

