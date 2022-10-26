import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const BoardCards = (props) => {
  
    return (
        <div className="boardCards">
        
        <Grid container spacing={2}>
          {
            props.player.cards.map((card) => (
            <Grid key={card.id} item>

              <Paper
                className={card.id}
                onClick={() => (props.player.id === props.handData.turn.id) && props.playCard(card, props.player)}
                disabled={true} 
                sx={{
                  height: 140,
                  width: 100,
                  backgroundImage: `url(${process.env.PUBLIC_URL}/images/deck/`+ card.id + `.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </Grid>

            ))
          }
        </Grid>

        </div>
    );
  
  };
      
  export default BoardCards;