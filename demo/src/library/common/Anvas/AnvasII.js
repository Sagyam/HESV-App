import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import CanvasDraw from '../../../../../src';
import './index.css';
import GraphII from '../GraphII';

const WholeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 1213px) {
    flex-direction: column-reverse;
  }
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
  font-family: sans-serif;
`;

const DownloadLink = styled.a`
  font-size: 1.6rem;
  font-family: sans-serif;
  color: #fff;
  background-color: #000;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  display: inline-block;
  margin-top: 1rem;
`;

const Button = styled.button`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 0.5em 1em;
  margin: 0.5em;
  font-size: 1.6rem;
  font-family: sans-serif;
  cursor: pointer;

  ${(props) =>
    props.primary &&
    css`
      background: #f00;
      color: #fff;

      &:hover {
        background: #fff;
        color: #f00;
      }
    `}

  ${(props) =>
    props.secondary &&
    css`
      background: orange;
      color: #fff;
      &:hover {
        background: #fff;
        color: orange;
      }
    `}
    ${(props) =>
    props.tertiary &&
    css`
      background: green;
      color: #fff;
      &:hover {
        background: #fff;
        color: green;
      }
    `}
    ${(props) =>
    props.ghost &&
    css`
      background: black;
      color: #fff;

      &:hover {
        background: white;
        color: black;
        border: 1px solid black;
      }
    `}
`;

const UpperDivision = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    .upper__division__left,
    .upper__division__right {
      width: 100%;
    }
  }

  .upper__division__left,
  .upper__division__right {
    padding: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    input {
      height: 3.5rem;
      margin: 0.75rem;
      outline: none;
      padding: 0.25rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      font-size: 1.6rem;
      font-family: sans-serif;
      width: 100%;
      &:focus {
        border: 1px solid #000;
      }
    }
  }
`;

class AnvasII extends Component {
  state = {
    downloadLink: '',
    color: 'black',
    height: 250,
    brushRadius: 3,
    lazyRadius: 6,
    backgroundImg:
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg',
    imgs: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a1/Nepalese_Mhapuja_Mandala.jpg',
      'https://i.imgur.com/a0CGGVC.jpg',
    ],
  };

  render() {
    return (
      <WholeContainer>
        <div
          className="canvas-container"
          style={{
            background: 'white',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            width: '100%',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          }}
        >
          <UpperDivision className="upper__division">
            <div
              className="upper__division__left"
              style={{
                borderBottom: '1px solid #ccc',
                borderRight: '1px solid #ccc',
              }}
            >
              <header>
                <h1>Draw A Polynomial Equation</h1>
              </header>
              <input className="left__eqnField" type="text" />
              <div
                style={{
                  display: 'flex',
                }}
              >
                <input className="left__eqnField" type="text" />
                <input className="left__eqnField" type="text" />
              </div>
            </div>
          </UpperDivision>
          <div className="lower__divison">
            <div className="btn__container">
              <Button
                primary
                onClick={() => {
                  this.saveableCanvas.eraseAll();
                }}
              >
                Erase
              </Button>
              <Button ghost>Send</Button>
              <Button tertiary>Solve</Button>
            </div>
            <CanvasDraw
              style={{ borderRadius: '10px', width: '100%' }}
              ref={(canvasDraw) => (this.saveableCanvas = canvasDraw)}
              brushColor={this.state.color}
              brushRadius={this.state.brushRadius}
              lazyRadius={this.state.lazyRadius}
              canvasWidth={this.state.width}
              canvasHeight={this.state.height}
              onChange={() => {
                this.setState({
                  downloadLink: this.saveableCanvas.getDataURL(),
                });
              }}
            />
          </div>
        </div>
        <GraphII></GraphII>
      </WholeContainer>
    );
  }
}

export default AnvasII;
