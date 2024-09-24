import * as React from 'react';
import { Button, Spinner } from '@fluentui/react-components';
import { CheckmarkCircle24Filled, ErrorCircle24Filled, Add16Regular } from '@fluentui/react-icons';
import Swal from 'sweetalert2';
import { getEmailContent } from '../utils/taskpane';
import { extractDetails } from '../utils/parseJson';
import { ApiResponse } from '../interfaces/ApiResponse';
import BodyStyles from '../styles/BodyStyles';

const Body: React.FC = () => {
  const styles = BodyStyles();
  const [details, setDetails] = React.useState<ApiResponse | null>(null); // State to manage details
  const [loading, setLoading] = React.useState<boolean>(false); // State to manage loading spinner

  const cleanText = (text: string) => {
    const cleanedText = text.replace(/\\n/g, '').replace(/\[\+\]/g, '');
    return cleanedText;
  };

  const handleGetResponse = async () => {
    setLoading(true); // Show spinner
    try {
      const result = await getEmailContent();
      if (result) {
        const extractedDetails = extractDetails(result);
        setDetails(extractedDetails);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      setDetails(null);
      Swal.fire({
        icon: 'error',
        title: 'Erreur lors de la récupérations des résultats. Veuillez réessayer',
        confirmButtonText: 'OK',
        width: '90%',
        customClass: {
          popup: styles.customSwalPopup,
        },
      });
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  const openDialog = async () => {
    try {
      const dialogUrl = `${window.location.origin}/dialog.html`;

      Office.context.ui.displayDialogAsync(
        dialogUrl,
        { height: 50, width: 50, displayInIframe: true, promptBeforeOpen: false },
        (asyncResult) => {
          if (asyncResult.status === Office.AsyncResultStatus.Failed) {
            console.error(asyncResult.error.message);
          } else {
            setTimeout(() => {
              const dialog: Office.Dialog = asyncResult.value;
              const messageToDialog = JSON.stringify(details);
              dialog.messageChild(messageToDialog);
              console.log('Message sent from parent');
            }, 1000);
          }
        }
      );
    } catch (error) {
      console.error('Failed to open dialog: ', error);
    }
  };

  return (
    <div className={styles.bodyContainer}>
      <Button className={styles.resultButton} appearance="primary" onClick={handleGetResponse}>
        Afficher résultat
      </Button>
      {loading && ( // Show spinner while loading
        <div className={styles.spinnerContainer}>
          <Spinner label="Scan en cours..." />
        </div>
      )}
      {!loading && details && ( // Show details only after loading is complete
        <>
          <div className={styles.detailsContainer}>
            {details.result.startsWith('normal') ? (
              <CheckmarkCircle24Filled style={{ color: 'green', marginRight: '8px' }} />
            ) : (
              <ErrorCircle24Filled style={{ color: 'red', marginRight: '8px' }} />
            )}
            <div className={styles.detailText}>
              <b>Result: </b>{details.result}
            </div>
            <div className={styles.detailText}>
              <b>Score: </b>{details.score}
            </div>
            <div className={styles.detailText}>
              <b>Report: </b>{cleanText(details.report || '')}
            </div>
          </div>
          <Button
            className={styles.detailsButton}
            appearance="secondary"
            onClick={openDialog}
            icon={<Add16Regular />}
          >
            Afficher plus de détails
          </Button>
        </>
      )}
    </div>
  );
};

export default Body;
