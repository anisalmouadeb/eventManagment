import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  image: {
    marginLeft: '10px',
    marginTop: '5px',
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
    padding: '30px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    }},
    paper: {
      marginTop: '10px',
      padding: theme.spacing(1),
    },


  [theme.breakpoints.down('sm')]:{

    mainContainer:{
      flexDirection :"column-reverse"
    }
  }
 
}));