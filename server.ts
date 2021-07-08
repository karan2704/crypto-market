import axios from "axios";

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port:number = 5000

app.use(function(req:any, res:any, next:any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());


app.get('/api/stocks', function (req: any, res: any) {
    let dataReceived: {};
    axios(
        {
            method: 'get',
            url: "https://api.wazirx.com/api/v2/market-status",
            headers: { 
              'Content-Type': 'application/json'
            }
          }
    )
    .then((response) => {
        dataReceived = response.data
        res.status(200).json(dataReceived)
    })
    .catch((err) => {
        res.status(404).json({
            msg: err
        })

    })    
})


app.listen(port, function () {
    console.log('Server running on port ' + port);
})