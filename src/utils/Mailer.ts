import nodemailder from 'nodemailer'

const Mailer = ()=> {
    const trnasport = nodemailder.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    })
} 


export default Mailer