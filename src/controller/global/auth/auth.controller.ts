import { Request, Response } from 'express';
import authService from '../../../services/global/auth/auth.service';

const authRegister = async (req:Request, res:Response):Promise<void> => {
    const {userName, email, password, confirmpassword, phoneNumber}= req.body ;
    try {
        // Validate required fields
        if (!userName) { res.status(400).send('User name is required');
            return;
         }
        if (!email) { res.status(400).send('Email is required' );
            return;
         }
        if (!password) { res.status(400).send('Password is required' );
            return;
         }
        if (!phoneNumber) { res.status(400).send('Phone number is required'); 
            return;
        }
        if (!confirmpassword) { res.status(400).send('Confirm password is required');
            return;
        }
        /// Check if password and confirm password match
        if (password !== confirmpassword) {
            res.status(400).send("Passwords do not match");
        }

        const data = await authService.authRegister(req.body);
        res.json(data)
    } catch (error) {
        res.status(500).send(error);
        
    }
}

export {authRegister};