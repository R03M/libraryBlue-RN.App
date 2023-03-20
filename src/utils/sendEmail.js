import * as MailComposer from "expo-mail-composer";

const sendEmail = async (error) => {
  try {
    await MailComposer.composeAsync({
      recipients: ["jagipo8263@loongwin.com"],
      subject: "Error in libraryBlue",
      body: `Error => ${error}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
