const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require('./models/Employee');
require('dotenv').config();
const db = require('./db/connect');
const app = express();


db();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("The password is incorrect")
            }
        } else {
            res.json("No record existed")
        }
    })
  })

app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
  .then(employees => res.json(employees))
  .catch(err => res.json(err))   
})

app.listen(3001, () => {
    console.log("Server is Running");
})