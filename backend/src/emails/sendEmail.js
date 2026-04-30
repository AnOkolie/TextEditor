import { transporter } from "../lib/email.ts";

export const sendMail = async (emailOptions) => {
  try {
    let info = await transporter.sendMail(emailOptions);
    console.log(`Email sent: ${info.response}`);
    return { status: "success", message: "Email sent successfully" };
  } catch (error) {
    console.log(`Error sending email: ${error}`);
    return { status: "error", message: error.message };
  }
};
