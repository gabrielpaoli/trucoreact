import Grid from '@mui/material/Grid';

const BoardCards = (props) => {
  
    return (
      <div className='boardCards'>
        <Grid container>
          {
            props.player.cards.map((card) => (
            <Grid key={card.id} xs={4} lg={4} item sx={{ p: 2 }}>
        
              <img 
                className={((props.player.playedCards.includes(card)) && 'difuminate ') + card.id + ' cardImage'}
                src={process.env.PUBLIC_URL+'/images/deck/'+card.id+'.png'} alt="React Logo" 
                onClick={() => (props.player.id === props.handData.turn.id) && props.playCard(card, props.player)}
              />

            </Grid>

            ))
          }
        </Grid>
      </div>

    );
  
  };
      
  export default BoardCards;