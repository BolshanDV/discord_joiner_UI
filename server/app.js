const express = require('express');
export const app = express();

const capmonsterRouter = require('./routes/capmonster');
const twoCaptcha = require('./routes/2capthca');

app.use('/', capmonsterRouter);
app.use('/', twoCaptcha);

