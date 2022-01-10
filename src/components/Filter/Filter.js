import store from 'store'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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

function Filter({movies, categories}) {

  const theme = useTheme();
  const [initialCategories, setInitialCategories] = useState([]);

  useEffect(() => {
    const newCategories = [];
    movies.forEach(movie => newCategories.includes(movie.category)? '' : newCategories.push(movie.category));
    store.dispatch({type: 'UPDATE_CATEGORIES', payload: newCategories });
    setInitialCategories(newCategories);
  }, [movies]);

  const handleChange = (event) => {
    store.dispatch({type: 'UPDATE_CATEGORIES', payload: event.target.value })
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
              {selected.filter(value => initialCategories.includes(value)).map((value) => (
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

const connectedFilter = connect(({movies, categories}) => ({movies, categories}))(Filter);
export default connectedFilter;