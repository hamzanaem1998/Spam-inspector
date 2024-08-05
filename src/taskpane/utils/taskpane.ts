import axios from 'axios';
import { EmailPayload } from '../interfaces/EmailPayload';
import { ApiResponse } from '../interfaces/ApiResponse';

export async function getEmailContent(): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    Office.context.mailbox.item?.body.getAsync(
      Office.CoercionType.Html,
      (asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
          console.error(asyncResult.error.message);
          reject(asyncResult.error.message);
        } else {
          const emailBodyHtml = asyncResult.value;
          Office.context.mailbox.item?.body.getAsync(
            Office.CoercionType.Text,
            (asyncTextResult) => {
              if (asyncTextResult.status === Office.AsyncResultStatus.Failed) {
                console.error(asyncTextResult.error.message);
                reject(asyncTextResult.error.message);
              } else {
                const emailBodyText = asyncTextResult.value;
                const sender = Office.context.mailbox.item?.from.emailAddress;
                const receivers = Office.context.mailbox.item?.to.map((recipient) => recipient.emailAddress).join(', ');
                const subject = Office.context.mailbox.item?.subject;

                const payload: EmailPayload = {
                  sender,
                  receivers,
                  subject,
                  body: emailBodyText,
                };

                const apiUrl = 'http://127.0.0.1:5000/data';

                axios.post(apiUrl, payload)
                  .then(response => {
                    console.log('Response returned from API');
                    resolve(response.data as ApiResponse);
                  })
                  .catch(error => {
                    console.error('Error sending data to API:', error);
                    reject(error);
                  });
              }
            }
          );
        }
      }
    );
  });
}
