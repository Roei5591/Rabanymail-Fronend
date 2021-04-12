import {  IconButton, InputBase,  Paper } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import makeStyles from './styles';
const useStyles = makeStyles();

const SearchBar = () => {

  const classes = useStyles();
  
  return  (
    <Paper component="form" className={classes.search}>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Mail"
        inputProps={{ "aria-label": "Search Mail" }}
      />
    </Paper>
  )
}

export default SearchBar;