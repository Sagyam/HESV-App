import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import CanvasDraw from '../../../../../src';
import './index.css';
import Graph from '../Graph';
import myImg from '../../../myimg.jpeg';
import axios from 'axios';

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

class Anvas extends Component {
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

    x: 0,
    y: 0,
    z: 0,
  };

  render() {
    const setSolnData = (x, y, z) => {
      this.setState({
        x: x,
        y: y,
        z: z,
      });
    };

    // ! _______________________PRIMARY FUNCTIONS_______________________

    function convertURIToImageData(URI) {
      return new Promise(function (resolve, reject) {
        if (URI == null) return reject();
        var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          image = new Image();
        image.addEventListener(
          'load',
          function () {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(context.getImageData(0, 0, canvas.width, canvas.height));
          },
          false
        );
        image.src = URI;
      });
    }

    // function printUploadedImg() {
    //   let myImageNodeEle = document.getElementById('myImage');
    //   console.log(myImageNodeEle.value);
    // }

    //return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType) {
      mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
      return fetch(url)
        .then(function (res) {
          return res.arrayBuffer();
        })
        .then(function (buf) {
          return new File([buf], filename, { type: mimeType });
        });
    }

    // ! _______________________PRIMARY FUNCTIONS_______________________
    // const sendLinearImgToServer = (base64Img) => {
    //   // ? CONVERT 64 to file
    //   urltoFile(base64Img, 'a.jpg').then(function (file) {
    //     console.log(file);

    //     var bodyFormData = new FormData();
    //     bodyFormData.append('image', file);
    //     //? REQUEST SERVER
    //     axios({
    //       method: 'post',
    //       url: 'https://hesv-backend.herokuapp.com/equations/get-linear-equation',
    //       data: bodyFormData,
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //     })
    //       .then(function (response) {
    //         //handle success
    //         console.log(response);
    //       })
    //       .catch(function (response) {
    //         //handle error
    //         console.log(response);
    //       });
    //   });
    // };
    const sendLinearImgToServer = (base64Img) => {
      // ? CONVERT 64 to file
      urltoFile(base64Img, 'equation.png').then(function (file) {
        console.log(file);
        console.log(file);
        console.log(file);
        console.log(typeof file);

        var bodyFormData = new FormData();
        bodyFormData.append('image', file);
        //? REQUEST SERVER
        axios({
          method: 'post',
          url: 'https://hesv-backend.herokuapp.com/equations/get-linear-equation',
          data: bodyFormData,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then(function (response) {
            //handle success
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
      });
    };

    const solve2dLinearWorking = () => {
      const firstField = document.getElementById('firstField');
      const secondField = document.getElementById('secondField');

      console.log(firstField.value);
      console.log(firstField.value);

      var bodyFormData = new FormData();
      bodyFormData.append('equation1', firstField.value);
      bodyFormData.append('equation2', secondField.value);

      axios({
        method: 'post',
        url: 'https://hesv-backend.herokuapp.com/equations/solve-2d-linear-equation',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(function (response) {
          //handle success
          console.log('successfully solved :::: ', response);
          console.log(response);
          console.log(response.data.x);
          console.log(response.data.y);
          setSolnData(response.data.x, response.data.y);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    };

    const solve3dLinearWorking = () => {
      const firstField = document.getElementById('first3dEqn');
      const secondField = document.getElementById('second3dEqn');
      const thirdField = document.getElementById('third3dEqn');

      console.log(firstField.value);
      console.log(secondField.value);
      console.log(thirdField.value);

      var bodyFormData = new FormData();
      bodyFormData.append('equation1', firstField.value);
      bodyFormData.append('equation2', secondField.value);
      bodyFormData.append('equation3', thirdField.value);

      axios({
        method: 'post',
        url: 'https://hesv-backend.herokuapp.com/equations/solve-3d-linear-equation',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(function (response) {
          //handle success
          console.log('successfully solved :::: ', response);
          console.log(response);
          setSolnData(response.data.x, response.data.y, response.data.z);
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });
    };

    return (
      <WholeContainer>
        {/* <button onClick={printUploadedImg}>print file</button> */}
        {/* <input type="file" id="myImage" placeholder="hello" /> */}
        <div
          className="canvas-container"
          style={{
            background: 'white',
            borderRadius: '1.5rem',
            overflow: 'hidden',
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
                <h1>2 Variables</h1>
              </header>
              <input className="left__eqnField" type="text" id="firstField" />
              <input className="left__eqnField" type="text" id="secondField" />
            </div>
            <div
              className="upper__division__right"
              style={{
                position: 'relative',
                borderBottom: '1px solid #ccc',
              }}
            >
              <header>
                <h1>3 Variables</h1>
              </header>
              <input className="right__solnField" type="text" id="first3dEqn" />
              <input
                className="right__solnField"
                type="text"
                id="second3dEqn"
              />
              <input className="right__solnField" type="text" id="third3dEqn" />
            </div>
            <div
              className="upper__division__right"
              style={{
                position: 'relative',
                borderBottom: '1px solid #ccc',
              }}
            >
              <header>
                <h1>Calculation</h1>
              </header>
              <input
                className="right__solnField"
                type="text"
                value={`x=${this.state.x}`}
                disabled
              />
              <input
                className="right__solnField"
                type="text"
                value={`y=${this.state.y}`}
                disabled
              />
              <input
                className="right__solnField"
                type="text"
                value={`z=${this.state.z}`}
                disabled
              />
              <Button
                style={{
                  background: 'white',
                  color: 'black',
                  fontWidth: 'bolder',
                  outline: 'none',
                  border: 'none',
                  position: 'absolute',
                  bottom: '-10px',
                }}
              >
                Lines Are Parallel
              </Button>
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
              <button
                onClick={() => {
                  console.log(this.saveableCanvas.getDataURL());

                  sendLinearImgToServer(this.saveableCanvas.getDataURL());
                }}
              >
                GetDataURL
              </button>

              <Button ghost>Send</Button>
              <Button tertiary onClick={solve2dLinearWorking}>
                Solve 2D Linear
              </Button>
              <Button tertiary onClick={solve3dLinearWorking}>
                Solve 3D Linear
              </Button>
            </div>
            <CanvasDraw
              style={{
                borderRadius: '10px',
                width: '100%',
              }}
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
        <Graph x={this.state.x} y={this.state.y} z={this.state.z}></Graph>
      </WholeContainer>
    );
  }
}

export default Anvas;
