import store from 'store'
import { useState, useEffect } from 'react'
import { Box, Chip, InputLabel, MenuItem, FormControl, OutlinedInput, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(category, categories, theme) {
  return {
    fontWeight:
    categories.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Filter() {

  const theme = useTheme();
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [initialCategories, setInitialCategories] = useState([]);

  store.subscribe(() => setMovies(store.getState().movies));

  useEffect(() => {
    const newCategories = [];
    movies.forEach(movie => newCategories.some(category => category === movie.category)? '' : newCategories.push(movie.category));
    setInitialCategories(newCategories);
  }, [movies]);

  const handleChange = (event) => {
    const { target: { value } } = event;
    setCategories(value);
    store.dispatch({type: 'UPDATE_MOVIES', payload: movies.map(movie => ({...movie, hide: !(value.some(category => movie.category === category))}) )})
  };
  return (
    <div>
      <FormControl sx={{ my: 4, width: '100%' }}>
        <InputLabel style={{ color: 'white' }}>Category</InputLabel>
        <Select
          multiple
          value={categories}
          onChange={handleChange}
          input={<OutlinedInput style={{ borderColor: 'white' }} label="Category"/>}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.filter(value => initialCategories.some(category => category === value)).map((value) => (
                <Chip key={value} label={value} style={{color: 'white', background: 'rgba(0,0,0,.3)'}} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          sx={{ color: 'white', borderColor: 'white' }}
        >
          {initialCategories.map(category => (
            <MenuItem
              key={category}
              value={category}
              style={getStyles(category, categories, theme)}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Filter;