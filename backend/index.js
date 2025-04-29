const express = require('express')
const cors = require('cors')
const { faker, Faker } = require('@faker-js/faker');

const app = express()
const port = 3000

app.use(express.json())
app.use(cors());

//USUARIOS
let users = []

function init() {
    for (let i = 0; i<15; i++) {
        users.push({
            id: faker.number.int({ min: 0, max: 200 }),
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            avatarUrl: faker.image.avatar(),
            active: true
        })
    }
}

app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/users/:id', (request, response) => {
    console.log(`usuario: ${request.params.id}`)

    let result = users.filter(user => user.id === parseInt(request.params.id))

    if (result.length === 1) {
        response.send(result[0])
    } else {
        response.sendStatus(404)
    }
})

app.put('/users/:id', (request, response) => {
    console.log(`usuario: ${request.params.id}`)

    let result = users.filter(user => user.id === parseInt(request.params.id))

    if (result.length === 1) {
        // response.send(result[0])
        // result = request.body
        result[0].name = request.body.name
        result[0].surname = request.body.surname
        result[0].avatarUrl = request.body.avatarUrl
        result[0].active = request.body.active
        response.sendStatus(200)
    } else {
        response.sendStatus(404)
    }
})

app.post('/users', (req, res) => {
    let user = req.body
    console.log(`usuario ${JSON.stringify(user)}`)
    users.push(user)
    res.sendStatus(201)
})





//COURTS
let courts = []

function initCourts() {
    for (let i = 0; i<6; i++) {
        courts.push({
            id: 1 + i,
            name: `Pista ${i+1}`,
            indoor: faker.datatype.boolean(),
            active: true
        })
    }
}

app.get('/courts', (req, res) => {
    res.send(courts)
})


app.get('/courts/:id', (request, response) => {
    console.log(`Pista: ${request.params.id}`)

    let result = courts.filter(court => court.id === parseInt(request.params.id))

    if (result.length === 1) {
        response.send(result[0])
    } else {
        response.sendStatus(404)
    }
})


app.put('/courts/:id', (request, response) => {
    console.log(`Pista: ${request.params.id}`)

    let result = courts.filter(court => court.id === parseInt(request.params.id))

    if (result.length === 1) {
        // response.send(result[0])
        // result = request.body
        result[0].name = request.body.name
        result[0].indoor = request.body.indoor
        result[0].active = request.body.active
        response.sendStatus(200)
    } else {
        response.sendStatus(404)
    }
})


app.post('/courts', (req, res) => {
    let court = req.body
    court.id = courts.length > 0 ? Math.max(...courts.map(c => c.id)) + 1 : 1;
    console.log(`Pista ${JSON.stringify(court)}`)
    courts.push(court)
    res.sendStatus(201)
})


app.delete('/courts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const exists = courts.some(c => c.id === id);

    if (exists) {
        courts = courts.filter(court => court.id !== id); 
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
      init()
      initCourts()
      console.log(`Example app listening on port ${port}`)
  })






