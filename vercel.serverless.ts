import { createServer } from 'vercel-node-server';
import { createApp } from './src/main';

let server: any;

export default async function handler(req: any, res: any) {
    if (!server) {
        const app = await createApp();
        await app.init();
        server = createServer(app.getHttpAdapter().getInstance());
    }
    server.emit('request', req, res);
}