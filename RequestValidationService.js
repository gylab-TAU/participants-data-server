export default class RequestValidatorService {
    static validatePostRequestBody(req){
        let response = {
            status: 200,
            message: "ok"
        }
        if (!req.body){
            response.status = 400;
            response.message = "empty request body";
        }

        if (!req.body.data){
            response.status = 400;
            response.message = "experiment data is missing";
        }

        if (!req.body.data.experimentName){
            response.status = 400;
            response.message = "experiment name is missing";
        }

        if (!req.body.data.experimenterName){
            response.status = 400;
            response.message = "experimenter name is missing";
        }

        
        if (!req.body.data.participantId){
            response.status = 400;
            response.message = "participant id is missing";
        }

        return response;
    }
}