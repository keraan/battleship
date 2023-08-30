import { useEffect, useState, useReducer } from "react";
import '../styles/main.css'
import Board from "./Board";
import Hud from "./Hud";
import { SHIPS } from "../types/Ships";
import { DIRECTION } from "../types/directions";
import { Bot } from "./Bot";

import Game from "./Game";
import Ship from "./Ship";
type ShipType = 'carrier' | 'battleship' | 'destroyer' | 'submarine' | 'patrolBoat';


export default function Main() {
    const [game] = useState<Game>(new Game())
    const [remainingShips, setRemainingShips] = useState<ShipType[]>(['carrier', 'battleship', 'destroyer', 'submarine', 'patrolBoat']);
    const [currentShip, setCurrentShip] = useState<Ship | null>(new Ship(1, 5, 0, false))
    const [isPlacementPhase, setIsPlacementPhase] = useState(true)
    const [currentDirection, setCurrentDirection] = useState(DIRECTION.DOWN)
    const [hudContent, setHudContent] = useState("")
    const [botPlacedShips, setBotPlacedShips] = useState(false)

    // useState(() => {
    //     // Currently hardcoded enemy ships.
    //     // const ss1 = new Ship(1, 5, 0, false)
    //     // const ss2 = new Ship(2, 2, 0, false)
    //     // const ss3 = new Ship(3, 3, 0, false)
    //     // const ss4 = new Ship(4, 1, 0, false)
    //     // const ss5 = new Ship(5, 1, 0, false)
    //     // game.getBoardTwo().placeShip(ss1, 0, 0, DIRECTION.RIGHT)
    //     // game.getBoardTwo().placeShip(ss2, 1, 0, DIRECTION.RIGHT)
    //     // game.getBoardTwo().placeShip(ss3, 2, 0, DIRECTION.RIGHT)
    //     // game.getBoardTwo().placeShip(ss4, 3, 0, DIRECTION.RIGHT)
    //     // game.getBoardTwo().placeShip(ss5, 4, 0, DIRECTION.RIGHT)
    //     const bot = game.getPlayerOne() as Bot;
    //     bot.placeShipsRandomly()
    // })

    useEffect(() => {
        if (!botPlacedShips) {
            setBotPlacedShips(true)
            const bot = game.getPlayerTwo() as Bot;
            bot.placeShipsRandomly();
        }
        // console.log("Type of object returned by getPlayerOne:", typeof game.getPlayerOne());
        // console.log("Object returned by getPlayerOne:", game.getPlayerOne());
        // console.log("Is bot an instance of Bot class?", bot instanceof Bot);
        // console.log("Does the method exist?", typeof bot.placeShipsRandomly === 'function');
        // if (bot instanceof Bot && typeof bot.placeShipsRandomly === 'function') {
        //     bot.placeShipsRandomly();
        // }
    }, []); 

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
                setIsPlacementPhase(false);
                return;
            }
            
            if (game.getBoardOne().placeShip(currentShip, row, col, currentDirection)) {
                setRemainingShips(prevShips => prevShips.slice(1));
                setHudContent("")
            } else {
                setHudContent("Invalid placement. Ensure ships are not overlapping!")
            }
            return;
        }

        if (game.gameOver()) {
            return
        }
        
        if (game.getTurn() === playerId && !isPlacementPhase) {
            if (game.isValidAttack(row, col)) {
                game.startTurn(row, col);
                game.switchTurn();
            }
        }
        forceUpdate();
    }



    function handleRightClick (e: any) {
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
            <Hud game={game} isPlacementPhase={isPlacementPhase} content={hudContent}/>
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
            <div className="info-bar">
                <div className="info">
                    Your Board
                </div>
                <div className="info">
                    Opponent's Board
                </div>
            </div>
        </main>
    )
}