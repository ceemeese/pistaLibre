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

    users.push({
        id: 1,
        name: 'Admin',
        surname: 'Admin',
        email: 'admin@admin.com',
        password: 'admin',
        active: true,
        role: 'admin'
    });

    for (let i = 0; i<15; i++) {
        users.push({
            id: 1 + i,
            name: faker.person.firstName(),
            surname: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            active: true,
            role: 'user'
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
        response.status(404)
    }
})

app.put('/users/:id', (request, response) => {
    console.log(`usuario: ${request.params.id}`)

    const userId = parseInt(request.params.id)
    const user = users.find(user => user.id === userId)

    if (user) {
        const field = ['email', 'password']
        field.forEach( field => {
            if (request.body[field] !== undefined ) {
                user[field] = request.body[field]
            }
        })
        //user.email = request.body.email
        //user.password = request.body.password
        response.status(200).json(user);
    } else {
        response.sendStatus(404)
    }
})

app.post('/users', (req, res) => {
    let user = req.body
    user.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    console.log(`usuario ${JSON.stringify(user)}`)
    users.push(user)
    res.status(201).json(user);
})

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const exists = users.some(u => u.id === id);

    if (exists) {
        users = users.filter(u => u.id !== id); 
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})





//COURTS
let courts = []
const names = ['Cupra', 'Estrella Damm', 'Nox', 'Head', 'Adeslas', 'Joma']

function initCourts() {
    for (let i = 0; i < names.length; i++) {
        courts.push({
            id: 1 + i,
            name: `Pista ${names[i]}`,
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




//RESERVAS
let reservations = [];

function initReservations() {
    for (let i = 0; i<2; i++) {

        const start = faker.date.soon({ days: 2 });
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + 90);
        
        reservations.push({
            id: i,
            courtId: faker.number.int({ min: 1, max: 6 }),
            userId: faker.helpers.arrayElement(users).id,
            date: start,
            endDate: end,
        })
    }
}


app.get('/reservations', (req, res) => {
    res.send(reservations)
})



app.get('/reservations/:id', (request, response) => {
    console.log(`Reserva: ${request.params.id}`)

    let result = reservations.filter(reservation => reservation.id === parseInt(request.params.id))

    if (result.length === 1) {
        response.send(result[0])
    } else {
        response.sendStatus(404)
    }
})


app.put('/reservations/:id', (request, response) => {
    console.log(`Reserva: ${request.params.id}`)

    let result = reservations.filter(reservation => reservation.id === parseInt(request.params.id))

    if (result.length === 1) {
        // response.send(result[0])
        // result = request.body
        result[0].courtId = request.body.courtId
        result[0].userId = request.body.userId
        result[0].date = request.body.date
        result[0].endDate = request.body.endDate
        response.sendStatus(200)
    } else {
        response.sendStatus(404)
    }
})


app.post('/reservations', (req, res) => {
    let reservation = req.body
    reservation.id = reservations.length > 0 ? Math.max(...reservations.map(r => r.id)) + 1 : 1;
    console.log(`Reserva ${JSON.stringify(reservation)}`)
    reservations.push(reservation);
    
    res.status(201).json(reservation);
})


app.delete('/reservations/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const exists = reservations.some(r => r.id === id);

    if (exists) {
        reservations = reservations.filter(court => court.id !== id); 
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})




//INIT

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
      init()
      initCourts()
      initReservations()
      console.log(`Example app listening on port ${port}`)
  })




  






