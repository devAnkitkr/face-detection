const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

var db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'heera',
        database: 'postgres'
    }
})

const app = express();
app.use(bodyParser.json());
app.use(cors())



app.get('/', (req, res) => {
    res.send("it is working");
})

app.post('/signin', (req, res) => {
    const {email,password} =req.body
    db.select('email', 'has').from('login').where('email', '=', email).then(data=>{
        const isValid = bcrypt.compareSync(password, data[0].has);
        if(isValid){
            db.select('*')
            .from('users')
            .where('email','=',email)
            .then(data=>{
                res.json({
                    user:data,
                    msg:'success'
                })
            })
            .catch(err=>res.status(400).json('wrong credentials',err))
        }
        else{
            res.status(400).json('wrong credentials')
        }
    }).catch(()=>res.status(400).json('error'))

})


app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);
    db('login')
        .returning('email')
        .insert({
            has: hash,
            email: email
        }).then(loginEmail => {
            db('users')
                .returning('*')
                .insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => res.json(user[0]))
                .catch(() => res.status(400).json('unable to register'))
        })
        .catch(() => res.status(400).json('unable to register(login)'))
})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    db.select('*').from('users').where({ id: id })
        .then(user => {
            if (user.length) {
                res.json(user[0])
            }
            else {
                res.status(400).json('error getting user profile');
            }
        }).catch(err => res.status(400).json(err))
})

app.put('/image', (req, res) => {
    const { id } = req.body
    db.select('*')
        .from('users')
        .where('id', '=', id)
        .returning(['entry'])
        .increment('entry', 1)
        .then(entries => res.json(entries))
        .catch(() => res.status(400).json('unable to get entries'))
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})