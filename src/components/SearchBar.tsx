import {  IconButton, InputBase,  Paper } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from 'react';
import { useActions } from '../hooks/use-actions';
import makeStyles from './styles';
const useStyles = makeStyles();

const SearchBar = () => {

  const classes = useStyles();
  const [input , setInput] = useState("");
  
  const handleChange = () => {

  }

  const { setSearchTerm } = useActions();

  useEffect(() => {
    setSearchTerm(input);
  },[input])


  return  (
    <Paper component="form" className={classes.search}>
      <IconButton
       // type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Mail"
        inputProps={{ "aria-label": "Search Mail" }}
        onChange={e => setInput(e.currentTarget.value)}
        value = {input}
      />
    </Paper>
  )
}

export default SearchBar;