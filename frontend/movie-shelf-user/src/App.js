import React, { useState } from 'react';
import Button from '@mui/material/Button'
import Movie from './components/Movie';
import { TextField } from '@mui/material';

const App = () => {
  const [heyCount, setheyCount] = useState(0);
  const [actor, setActor] = useState('No One');
  const [input, setInput] = useState('');
  const [movieArray, setMovieArray] = useState([
    {
      title: '',
      actor: '',
      heyCount: ''
    },
    {
      title: '',
      actor: '',
      heyCount: ''
    }
  ])

  function logWhenClicked(){
    setheyCount(heyCount+1);
    console.log('hey there ' + heyCount );
  }
  return (
    <div>
      <Button 
        onClick={logWhenClicked} 
        variant = "outlined">
          ButtOn
      </Button>
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
        movieCount = {heyCount} />
    </div>
  )
};

export default App;
