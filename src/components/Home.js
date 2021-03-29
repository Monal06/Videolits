import React, {useState, useEffect} from 'react'
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import {SEARCH_URL} from "../constants";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActions } from '@material-ui/core';
import MovieDetails from './MovieDetails';
import './style.css'
const useStyles = makeStyles({
    root: {
      maxWidth: '10rem',
    },
    media: {
      height: '15rem',
    },
  });
  
function Home() {
    const[searchItem, setSearchItem] = useState('');
    const[moviesList, setMoviesList] = useState([]);
    const[gotoNextPage, setGotoNextPage] = useState(false);
    const[movieId, setMovieId] = useState();
    const[darkMode, setDarkMode] = useState(false);
    const[themeColor, setThemeColor] = useState({topBar: "black", body:"#2f2b2b" });
    const classes = useStyles();

    useEffect(() => {
        loadSearchData();
    }, [])

    const loadSearchData = async() => {
        const response = await fetch(SEARCH_URL);
        const data = await response.json();
        setMoviesList(data.Search)
    }

    const handleOnToggle =() =>{
        setDarkMode(!darkMode)
        if(darkMode){
            setThemeColor({topBar: "black", body:"#2f2b2b"}) 
        }
        else{ setThemeColor({topBar: "white", body:"white"})}
    }

    const handleOnMovieClick = (id) => {
        setGotoNextPage(true)
        setMovieId(id)
    }
    return (
        <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, right: 0, }}>
            <div style={{ backgroundColor: themeColor.topBar, display: "flex", height: '5rem', justifyContent: "center", alignItems: "center" }}>
                <div style={{ position: "absolute", right: '15px' }}>
                    <label class="switch">
                        <input type="checkbox" onChange={handleOnToggle} />
                        <span class="slider round"></span>
                    </label>
                </div>

                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    style={{ width: '35%' }}
                    disableClearable
                    options={moviesList.map((option) => option.Title)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            style={{ backgroundColor: "white" }}
                            margin="normal"
                            variant="outlined"
                            onChange={setSearchItem(params.inputProps.value)}
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />
                    )}
                />
            </div>

            <div style={{ backgroundColor: themeColor.body, width: '100%', height: '100%', display: "flex", alignItems: "baseline",justifyContent: "center" }}>
                {searchItem ?
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: '80%', display: "flex", flexWrap: "wrap" }}>
                        {moviesList.map((movies) => {
                            if ((movies.Title).includes(searchItem)) {
                                return (
                                    <div style={{ margin: '1%' }}>
                                        <Card className={classes.root}>
                                            <CardActionArea>
                                                <CardMedia
                                                    className={classes.media}
                                                    image={movies.Poster}
                                                />
                                                <CardActions style={{ backgroundColor: "#0c0b0b" }}>
                                                    <Button onClick={(e) => handleOnMovieClick(movies.imdbID)} style={{ color: "white" }}>
                                                        {movies.Title + " " + movies.Year}
                                                    </Button>
                                                </CardActions>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                )
                            }
                        }
                        )}
                    </div>
                    : <div>Type something to see search results</div>}
            </div>
            {gotoNextPage ? <Redirect to={{
                pathname: "/movie-details",
                id: { movieId }
            }} /> : null}

        </div>
    )
}

export default Home
