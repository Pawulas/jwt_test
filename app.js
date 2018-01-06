require("./config/config");

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const { load } = require("./functions/readFile");
const { mongoose } = require("./db/mongoose");
const { Payment } = require("./models/payments");

const app = express();

const port = process.env.PORT;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));


app.listen(port, () => {
  console.log(`Started on ${port}`);
})



/*
app.get("/", (req, res) => {
  res.send("OK");
})

app.get("/load", (req, res) => {
  
  load.then((data) => {
    data.forEach((item) => {
      Payment.findOne({signature: item.signature}, (err, res) => {
        if (err) {
          console.log(err);
        }

        if(!res) {
          let pay = new Payment({
            signature : item.signature,
            date : item.date,
            type : item.type,
            account : item.account,
            amount : item.amount,
            customer : item.customer
          });
    
          pay.save();
        }

      });
    });

    res.status(201).send();
  })
})

app.get("/data", (req, res) => {

  Payment.find(req.query, (err, data) => {
    if (err) {
      console.log(err);
    }

    res.send(data);
  })
})
*/