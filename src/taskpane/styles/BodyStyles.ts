import { makeStyles } from '@fluentui/react-components';

const BodyStyles = makeStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    },
    score: {
      marginTop: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
    },
    button: {
      marginTop: '10px',
    },
  });

export default BodyStyles;
