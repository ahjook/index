const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
var mysql = require('mysql')
app.use(cors())

// app.get('/', (req, res) => {
//     res.json({
//         title: 'Hello World',
//         date: 'Today'
//     });
// })
// app.post('/user', (req,res) => {
//     res.json({
//         username: 'Nerissa',
//         email: 'nerissa@gmail.com',
//         password: null
//     })
// })

app.get('/db/retrieve/:username',(req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'myapp'
      })
      
      connection.connect()
      
      connection.query(`SELECT * FROM accounts where username='${req.params.username}'`, function (err, rows, fields) {
        if (err) throw err
      
        res.json({
            data: rows,
            params: req.params,
            username: req.params.username
        })
      })
      
      connection.end()
})

app.get('/db/create/:username/:email/:password',(req, res) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'myapp'
      })
      
      connection.connect()
      
    //   let values = '',
      connection.query(`INSERT into accounts (username, email, password) VALUES('${req.params.username}','${req.params.email}','${req.params.password}')`, function (err, rows, fields) {
        if (err) throw err
      
        res.json({
            data: rows,
            params: req.params,
            username: req.params.username
        })
      })
      
      connection.end()
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
