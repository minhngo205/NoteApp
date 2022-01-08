import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
    fontFamily: 'Nunito',
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  TitleContainer: {
    textAlign: 'center',
  },
  title: {
    fontSize: '4.5rem',
    fontFamily : 'Nunito'
  },
  colorText: {
    color: '#3f51b5',
    fontFamily : 'Nunito'
  },
  buttonContinue: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    textAlign: 'center',
    justifyContent:'center',
    borderRadius:20,
  },
  goRight: {
    color: '#3f51b5',
    fontSize: '3.5rem'
  },
  searchButton: {
    marginTop: theme.spacing(2)
  }
}));
