export interface SMSService {
    sendMessage(message: string, phone: string): void;
}