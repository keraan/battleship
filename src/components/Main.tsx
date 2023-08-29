import { useEffect, useState, useReducer } from "react";
import '../styles/main.css'
import Board from "./Board";
import Hud from "./Hud";
import { SHIPS } from "../types/Ships";
import { DIRECTION } from "../types/directions";
import { Bot } from "./Bot";

import Game from "./Game";
// import Controls from "./Controls";
import Ship from "./Ship";
type ShipType = 'carrier' | 'battleship' | 'destroyer' | 'submarine' | 'patrolBoat';


export default function Main() {
    const [game] = useState<Game>(new Game())
    const [remainingShips, setRemainingShips] = useState<ShipType[]>(['carrier', 'battleship', 'destroyer', 'submarine', 'patrolBoat']);
    const [currentShip, setCurrentShip] = useState<Ship | null>(new Ship(1, 5, 0, false))
    const [isPlacementPhase, setIsPlacementPhase] = useState(true)
    const [currentDirection, setCurrentDirection] = useState(DIRECTION.DOWN)

    useState(() => {
        

        const ss1 = new Ship(1, 5, 0, false)
        const ss2 = new Ship(2, 2, 0, false)
        const ss3 = new Ship(3, 3, 0, false)
        const ss4 = new Ship(4, 1, 0, false)
        const ss5 = new Ship(5, 1, 0, false)
        game.getBoardTwo().placeShip(ss1, 0, 0, DIRECTION.RIGHT)
        game.getBoardTwo().placeShip(ss2, 1, 0, DIRECTION.RIGHT)
        game.getBoardTwo().placeShip(ss3, 2, 0, DIRECTION.RIGHT)
        game.getBoardTwo().placeShip(ss4, 3, 0, DIRECTION.RIGHT)
        game.getBoardTwo().placeShip(ss5, 4, 0, DIRECTION.RIGHT)
    })

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    useEffect(() => {
        // When remainingShips changes, update currentShip
        if (remainingShips.length > 0) {
            const nextShipType = remainingShips[0];
            const shipInfo = SHIPS[nextShipType];
            const ship = new Ship(shipInfo.shipID, shipInfo.length, 0, false);
            setCurrentShip(ship);
        } else {
            setCurrentShip(null);
        }
    }, [remainingShips]);

    useEffect(() => {
        if (game.getTurn() === game.getPlayerTwo().getId()) {
            if (game.getPlayerTwo() instanceof Bot) {
                const bot = game.getPlayerTwo() as Bot;
                bot.getMove().then(({ row, col }) => {
                    handleNextTurn(row, col, bot.getId());
                });
            }
        }
    }, [game.getTurn()]);


    function handleNextTurn(row: number, col: number, playerId: number) {
        if (isPlacementPhase) {
            if (!currentShip) {
                setIsPlacementPhase(false)
                return
            }
            while (game.getBoardOne().placeShip(currentShip, row, col, currentDirection))
            // Set logic for placing ship

            setRemainingShips(prevShips => prevShips.slice(1))
            return
        }
        
        if (game.getTurn() !== playerId) {
            return
        }
        if (!game.gameOver()) {
            if (game.isValidAttack(row, col)) {
                game.startTurn(row, col)
                game.switchTurn()
            }
            forceUpdate(); // This will force a re-render
        } else {
            console.log("gameover?!")
        }
    }



    const handleRightClick = (e: any) => {
        e.preventDefault();
        currentDirection === DIRECTION.RIGHT ? 
            setCurrentDirection(DIRECTION.DOWN) : 
            setCurrentDirection(DIRECTION.RIGHT);
        forceUpdate()
    };
    
    useEffect(() => {
        // Add the event listener when the component mounts
        window.addEventListener('contextmenu', handleRightClick);
    
        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('contextmenu', handleRightClick);
        };
    }, [currentDirection, setCurrentDirection]); 


    return (
        <main className="main">
            <Hud game={game} isPlacementPhase={isPlacementPhase}/>
            <div className="boards">
                <Board 
                    handleNextTurn={handleNextTurn} 
                    player={game.getPlayerOne()} 
                    turn={game.getTurn()}
                    isPlacementPhase={isPlacementPhase}
                    currentShip={currentShip}
                    currentDirection={currentDirection}
                />
                <Board 
                    handleNextTurn={handleNextTurn} 
                    player={game.getPlayerTwo()} 
                    turn={game.getTurn()}
                    isPlacementPhase={isPlacementPhase}
                    currentShip={currentShip}
                    currentDirection={currentDirection}
                />
            </div>
            {/* <Controls game={game} handleNextTurn={handleNextTurn}/> */}

        </main>
    )
}