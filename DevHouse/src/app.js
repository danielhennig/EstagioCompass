import express from 'express';
import routes from './routes.js';
import mongoose from 'mongoose';

class App {

    constructor() {
        this.server = express();

        mongoose.connect('mongodb+srv://danielhennig:devhouse@devhouse.13ru6ue.mongodb.net/?retryWrites=true&w=majority&appName=devHouse',
            { useNewUrlParser: true, useUnifiedTopology: true });

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server; 