import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { TwilioSMSService } from './src/service/TwilioSMSService';
import { Twilio } from 'twilio';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(event);
    try {
        const smsService = new TwilioSMSService(new Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN));
        await smsService.sendMessage('Test SMS', '+19134051131')

        return {
            statusCode: 200,
            body: JSON.stringify('Hello from Lambda!'),

        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some dumb error happened',
            }),
        };
    }
};