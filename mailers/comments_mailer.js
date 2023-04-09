const nodeMailer = require('../config/nodemailer');
//module.exports= newComment
// this is another way to export a method
exports.newComment = (comment) =>
{
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail(
        {
            from:'mernlearn.15@gmail.com',
            to:comment.user.email,
            subject:'New Comment Published!!',
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