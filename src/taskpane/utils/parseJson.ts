import { ApiResponse } from "../interfaces/ApiResponse";

export const extractDetails = (jsonStr: string): ApiResponse => {
  const resultRegex = /"result":\s*"([^"]*)"/;
    const scoreRegex = /"score":\s*"([^"]*)"/;
    const reportRegex = /"report":\s*"([^"]*)"/;
    const scanDurationRegex = /"Scan Duration":\s*"([^"]*)"/;
  
    const resultMatch = resultRegex.exec(jsonStr);
    const scoreMatch = scoreRegex.exec(jsonStr);
    const reportMatch = reportRegex.exec(jsonStr);
    const scanDurationMatch = scanDurationRegex.exec(jsonStr);
  
    const result = resultMatch ? resultMatch[1] : '';
    const score = scoreMatch ? scoreMatch[1] : '';
    const report = reportMatch ? reportMatch[1] : '';
    const scanDurationValue = scanDurationMatch ? scanDurationMatch[1] : '';
  
    // Extract everything between report and "Scan Duration"
    const dataRegex = /"report":\s*"[^"]*",([\s\S]*?),"Scan Duration":\s*"[^"]*"/;
    const dataMatch = dataRegex.exec(jsonStr);
    const data = dataMatch ? dataMatch[1].trim() : '';
  
    return {
      result,
      score,
      report,
      data,
      scanDuration: scanDurationValue
    };
};
