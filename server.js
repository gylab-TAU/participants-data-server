import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbConnector from './dbConnector';
import RequestValidatorService from './RequestValidationService';
const app = express();

app.use(bodyParser.json());
app.use(cors());
let port = 1338;

app.get('/isAlive', (req, res) => {
    return res.status(200).send({ message: "Ani Sheled" });
});

app.get('/aaa', async (req, res) => {
    let db = new dbConnector();
    let a = await db.executeQuery("SELECT * FROM experiments.experiment_participants")
    return res.status(200).send(a);
});

app.get('/getAllExperimentParticipants/:experimentName', async(req, res) => {
    let db = new dbConnector();
    let query = "SELECT * FROM experiments.experiment_participants WHERE experiment_name = '" + req.params.experimentName + "';";
    let participants = await db.executeQuery(query);

    return res.status(200).send(participants);
});

app.post('/insertParticipant', async (req, res) => {
    console.log(req)
    let validationResponse = RequestValidatorService.validatePostRequestBody(req);

    if (validationResponse.status != 200) {
        
        return res.status(validationResponse.status).send({ message: validationResponse.message });
    }

    let query = "INSERT INTO experiments.experiment_participants SET ";

    query += "experiment_name = '" + req.body.data.experimentName + "', ";
    query += "experimenter_name = '" + req.body.data.experimenterName + "', ";
    query += "participant_id = '" + req.body.data.participantId + "'";

    if (req.body.data.date) {
        query += ", "
        query += "date = " + req.body.data.date;
    }

    query += ";";

    let db = new dbConnector();
    let response = await db.executeQuery(query);

    return res.status(200).send(response);

    // INSERT INTO experiments.experiment_participants SET experiment_name = "xxx", experimenter_name = "yyy", participant_id = "zzz";

});

app.listen(port, () => {
    console.log("server started on port " + port);
});