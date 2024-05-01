import sendgrid from "@sendgrid/mail";
async function sendmail(msg: any) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  if (msg.bcc) {
    if (Array.isArray(msg.to)) {
      if (
        msg.to.find(
          (str: string) => str.toLowerCase() === msg.bcc.toLowerCase()
        )
      )
        msg.bcc = undefined;
    } else {
      if (msg.to.toLowerCase() == msg.bcc.toLowerCase()) msg.bcc = undefined;
    }
  }

  await sendgrid
    .send(msg)
    .then((response) => {
      console.log(`Email sent - Code: ${response[0].statusCode}`);
    })
    .catch((error) => {
      console.log(`Email send failed: ${error}`);
    });
}

export default sendmail;
