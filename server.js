import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());
let port = 1338;

app.get('/isAlive', (req, res) => {
    return res.status(200).send({ message: "Ani Sheled" });
 });
 
 app.listen(port, () => {
     console.log("server started on port " + port);
 });