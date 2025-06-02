import { Request, Response } from 'express';
import registerService from '../../../services/global/auth/auth.service';


interface Idata {
    userName: string;
    email: string;
    password: string;
    phoneNumber: number;
    role?: string; // Optional, default can be set in the service
}
const register = async (req:Request, res:Response) => {
    const {userName, email, password, phoneNumber}= req.body as Idata;
    try {
        if (!userName) { return res.status(400).send({ error: 'User name is required' }); }
        if (!email) { return res.status(400).send({ error: 'Email is required' }); }
        if (!password) { return res.status(400).send({ error: 'Password is required' }); }
        if (!phoneNumber) { return res.status(400).send({ error: 'Phone number is required' }); }

        const data = await registerService.register(req.body);
        res.json(data)
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
        
    }
}

export { register };