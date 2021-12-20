import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { getEvents } from '../actions/events';
const Paginate = ({ page }) => {
     
    const classes = useStyles();
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.events);
    useEffect(() => {
      if (page) {
        dispatch(getEvents(page));
      }
    }, [ page]);

    return (
        <Pagination
          classes={{ ul: classes.ul }}
          count={numberOfPages}
          page={Number(page)|| 1}
          variant="outlined"
          color="primary"
          renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/events?page=${item.page}`} />
          )}
        />
      );
    
  };
  
  export default Paginate;