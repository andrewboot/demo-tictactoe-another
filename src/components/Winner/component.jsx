import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  z-index: 3;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`

const Internal = styled.div`
  display: flex;
  flex-flow: row nowrap;
  jusitfy-content: center;
  align-content: center;
  background: #FFF;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.4);
  border-radius: 5px;
  padding: 50px 70px;
  font-size: 35px;
`

const Winner = ({ winner }) => {
  if (!winner) return null

  return (
    <Container>
      <Internal>
        {
          winner === 'computer'
            ? 'Computer Wins!'
            : winner === 'player'
              ? 'Player Wins!'
              : 'Draw!'
        }
      </Internal>
    </Container>
  );
}

export default Winner
