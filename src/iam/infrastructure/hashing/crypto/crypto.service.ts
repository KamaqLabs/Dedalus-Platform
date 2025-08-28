import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt, scryptSync
        , createDecipheriv, createCipheriv } from 'crypto';
import { promisify } from 'util';

//variables//
const scrypt = promisify(_scrypt);
const secret = process.env.JWT_REFRESH_SECRET || 'default-key';

const algorithm = 'aes-256-cbc'
const key =  scryptSync(secret, 'salt', 32);


@Injectable()
export class CryptoService {
  public async  hashPassword(text: string): Promise<{ salt: string, hash: string }> {
    const salt = randomBytes(16).toString('hex');

    const derivedKey = (await scrypt(text, salt, 64)) as Buffer;
    return {
      salt,
      hash: derivedKey.toString('hex'),
    }
  }

  public async verifyHashedPassword(password: string, salt: string, hashedPassword: string)
    : Promise<boolean> {
      const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
      return derivedKey.toString('hex') === hashedPassword;
  }
  
  public encryptToken(token: string): string {
    const iv = randomBytes(16)
    const cipher = createCipheriv(algorithm, key, iv);

    const encrypted =
      Buffer.concat([cipher.update(token, 'utf-8'), cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  public decryptToken(encryptedToken: string): string {
    const parts = encryptedToken.split(':');
    if(parts.length !== 2) throw new Error('Invalid token format');

    const iv = Buffer.from(parts[0], 'hex');
    const encryptedData = Buffer.from(parts[1], 'hex');
    const decipher = createDecipheriv(algorithm, key, iv);
    const decrypted =
      Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    return decrypted.toString('utf-8');
  }
  
  

}
