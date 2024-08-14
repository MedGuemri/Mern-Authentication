
import { mailTrapClient,sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE , PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE} from "./emailTemplates.js";

export const sendVerificationEmail= async (email,verificationToken)=>{

    const recipient =[{email}]

    try {
        const response =await mailTrapClient.send({
            from :sender,
            to : recipient,
            subject: "verify your email",
            html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category : "Email verification"

        })

      console.log("verifcation code  sent successfully")


    } catch (error) {
        console.log("error sending verification ", error)
        throw new Error(`error sending email verification ${error}`)
        
    }

}

export const  sendWlcomeEmail= async (email,name)=>{
    const recipient =[{email}]
    try {
       const response = await mailTrapClient.send({

            from :sender,
            to:recipient,
            template_uuid: "790ac977-971a-4d4e-9e38-1ae163a02087",
            template_variables: {
				company_info_name: "Auth App",
				name: name,
			}
        })
        console.log("your account is verified..welcom email sent seccssefully")



        
    } catch (error) {
        console.log("error sending welcom email",error)
        throw new Error(`error sending welcom email: ${error}`)
        
    }
}

export const sendResetPassWordEmail=async(email,resetURL)=>{
    const recipient =[{email}]
    try {
        const response = await mailTrapClient.send({
            from :sender,
            to :recipient,
            subject: "reset your password",
            html :PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category: "Password Reset",
        })
        

        console.log("reset email sent succefully")

    } catch (error) {
        console.log("error in sent reset password email",error)
        throw new Error(`error sending reset password email ${error}`)
        
    }



}

export const sendSuccessResetPassword=async (email)=>{
    const recipient =[{email}]
    try {
        const response = await mailTrapClient.send({
            from :sender,
            to :recipient,
            subject: "Password Reset Successful",
            html :PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        })
        

        console.log("Password reset email sent successfully")

    } catch (error) {
        console.log("error in sent confermation reset password email",error)
        throw new Error(`error sending confermation reset password email ${error}`)
        
    }

}