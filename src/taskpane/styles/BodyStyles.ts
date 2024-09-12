import { tokens, makeStyles } from '@fluentui/react-components';
import { Maximize16Filled } from '@fluentui/react-icons';

const BodyStyles = makeStyles({
    bodyContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    detailsContainer: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start', 
      marginLeft: '5vw', 
      gap: '8px',
      marginTop: '10%',
    },
    resultButton: {
      alignSelf: 'center',
      marginTop: '4%',
      backgroundColor: '#0f6cbd',
    },
    detailText: {
      alignSelf: 'flex-start',
      fontSize: "(vw",
      fontWeight: tokens.fontWeightRegular,
      color: tokens.colorNeutralBackgroundStatic,
    },
    detailsButton: {
      alignSelf: 'center',
      marginTop: '50px',
    },
    customSwalPopup: {
      height: '80%', 
      color: 'red',
      fontSize: '65%',
    },
  });

export default BodyStyles;
