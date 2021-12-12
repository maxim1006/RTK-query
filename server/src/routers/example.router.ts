import express, { Request, Response } from 'express';
import fsExtra from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ExampleModel } from '../models/example.model';

const exampleRouter = express.Router();
const examplePath = path.join(__dirname, '../../data', 'example.json');

exampleRouter.get('/', async (req: Request, res: Response) => {
    const { limit } = req.query;

    try {
        let examples = await fsExtra.readJson(examplePath);

        res.status(200).json(examples.slice(0, Number.isInteger(limit) ? limit : examples.length));
    } catch (e) {
        res.status(500).json({});
    }
});

exampleRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const examples = await fsExtra.readJson(examplePath);
        const example = examples.find((example: ExampleModel) => example.id === id);

        res.status(200).json(example);
    } catch (e) {
        res.status(500).json({});
    }
});

exampleRouter.post('/', async (req: Request, res: Response) => {
    const { body } = req;
    const uniqueUserId = uuidv4();
    const exampleValue = {
        id: uniqueUserId,
        ...body,
    };

    try {
        let examples = await fsExtra.readJson(examplePath);
        examples.push(exampleValue);

        await fsExtra.writeJson(examplePath, examples);

        res.status(201).json(exampleValue);
    } catch (e) {
        res.status(500).json({});
    }
});

exampleRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        let examples = await fsExtra.readJson(examplePath);
        const deletedUser = examples.find((example: ExampleModel) => example.id === id);

        await fsExtra.writeJson(
            examplePath,
            examples.filter((i: ExampleModel) => i.id !== id)
        );

        res.status(200).json(deletedUser);
    } catch (e) {
        res.status(500).json({});
    }
});

exampleRouter.put('/', async (req: Request, res: Response) => {
    const { body } = req;
    const id = body.id;

    try {
        const examples = await fsExtra.readJson(examplePath);
        const example = examples.find((example: ExampleModel) => example.id === id);
        const updatedUsers = examples.map((example: ExampleModel) => {
            if (example.id === id) return { ...example, ...body };

            return example;
        });

        await fsExtra.writeJson(examplePath, updatedUsers);

        res.status(200).json(example);
    } catch (e) {
        res.status(500).json({});
    }
});

export { exampleRouter };
