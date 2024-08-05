import { EmailContent } from "../interfaces/EmailContent";

export const extractDetails = (data: EmailContent): EmailContent => {
  return {
    scanDuration: data.scanDuration || 'No scan duration available',
    report: data.report || 'No report available',
    result: data.result || 'No result available',
    score: data.score || 'No score available',
  };
};
