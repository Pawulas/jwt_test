const fs = require("fs");
const readline = require("readline");
const stream = require("stream");

const instream = fs.createReadStream("data/trans_full.csv");
const outstream = new stream;
const lineReader = readline.createInterface(instream, outstream);

const load = new Promise((res, rej) => {
  var arr =[];

  lineReader.on("line", function(line) {
    arr.push(line);
  });

  lineReader.on("close", () => {
    let tab = [];

    for(let i = 1; i < arr.length; i++) {
      let row = arr[i].split(";");

      let payment = {
        trans_num: row[7].replace("'", "").replace("'", "").trim(),
        date: new Date(row[0]).toLocaleString(),
        type: row[6].split(" ")[0],
        account: row[4].replace("'", "").replace("'", "").trim(),
        amount: row[8].replace(",", "."),
        customer: row[2]
      }

      tab.push({
        signature: `${payment.account}_${payment.trans_num}`,
        trans_num: payment.trans_num,
        date: payment.date,
        type: payment.type,
        account: payment.account,
        amount: payment.amount,
        customer: payment.customer
      });
    }

    return res(tab.filter((item) => {
      return item.signature.length > 0 && item.trans_num.length > 0
    }));
  });
});

module.exports = {
  load
}