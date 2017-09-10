import React, { Component } from 'react'
import styled from 'styled-components'
import AskForSign from '../AskForSign'
import Board from '../Board'
import Winner from '../Winner'
import Score from '../Score'

const Container = styled.main`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  background-color: seagreen;
  width: 100%;
  height: 100vh;
`

class Root extends Component {
  state = {
    computerSign: '' /* X OR O */,
    playerSign: '' /* X OR O */,
    winner: false /* false OR ('computer' OR 'player') */,
    current: false /* false OR ('computer' OR 'player') */,
    board: [
      '', '', '',
      '', '', '',
      '', '', ''
    ],
    computerScore: 0,
    playerScore: 0,
  };

  render() {
    const {
      playerSign, winner, current, board, computerScore, playerScore
    } = this.state;

    return (
      <Container>
        <AskForSign chooseSign={this.chooseSign} playerSign={playerSign} />
        <Board
          board={board}
          current={current}
          playerSign={playerSign}
          onCellClick={this.onCellClick}
        />
        <Winner winner={winner} />
        <Score computerScore={computerScore} playerScore={playerScore} />
      </Container>
    );
  }

  chooseSign = (sign) => {
    const current = (Math.random() * 10) > 5 ? 'player' : 'computer';

    this.setState(() => ({
      playerSign: sign,
      computerSign: sign === 'X' ? 'O' : 'X',
      current
    }), () => {
      if (current === 'computer') {
        this.computerMove();
      }
    })
  }

  onCellClick = (i) => {
    console.log(`Player clicked on cell with ${i} index`)

    this.setState((prevState) => {
      const newBoard = prevState.board
      newBoard[i] = prevState.playerSign
      return ({
        board: newBoard,
        current: 'computer'
      });
    }, () => {

      const winner = this.checkWinner()
      if (!winner) {
        setTimeout(() => {
          this.computerMove()
        }, 500);
      } else {
        this.win(winner)
      }

    })
  }

  computerMove = () => {

    const freeCellsIndexes =
      this.state.board
        .map((cell, i) => ({
          index: i,
          content: cell
        }))
        .filter(cellByIndex => !cellByIndex.content)
        .map(c => c.index)

    const randomMove = freeCellsIndexes[Math.floor(Math.random() * freeCellsIndexes.length)]

    this.setState((prevState) => {
      const newBoard = prevState.board
      newBoard[randomMove] = prevState.computerSign
      return ({
        board: newBoard,
        current: 'player'
      })
    }, () => {
      const winner = this.checkWinner()
      if (winner) this.win(winner)
    })
  }

  restartGame = () => {
    this.setState({
      computerSign: '',
      playerSign: '',
      winner: false,
      current: false,
      board: [
        '', '', '',
        '', '', '',
        '', '', ''
      ]
    })
  }

  checkWinner = () => {
    const isUserWon = (occur) => {
      let result = false;
      const winningOccurrencies = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]
      winningOccurrencies.forEach((winningCase) => {
        if (winningCase.every(el => occur.includes(el))) result = true
      })
      return result;
    }

    const findOccurrencies = (user) => {
      const userSign = this.state[`${user}Sign`];
      const sortedUserSignIndexes =
        this.state.board
          .map((cell, i) => ({
            index: i,
            content: cell
          }))
          .filter(cellByIndex => cellByIndex.content === userSign)
          .map(c => c.index)
          .sort((a, b) => a - b)
      return sortedUserSignIndexes;
    }

    const playerOccurrencies = findOccurrencies('player');
    const computerOccurrencies = findOccurrencies('computer');

    if (isUserWon(playerOccurrencies)) {
      return 'player';
    } else if (isUserWon(computerOccurrencies)) {
      return 'computer';
    } else if (this.state.board.filter(e => e === '').length === 0) {
      return 'draw';
    }

    return false;
  }

  win = (user) => {
    this.setState(prevState => ({
      winner: user,
      [`${user}Score`]: prevState[`${user}Score`] + 1
    }), () => {
      setTimeout(() => {
        this.restartGame()
      }, 2000);
    })
  }

  autowin = () => {
    setTimeout(() => {
      this.chooseSign('X')
      this.setState({
        winner: 'computer'
      })
      setTimeout(() => {
        this.restartGame()
      }, 2000)
    }, 1000)
  }
}


export default Root
