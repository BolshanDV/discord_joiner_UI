const express = require('express');
const app = express();

const capmonsterRouter = require('./server/routes/capmonster');
const twoCaptcha = require('./server/routes/2capthca');

app.use('/', capmonsterRouter);
app.use('/', twoCaptcha);

app.listen(3030, () => {
    console.log(`Example app listening on port ${3030}`)
})


