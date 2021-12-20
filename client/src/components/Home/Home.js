import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useHistory, useLocation } from "react-router-dom";
import eventLogo from "../../images/logo.png";
import eventLogoText from "../../images/text.png";
import Events from "../Events/Events";
import Form from "../Form/Form";
import useStyle from "./styles";
import { useDispatch } from "react-redux";
import { getEvents, getEventsBySearch } from "../../actions/events";
import Pagination from "../Pagination";
import { Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState(null);
  
  const [locations, setLocations] = useState([]);
  const history = useHistory();

  const searchEvent = () => {
    if (search || locations) {
      dispatch(getEventsBySearch({ search, locations: locations.join(",") }));
      history.push(
        `/events/search?searchQuery=${
          search || "none"
        }&locations=${locations.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchEvent();
    }
  };

  const handleAddChip = (location) => setLocations([...locations, location]);

  const handleDeleteChip = (chipToDelete) =>
    setLocations(locations.filter((location) => location !== chipToDelete));

  return (
    <Container maxWidth="xl">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
          <img
            component={Link}
            to="/"
            src={eventLogoText}
            alt="icon"
            height="45px"
          />
          <img
            className={classes.image}
            src={eventLogo}
            alt="icon"
            height="35px"
          />
        </Link>
      </AppBar>

      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            className={classes.gridContainer}
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Events setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
           
                <TextField
                 style={{ margin: "10px 0" }}
                  name="eventDate"
                  variant="outlined"
                  fullWidth
                  required
                  type="date"
                  value={search}
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  onClick={searchEvent}
                  className={classes.searchButton}
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {!searchQuery && !locations.length && (
                <Paper className={classes.paper} elevation={6}>
                  <Pagination page={page} className={classes.pagination} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default Home;
