const nodeMailer = require('../config/nodemailer');
exports.changePassword = (accessToken) =>
{   
    console.log(accessToken);
    let htmlString = nodeMailer.renderTemplate({accessToken:accessToken},'/changePassword/changePassword.ejs')
    nodeMailer.transporter.sendMail(
        {
            from:'mernlearn.15@gmail.com',
            to: accessToken.user.email,
            subject:'Changing the Password!!',
            html: htmlString
        }, (err,info)=>
        {
            if(err)
            {
                console.log("Error in sending the mail",err);
                return ;
            }
            console.log("Message sent!!",info);
            return ;

        }
        
    )

}