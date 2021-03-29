import { Card, CardActionArea, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {APP_KEY} from "../constants";

const useStyles = makeStyles({
    root: {
        display: "flex", 
        backgroundColor: "black"
    },
    media: {
      height: '15rem',
    },
  });
  
function MovieDetails(props) {
    let history = useHistory();
    const [movieData, setMovieData] = useState();
    const classes = useStyles();
    const goBack = () => {
        history.push("/")
    } 

    useEffect(() => {
        loadMovieData();
    }, [])

    const loadMovieData = async () => {
        const response = await fetch(`http://www.omdbapi.com/?i=${props.location.id.movieId}&apikey=${APP_KEY}`)
        const data = await response.json();
        console.log("Movie data", data)
        setMovieData(data);
    }

    return (
        <div>
            <div style ={{position: "absolute", left: '34rem', top:' 5rem'}}>
                {movieData &&
                    <div style={{ width: '33rem' }}>
                        <Card className = {classes.root}>
                            <CardActionArea style={{width: '12rem'}} >
                                <CardMedia className = {classes.media} image={movieData.Poster} />
                            </CardActionArea>
                            <CardActionArea style={{backgroundColor: "black", color: "white"}}>
                                <CardContent>
                                    <Typography /* style ={{position: "absolute", left: "20rem"}} */>
                                        <Typography variant = "h5"> {movieData.Title + " (" + movieData.Year + ")"}</Typography><br></br>
                                        <Typography style = {{fontSize: "15px"}}>IMDB Rating: {movieData.imdbRating}</Typography>
                                        <Typography style = {{fontSize: "15px"}}>Runtime: {movieData.Runtime}</Typography>
                                        <Typography style = {{fontSize: "15px"}}>Genre: {movieData.Genre}</Typography>
                                        <Typography style = {{fontSize: "15px"}}>Director: {movieData.Director}</Typography>
                                        <Typography style = {{fontSize: "15px"}}>Country: {movieData.Country}</Typography><br></br>
                                        <Typography style = {{fontSize: "12px"}}>{movieData.Plot}</Typography>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                }
            </div>
            <div style = {{position: "absolute", bottom: "22rem", left: '42rem'}}>
                <Button onClick={goBack} style={{backgroundColor: "black", color: "white", width: '15rem'}}>View Similar</Button>
            </div>
        </div>
    )
}

export default MovieDetails
