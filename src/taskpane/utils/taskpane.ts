import axios from 'axios';
import { EmailPayload } from '../interfaces/EmailPayload';
import { sortJson } from './sortJson';
import { extractLinks } from './extractLinks';

// Fonction pour obtenir le contenu de l'email et retourner la réponse de l'API sous forme de chaîne
export async function getEmailContent(): Promise<string> {
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

                // Extraire les détails de l'email
                const emailBodyText = asyncTextResult.value;
                const sender = Office.context.mailbox.item?.from.emailAddress;
                const receivers = Office.context.mailbox.item?.to.map((recipient) => recipient.emailAddress).join(', ');
                const subject = Office.context.mailbox.item?.subject;

                const payload = {
                  "more_details": "0",
                  "output": "json",
                  "from_addr": sender,
                  "to_addr": receivers,
                  "subject": subject,
                  "body": emailBodyText  + " " +  extractLinks(emailBodyHtml).join(' ')
                };

                // Clé API et URL de l'API
                const apiKey = "8511c01b2929ad83b4683a7847adf9cdd101ab069fb2c46a056b1dd8c6f2a887";
                // const apiUrl = 'http://127.0.0.1:5000/data';
                const apiUrl = 'https://192.168.39.55:7766/scan';

                // Configuration des en-têtes pour la requête Axios
                const config = {
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json' // Définir le type de contenu si nécessaire
                  }
                };

                // Envoyer la requête POST à l'API avec Axios
                axios.post(apiUrl, payload, config)
                  .then(response => {
                    if (response.status === 200) {
                      console.log('Response returned from API');

                      console.log(response);
                      console.log(typeof(response.data));

                      //const dataAsString = JSON.stringify(response.data);

                      const dataAsStringAsObject = JSON.parse(response.data);
                      const sortedData = sortJson(dataAsStringAsObject);
                      const sortedDataAsString = JSON.stringify(sortedData);

                      resolve(sortedDataAsString as string);
                    } else if (response.status === 400) {
                      console.log('Erreur lors de la réponse d’appel de API');
                      reject('Erreur lors de la réponse d’appel de API');
                    } else {
                      console.log(`Erreur inattendue: ${response.status}`);
                      reject(`Erreur inattendue: ${response.status}`);
                    }
                  })
                  .catch(error => {
                    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
                      console.log('Erreur pas d’accès');
                    } else {
                      console.error('Erreur lors de l\'envoi des données à l\'API:', error);
                    }
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
