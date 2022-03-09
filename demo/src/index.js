import React from 'react';
import { render } from 'react-dom';
import styled, { css } from 'styled-components';

import Anvas from './library/common/Anvas/Anvas';
import AnvasII from './library/common/Anvas/AnvasII';

const App = () => {
  const CanvasContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
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
  `;

  return (
    <div>
      <hr style={{ margin: '5rem' }} />

      <main>
        <header>
          <h1
            style={{
              fontSize: '3.2rem',
              fontWeight: 'lighter',
              color: 'darkblue',
            }}
          >
            <em>Handwritten Character Recognition Calculator</em>
          </h1>
        </header>
        <hr />

        <h2
          style={{
            fontSize: '2.2rem',
            color: 'lightslategray',
            fontWeight: 'lighter',
          }}
        >
          Draw on canvas
        </h2>
        {/* row 1st */}

        <CanvasContainer>
          <CanvasContainer>
            <Anvas />
          </CanvasContainer>
        </CanvasContainer>
      </main>
      <hr style={{ margin: '5rem' }} />
      <main
        style={{
          marginTop: '5rem',
        }}
      >
        {/* row 1st */}

        <CanvasContainer>
          <CanvasContainer>
            <AnvasII />
          </CanvasContainer>
        </CanvasContainer>
      </main>
      <hr style={{ margin: '5rem' }} />
    </div>
  );
};

render(<App />, document.querySelector('#demo'));
