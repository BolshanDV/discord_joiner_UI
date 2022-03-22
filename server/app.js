const express = require('express');
const app = express();
const port = 3300;

const capmonsterRouter = require('./routes/capmonster');
const twoCaptcha = require('./routes/2capthca');

app.use('/', capmonsterRouter);
app.use('/', twoCaptcha);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
