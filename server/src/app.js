const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const authCtrl = require('./controllers/authCtrl');

const errorHandlers = require('./handlers/errorHandlers');
const express = require('express');

const cors = require('cors');

const cookieParser = require('cookie-parser');

// const fileUpload = require('express-fileupload');
const app = express();

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(authCtrl.isValidAuthToken)

app.use('/api', authRouter);
app.use('/api', userRouter);
// app.use('/api', authCtrl.isValidAuthToken, erpApiRouter);

app.use(errorHandlers.notFound);

app.use(errorHandlers.productionErrors);

module.exports = app;