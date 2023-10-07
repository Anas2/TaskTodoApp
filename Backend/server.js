const express = require('express');
const { PORT, MONGODB_CONNECTION_STRING } = require('./config/configuration');
const TodoRouter = require('./Routes/todoRouter');
const CategoryRouter = require('./Routes/categoryRouter')
const errorHandler = require('./Middleware/errorHandler');
const cors = require("cors");

const corsOptions = {
    // credentials: true,
    origin: ['http://localhost:3000'],

}

const app = express();

const mongoose = require('mongoose');

app.use(express.json({ limit: '50mb' }));
app.use(cors(corsOptions));

app.use('/api/todo', TodoRouter);
app.use('/api/categories', CategoryRouter);

app.use(errorHandler);

mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT} & db connected sucssesfully `);

    });
})
