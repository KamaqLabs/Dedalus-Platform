import { randomBytes } from 'crypto';

export class NfcTokenGenerator {

    public static generateNfcToken(): string {
        const timestamp = Date.now().toString(36);
        const randomPart = randomBytes(8).toString('hex');
        return `NFC-${timestamp}-${randomPart}`.toUpperCase();
        // Ej: "NFC-L8K9M2N-A1B2C3D4E5F67890"
    }

    public static generateHexToken(length: number = 16): string {
        return randomBytes(length / 2).toString('hex').toUpperCase();
        // Ej: "A1B2C3D4E5F67890"
    }


}