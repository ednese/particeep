import store from 'store'
import { useState } from 'react'
import { Button, Stack, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

function Paging() {
  const [movies, setMovies] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(12);

  const handleChange = (event) => {
    const { target: { value } } = event;
    setPageIndex(1);
    setitemsPerPage(value);
    store.dispatch({type: 'UPDATE_PAGE', payload: {items: value, index: 1}});
  };

  const updatePageIndex = index => {
    setPageIndex(index);
    store.dispatch({type: 'UPDATE_PAGE', payload: {items: itemsPerPage, index}});
  };

  store.subscribe(() => setMovies(store.getState().movies));
  return (
    <Box className='pagging' sx={{ mt: 4, display: 'flex' }}>
      <FormControl fullWidth>
        <InputLabel style={{ color: 'white' }}>Per page</InputLabel>
        <Select
          value={itemsPerPage}
          label="Per page"
          style={{color: 'white', width: 120 }}
          onChange={handleChange}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
      </FormControl>
      <Stack sx={{ mt: 2 }} spacing={2} direction="row">
        <Button onClick={() => updatePageIndex(pageIndex - 1)} disabled={pageIndex === 1} variant="outlined">Previous</Button>
        <Button onClick={() => updatePageIndex(pageIndex + 1)} disabled={(itemsPerPage * pageIndex) >= movies.filter(movie => !movie.hide).length} variant="contained">Next</Button>
      </Stack>
    </Box>
  );
}

export default Paging;