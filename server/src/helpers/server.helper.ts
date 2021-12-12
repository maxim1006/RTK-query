import { Request, Response } from 'express';
import * as compression from 'compression';

export default function shouldCompress(req: Request, res: Response) {
    if (req.headers['x-no-compression']) return false;

    return compression.filter(req, res);
}
