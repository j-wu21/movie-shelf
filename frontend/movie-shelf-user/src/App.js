import React, { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Movie from './components/Movie';
import { TextField } from '@mui/material';


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';




const App = () => {

  const [inputValue, setInputValue] = useState('');
  const originalPlaceHolderMessage = 'Put stuff in me';
  const [placeholderValue, setPlaceholderValue] = useState(originalPlaceHolderMessage);
  const [actor, setActor] = useState('No One');
  const [input, setInput] = useState('');
  const [movieArray, setMovieArray] = useState([])   
 
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const newImages = await Promise.all(movieArray.map(async (movie, index) => {
        try {
          const response = await fetch(`https://api.unsplash.com/search/photos?query=${movie.title}&client_id=ACCESS_API_KEY`);
          const data = await response.json();
          return data.results[0]?.urls?.small || ''; // Fallback to an empty string if no image is found
        } catch (error) {
          console.error('Error fetching image:', error);
          return '';
        }
      }));
      setImages(newImages);
    };

    if (movieArray.length > 0) {
      fetchImages();
    }
 }, [movieArray]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newMovie = {
      title: event.target.title.value,
      actor: event.target.actor.value,
      year: event.target.year.value
    }
    

      const movieExists = movieArray.some(movie => movie.title === newMovie.title 
          && movie.actor === newMovie.actor
          && movie.year === newMovie.year);
      if (!movieExists) {
     
      setMovieArray([...movieArray, newMovie]);}
      else{
        alert('This exact submission is already in here')
      }
    };

 const handleDelete = (index) => {
  const newMovieArray = [...movieArray];
  newMovieArray.splice(index, 1);
  setMovieArray(newMovieArray);
  console.log('Did it delete?');
};

const ImageFetcher = () => {
  const [imageUrl, setImageUrl] = useState('');}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

  return (
    <div>
      
  
      <TextField 
        value={input} 
        onKeyDown={(event) => {
          if (event.key == 'Enter')
          setActor(input)
        }}
        onChange={(event) => {setInput(event.target.value)}}>

      </TextField>
      <Button variant= "outlined"
              onClick= {() => {setActor(input)}}>
        Set Actor Name
        
      </Button>
      <Movie 
        title='Dune' 
        actor={actor}
        />
       
        <input style={{marginTop: '24px'}}
            type='text' 
            placeholder={placeholderValue}
            value={inputValue} 
            onChange={(event)=>{
             
             setInputValue(event.target.value)
          }} >

          </input>
          <button>Don't Do Nothing</button>

  
    <form onSubmit={handleSubmit}>
        <input name="title" style={{marginTop: '24px'}} placeholder="Title" required />
        <input name="actor"  placeholder="Actor" required />
        <input name="year"  placeholder="Year" required />
        <button type="submit">Add Card</button>
      </form>

    {movieArray.map((card, index) => (
        <Card key={index} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography variant="body2">
              Actor: {card.actor}
            </Typography>
            <Typography variant="body2">
              Year: {card.year}
            </Typography>
            {images[index] && <img src={images[index]} alt={`${card.title} poster`} style={{ width: 100, height: 200 }} />}
          </CardContent>
          <CardActions>
            <Button size="small"onClick={() => handleDelete(index)}>Delete</Button>
          </CardActions>
        </Card>
    ))}
    

    {/* <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          benev{}o{}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} xcolor="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"
          onClick={(event)=>{
            console.log(movieArray);}}>Learn More</Button>
      </CardActions>
    </Card> */}
    </div>

    
  );
};
  
export default App;
