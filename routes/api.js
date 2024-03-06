'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  // {
  //   "initNum": 4,
  //   "initUnit": "gal",
  //   "returnNum": 15.14164,
  //   "returnUnit": "L",
  //   "string": "4 gallons converts to 15.14164 liters"
  //   }
  app.get('/api/convert',(req,res)=>{
    const input=req.query.input;
    const initNum=convertHandler.getNum(input);
    const initUnit= convertHandler.getUnit(input);
    const returnNum=convertHandler.convert(initNum,initUnit);
    const returnUnit=convertHandler.getReturnUnit(initUnit);
    const string=convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    if (initNum=='invalid number'&&initUnit=='invalid unit'){
      res.json('invalid number and unit');
    }else if(initNum=='invalid number'){
      res.json('invalid number');
    }else if(initUnit=='invalid unit'){
      res.json('invalid unit');
    };
    res.send({
      initNum,
      initUnit,
      returnNum:+returnNum,
      returnUnit,
      string

    });

  })

};
