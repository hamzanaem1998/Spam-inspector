import axios from "axios";

// Définir l'API_KEY et les headers
const API_KEY = "8511c01b2929ad83b4683a7847adf9cdd101ab069fb2c46a056b1dd8c6f2a887";
const headers = { "Authorization": `Bearer ${API_KEY}` };

// Définir l'URL de l'API
const url = "http://192.168.39.210:7766/scan";

export const getScore = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    Office.context.mailbox.item?.body.getAsync(
      Office.CoercionType.Text,
      (result: Office.AsyncResult<string>) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          const emailContent = result.value;

          // Préparer le payload avec le contenu de l'email
          const payload = {
            more_details: "0",
            output: "json",
            email: emailContent
          };

          // Envoyer la requête POST avec Axios
          axios.post(url, payload, { headers })
            .then(response => {
              // Afficher le résultat dans la console
              const data = response.data;
              console.log(data);

              if (data && typeof data === 'object' && 'score' in data) {
                console.log('Score:', data.score);
              } else {
                console.log('Score non disponible');
              }

              resolve();
            })
            .catch(error => {
              console.error('Erreur lors de la requête:', error);
              reject(error);
            });
        } else {
          reject(result.error);
        }
      }
    );
  });
};
