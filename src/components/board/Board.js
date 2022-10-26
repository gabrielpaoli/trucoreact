import BoardCards from '../boardCards/BoardCards';

const Board = (props) => {

    return (
      <div>
        <div className="board">
            {props.gameData.map((todo) => (
							<BoardCards 
								id={todo.id}
								cards={todo.cards}
							/>
            ))}
        </div>
      </div>
    );
  
  };
      
  export default Board;