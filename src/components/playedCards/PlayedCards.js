import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


const PlayedCards = (props) => {

    return (
        <div className="playedCards">

          <Grid container spacing={2}>
          {
            props.player.playedCards.map((card) => (

            <Grid key={card.id} item>
              <Paper
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
      
  export default PlayedCards;