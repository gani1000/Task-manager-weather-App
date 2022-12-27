

require('dotenv').config();
const errorHandlerMiddleWare = require('./middleware/errorHandler');
const notFound = require('./middleware/not_found');
const routes = require('./routes/tasksRoutes');
const connectDB = require('./db/connect');
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();


/* Key */
const API_KEY = process.env.API_KEY;

/* MiddleWare */
app.use(express.static('./public'))
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('tasks_main.html', {
        root: path.join(__dirname, './public/html')
    });
});

app.get('/index.html', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './public/html')
    });
});

app.get('/tasks_main.html', (req, res) => {
    res.sendFile('tasks_main.html', {
        root: path.join(__dirname, './public/html')
    });
});

app.post('/weather', (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city_name}&appid=${API_KEY}&units=metric`;
    axios({
        url: url,
        responseType: 'json'
    }).then(data => {
        res.send(data.data);
    })
});

app.use('/api/v1/tasks', routes);


app.use(notFound);
app.use(errorHandlerMiddleWare);

const port = process.env.PORT || 8000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB);
        console.log('CONNECTED!!')
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}..`)
        });
    } catch (error) {
        console.log(error);
    }
}

start();