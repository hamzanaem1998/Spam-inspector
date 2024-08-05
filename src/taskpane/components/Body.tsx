import * as React from 'react';
import { Button, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogContent, DialogActions } from '@fluentui/react-components';
import { getEmailContent } from '../utils/taskpane';
import { extractDetails } from '../utils/parseJson';
import { EmailContent } from '../interfaces/EmailContent';
import BodyStyles from '../styles/BodyStyles';

const Body: React.FC = () => {
  const styles = BodyStyles();
  const [details, setDetails] = React.useState<EmailContent | null>(null);

  const handleGetEmail = async () => {
    try {
      const result = await getEmailContent();
      const extractedDetails = extractDetails(result);
      setDetails(extractedDetails);
    } catch (error) {
      console.error('Error getting email content:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Button appearance="primary" onClick={handleGetEmail}>
        Get Email
      </Button>
      {details && (
        <>
          <div className={styles.score}>
            Score: {details.score}
          </div>
          <Dialog>
            <DialogTrigger disableButtonEnhancement>
            <Button appearance="secondary" className={styles.button}>
              Show more details
            </Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>
                  More details about result
                </DialogTitle>
                <DialogContent>
                  <p><strong>Score:</strong> {details.score}</p>
                  <p><strong>Result:</strong> {details.result}</p>
                  <p><strong>Report:</strong> {details.report}</p>
                  <p><strong>Scan Duration:</strong> {details.scanDuration}</p>
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Close</Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Body;
