import store from 'store'
import { connect } from 'react-redux'
import { Button, Stack, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

function Paging({movies, page}) {

  const handleChange = (event) => {
    const { target: { value } } = event;
    store.dispatch({type: 'UPDATE_PAGE', payload: {items: value, index: 1}});
  };

  const updatePageIndex = index => {
    store.dispatch({type: 'UPDATE_PAGE', payload: {items: page.items, index}});
  };

  return (
    <Box className='pagging' sx={{ mt: 4, display: 'flex' }}>
      <FormControl fullWidth>
        <InputLabel style={{ color: 'white' }}>Per page</InputLabel>
        <Select
          value={page.items}
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
        <Button onClick={() => updatePageIndex(page.index - 1)} disabled={page.index === 1} variant="outlined">Previous</Button>
        <Button onClick={() => updatePageIndex(page.index + 1)} disabled={(page.items * page.index) >= movies.filter(movie => !movie.hide).length} variant="contained">Next</Button>
      </Stack>
    </Box>
  );
}

const connectedPage = connect(({movies, page}) => ({movies, page}))(Paging);
export default connectedPage;