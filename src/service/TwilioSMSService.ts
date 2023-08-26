import { Twilio } from "twilio";
import { logger } from "../utils/Logger";
import { SMSService } from "./SMSService";

export class TwilioSMSService implements SMSService {
    private client: Twilio;

    constructor(client: Twilio) {
        this.client = client;
    }

    public async sendMessage(message: string, number: string) {
        const params = this.createSMSPayload(message, number);

        const results = await this.client.messages.create(params);
        logger.debug('SMS Results: ' + results);
    }

    private createSMSPayload(message: string, number: string) {
        return {
            body: message,
            from: process.env.TWILIO_NUMBER,
            to: number
        }
    }
}