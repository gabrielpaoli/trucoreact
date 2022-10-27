import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


const CommandControl = (props) => {
  
    return (
        <div className="commandControl">
        
        <Grid container>

						<Grid container>					
							<Grid item xs={3} sx={{ p: 0.5 }}>
								<Button disabled={props.player.playedCards.length >= 1} color="success" variant="contained" onClick={() => props.cantarEnvido(props.player)}>Envido</Button>
							</Grid>						
							<Grid item xs={3} sx={{ p: 0.5 }}>
								<Button disabled={props.player.playedCards.length >= 1} color="success" variant="contained" onClick={() => props.cantarRealEnvido()}>Real envido</Button>
							</Grid>						
							<Grid item xs={3} sx={{ p: 0.5 }}>
								<Button disabled={props.player.playedCards.length >= 1} color="success" variant="contained" onClick={() => props.cantarFaltaEnvido()}>Falta envido</Button>
							</Grid>					
							<Grid item xs={3} sx={{ p: 0.5 }}>
								<Button disabled={props.player.playedCards.length >= 1} color="success" variant="contained" onClick={() => props.cantarFlor()}>Flor</Button>
							</Grid>		
						</Grid>	

						<Grid container>			
							<Grid item xs={4} sx={{ p: 0.5 }}>
								<Button color="success" variant="contained">Truco</Button>
							</Grid>						
							<Grid item xs={4} sx={{ p: 0.5 }}>
								<Button color="success" variant="contained">Quiero retruco</Button>
							</Grid>						
							<Grid item xs={4} sx={{ p: 0.5 }}>
								<Button color="success" variant="contained">Quiero vale cuatro</Button>
							</Grid>		
						</Grid>	

						<Grid container>
							<Grid item xs={6} sx={{ p: 0.5 }}>
								<Button color="success" variant="contained">Quiero</Button>
							</Grid>
							<Grid item xs={6} sx={{ p: 0.5 }}>
								<Button color="error" variant="contained">No quiero</Button>
							</Grid>
						</Grid>	
						
        </Grid>

        </div>
    );
  
  };
      
  export default CommandControl;