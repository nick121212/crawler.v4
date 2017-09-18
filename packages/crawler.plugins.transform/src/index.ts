import "reflect-metadata";
import jsonata from "./libs/jsonata";

export { jsonata };

// let data = {
//   "FirstName": "Fred",
//   "Surname": "Smith",
//   "Age": 28,
//   "Address": {
//     "Street": "Hursley Park",
//     "City": "Winchester",
//     "Postcode": "SO21 2JN"
//   },
//   "Phone": [
//     {
//       "type": "home",
//       "number": "0203 544 1234"
//     },
//     {
//       "type": "office",
//       "number": "01962 001234"
//     },
//     {
//       "type": "office",
//       "number": "01962 001235"
//     },
//     {
//       "type": "mobile",
//       "number": "077 7700 1234"
//     }
//   ],
//   "skus": [1, 2, 3, 4, 5, 6, 6, 6],
//   "Email": [
//     {
//       "type": "work",
//       "address": ["fred.smith@my-work.com", "fsmith@my-work.com"]
//     },
//     {
//       "type": "home",
//       "address": ["freddy@my-social.com", "frederic.smith@very-serious.com"]
//     }
//   ],
//   "skus": [{ "a": 1, "c": 3 }, { "b": 2 }],
//   "Other": {
//     "Over 18 ?": true,
//     "Misc": null,
//     "Alternative.Address": {
//       "Street": "Brick Lane",
//       "City": "London",
//       "Postcode": "E1 6RF"
//     }
//   }
// }

// let expression: jsonata.IExpression = jsonata(`
//   $.skus.$string().$replace("https://item.jd.com/$1.html", "$1", $, 1).{
//      "url":$,
//      "params":{
//      	"a":1
//      }
//   }
// `);

// let exp = jsonata(`$combine($.skus)`);

// exp.assign("combine", (objs: Array<Object>) => {
//   if (objs.constructor !== Array) {
//     throw new Error("第一个参数有问题");
//   }
//   return objs.reduce((prev: Object, obj: Object) => {
//     return Object.assign({}, prev, obj);
//   }, {});
// });


// let result = expression.evaluate(data);

// console.log(exp.evaluate(data));
// console.log(jsonata("$moment("1987-02-18").format("DD/MM/YYYY HH:mm:ss")").evaluate());
// console.log(result);
// console.log(jsonata("Email.address").evaluate(data));

