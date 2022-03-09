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
  };

  render() {
    // ! _______________________PRIMARY FUNCTIONS_______________________

    // function convertURIToImageData(URI) {
    //   return new Promise(function (resolve, reject) {
    //     if (URI == null) return reject();
    //     var canvas = document.createElement('canvas'),
    //       context = canvas.getContext('2d'),
    //       image = new Image();
    //     image.addEventListener(
    //       'load',
    //       function () {
    //         canvas.width = image.width;
    //         canvas.height = image.height;
    //         context.drawImage(image, 0, 0, canvas.width, canvas.height);
    //         resolve(context.getImageData(0, 0, canvas.width, canvas.height));
    //       },
    //       false
    //     );
    //     image.src = URI;
    //   });
    // }
    // var URI =
    //   'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAABMLAAATCwAAAAAAAAAAAABsiqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/iKC3/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/2uLp///////R2uP/dZGs/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/////////////////+3w9P+IoLf/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv///////////+3w9P+tvc3/dZGs/2yKpv9siqb/bIqm/2yKpv9siqb/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH////////////0+Pv/erDR/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB//////////////////////96sNH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf////////////////+Ft9T/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/E4zV/xOM1f8TjNX/E4zV/yKT2P/T6ff/////////////////4fH6/z+i3f8TjNX/E4zV/xOM1f8TjNX/E4zV/xOM1f8TjNX/E4zV/xOM1f+m1O/////////////////////////////w+Pz/IpPY/xOM1f8TjNX/E4zV/xOM1f8TjNX/E4zV/xOM1f8TjNX////////////T6ff/Tqng/6bU7////////////3u/5/8TjNX/E4zV/xOM1f8TjNX/AIv//wCL//8Ai///AIv/////////////gMX//wCL//8gmv////////////+Axf//AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL///v+P///////+/4//+Axf//z+n/////////////YLf//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL//8Ai///gMX/////////////////////////////z+n//wCL//8Ai///AIv//wCL//8Ai///AHr//wB6//8Aev//AHr//wB6//+Avf//7/f/////////////v97//xCC//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
    // convertURIToImageData(URI).then(function (imageData) {
    //   // Here you can use imageData
    //   console.log('**********************method 1 imageObj');
    //   console.log(imageData);
    //   console.log('+++++++++++++++++++   direct logged imageObject');
    //   console.log(myImg);
    //   var img = new Image();
    //   img.src = URI;
    //   console.log('*********************method 2 logged imageObject');
    //   console.log(img);
    // });

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

    const sendLinearImgToServer = (base64Img) => {
      urltoFile(base64Img, 'a.png').then(function (file) {
        console.log(file);

        var bodyFormData = new FormData();
        bodyFormData.append('image', file);
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

    // !Send Polynomial Equation to server
    const sendPoliImgToServer = (base64Img) => {
      urltoFile(base64Img, 'a.png').then(function (file) {
        console.log(file);

        var bodyFormData = new FormData();
        bodyFormData.append('image', file);
        axios({
          method: 'post',
          url: 'https://hesv-backend.herokuapp.com/equations/get-linear-equation',
          data: bodyFormData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
              <input className="left__eqnField" type="text" />
              <input className="left__eqnField" type="text" />
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
              <input className="right__solnField" type="text" />
              <input className="right__solnField" type="text" />
              <Button
                style={{
                  background: 'transparent',
                  color: 'red',
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
              <button
                onClick={() => {
                  localStorage.setItem(
                    'savedDrawing',
                    this.saveableCanvas.getSaveData()
                  );
                }}
              >
                Save
              </button>
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
        <Graph></Graph>
      </WholeContainer>
    );
  }
}

export default Anvas;
