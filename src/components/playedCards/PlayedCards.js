import Grid from '@mui/material/Grid';


const PlayedCards = (props) => {

    return (
      <div className='playedCards'>
        <Grid container>
        {
          props.player.playedCards.map((card) => (

            <Grid key={card.id} xs={4} lg={4} item sx={{ p: 2 }}>
            <img 
              className='cardImage'
              src={process.env.PUBLIC_URL+'/images/deck/'+card.id+'.png'} alt="React Logo" 
            />
          </Grid>

          ))
        }
      </Grid>
    </div>


    );
  
  };
      
  export default PlayedCards;