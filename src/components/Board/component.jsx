import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  min-width: 600px;
  width: 600px;
  min-height: 600px;
  height: 600px;
  display: flex;
  flex-flow: row wrap;
  jusitfy-content: center;
  align-content: center;
  background: #FFF;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.4);
  border-radius: 5px;
`

const Cell = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-flow: row nowrap;
  jusitfy-content: center;
  align-items: center;
  text-align: center;
  font-size: 80px;
  font-weight: 700;
  color: tomato;

  &:nth-child(-n+6) {
    border-bottom: 1px solid seagreen;
  }

  &:nth-child(1), &:nth-child(2),
  &:nth-child(4), &:nth-child(5),
  &:nth-child(7), &:nth-child(8) {
    border-right: 1px solid seagreen;
  }

  &:not([data-disabled=true]):hover {
    cursor: pointer;
  }

  &[data-user=true] {
    color: seagreen;
  }
`

const CellSign = styled.span`
  display: block;
  margin: 0 auto;
`;

const Board = ({
  board,
  current,
  playerSign,
  onCellClick,
}) => (
  <Container>
    {
      /* board && Array.isArray(board) && board.length > 0 && */
      board.map((cell, i) => {
        const onClick = cell.length > 0
          ? () => null
          : current !== 'player'
            ? () => null
            : () => { onCellClick(i) }

        return (
          <Cell
            key={i}
            onClick={onClick}
            data-disabled={cell.length > 0}
            data-user={cell === playerSign}
          ><CellSign>{cell}</CellSign></Cell>
        );
      })
    }
  </Container>
)

export default Board
