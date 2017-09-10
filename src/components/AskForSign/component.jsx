import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 0; bottom: 0; left: 0; right: 0;
  z-index: 2;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`

const Internal = styled.div`
  min-width: 500px;
  display: flex;
  flex-flow: column nowrap;
  jusitfy-content: center;
  align-content: center;
  background: #FFF;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.4);
  border-radius: 5px;
  padding: 50px 70px;
`

const Text = styled.h2`
  font-size: 25px;
  font-weight: normal;
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
  color: dimgray;

  &[data-success=true] {
    color: seagreen;
  }
`

const Signs = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  padding: 20px 50px;
`

const Sign = styled.button`
  border: none;
  padding: 20px 30px;
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.3);
  border-radius: 3px;
  background: #dcd0d0;
  color: #488168;
  font-size: 25px;
  font-weight: 700;
  transition: background .3s ease, color .3s ease;

  &[data-this=true] {
    background: #488168;
    color: #dcd0d0;
  }

  &:not(:disabled):hover {
    cursor: pointer;
  }
`

class AskForSign extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chosenSign: false
    }
    this._chooseSign = this._chooseSign.bind(this)
  }

  _chooseSign(sign) {
    const { chooseSign } = this.props;
    this.setState({ chosenSign: sign });

    setTimeout(() => {
      chooseSign(sign);
      this.setState({ chosenSign: false });
    }, 1000);
  }

  render() {
    if (this.props.playerSign) return null;
    const { chosenSign } = this.state;
    return (
      <Container>
        <Internal>
          <Text data-success={Boolean(chosenSign)}>
            {
              chosenSign
                ? `Thank you. You've chosen ${chosenSign}`
                : 'Please, choose your sign'
            }
          </Text>
          <Signs>
            <Sign
              onClick={chosenSign ? () => null : () => { this._chooseSign('O') }}
              disabled={Boolean(chosenSign)}
              data-this={chosenSign === 'O'}
            >O</Sign>
            <Sign
              onClick={chosenSign ? () => null : () => { this._chooseSign('X') }}
              disabled={Boolean(chosenSign)}
              data-this={chosenSign === 'X'}
            >X</Sign>
          </Signs>
        </Internal>
      </Container>
    );
  }
}

export default AskForSign
