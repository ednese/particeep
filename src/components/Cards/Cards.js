import { useState } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import './Cards.css';
import { Box, Grid, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ThumbUp, ThumbDown, Close } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgba(0,0,0,0.4)',
  backdropFilter: 'blur(40px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

function Cards({movies, page, categories}) {
  const [userLikesId, setUserLikesId] = useState([]);
  const [userDisikesId, setUserDisikesId] = useState([]);

  const handleOpinion = (type, id) => {
    if (type === 'likes') {
      if (userLikesId.some(likeId => likeId === id)) {
        setUserLikesId(userLikesId.filter(likeId => likeId !== id));
      } else {
        setUserLikesId([...userLikesId, id]);
        setUserDisikesId(userDisikesId.filter(dislikeId => dislikeId !== id));
      }
    } else if (type === 'dislikes') {
      if (userDisikesId.some(dislikeId => dislikeId === id)) {
        setUserDisikesId(userDisikesId.filter(dislikesId => dislikesId !== id))
      } else {
        setUserDisikesId([...userDisikesId, id]);
        setUserLikesId(userLikesId.filter(likesId => likesId !== id));
      }
    }
  }

  const setRatioStyle = ({likes, dislikes, id}) => {
    const userLikes = (userLikesId.some(likeId => likeId === id) ? 1 : 0) + likes;
    const userDislikes = (userDisikesId.some(dislikeId => dislikeId === id) ? 1 : 0) + dislikes;
    const ratio = (userLikes / (userLikes + userDislikes)) * 100;
    return {background: `linear-gradient(90deg, #fff ${ratio}%, #000 ${ratio}%)`}
  }

  const updateMoviesList = id => {
    store.dispatch({type: 'UPDATE_MOVIES', payload: movies.filter(movie => movie.id !== id)})
  }

  return (
    <div className="cards">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {movies.filter(movie => categories.includes(movie.category)).filter((_, index) => index >= (page.items * (page.index - 1)) && index < (page.items * page.index)).map(movie => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={movie.id} >
              <Item className="cards__card">
                <p>{movie.category}</p>
                <h2>{movie.title}</h2>
                <div>
                  <IconButton className="cards__card__close" color='inherit' onClick={() => updateMoviesList(movie.id)}>
                    <Close/>
                  </IconButton>
                  <IconButton color='inherit' onClick={() => handleOpinion('likes', movie.id)} >
                    <ThumbUp color={userLikesId.some(likeId => likeId === movie.id) ? '' : 'disabled'}/>
                  </IconButton>
                  {movie.likes + (userLikesId.some(likeId => likeId === movie.id) ? 1 : 0)}
                  <IconButton color='inherit' onClick={() => handleOpinion('dislikes', movie.id)} >
                    <ThumbDown color={userDisikesId.some(dislikesId => dislikesId === movie.id) ? '' : 'disabled'}/>
                  </IconButton>
                  {movie.dislikes + (userDisikesId.some(dislikesId => dislikesId === movie.id) ? 1 : 0)}
                  <div className="cards__card__ratio" style={setRatioStyle(movie)} />
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

const connectedCards = connect(({movies, page, categories}) => ({movies, page, categories}))(Cards);
export default connectedCards;