import { Request, Response } from 'express';

const login = async (req:Request, res:Response) => {
    try {
        
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        
    }
}

const register = async (req:Request, res:Response) => {
    try {
        
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        
    }
}

export { login };