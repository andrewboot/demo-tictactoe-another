import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  border-top-left-radius: 3px;
  box-shadow: 1px -1px 2px 0px rgba(0,0,0,0.3);
  background: darkgreen;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 6px 10px;
  color: white;
  font-size: 18px;
`

const Text = styled.div`
  &:first-child {
    margin-right: 10px;
  }
`

const UserScore = styled.span`
  font-weight: 700;
`

const Score = ({
  computerScore,
  playerScore
}) => (
  <Container>
    <Text>Computer: <UserScore>{computerScore}</UserScore></Text>
    <Text>Player: <UserScore>{playerScore}</UserScore></Text>
  </Container>
)

export default Score;
