import React, { useEffect, useRef } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { getFetchLogs } from '../store/logtools/slice'
import Link from 'next/link'
import SettingsImage from "../../public/images/settings.jpg"

function SectionAbout() {
  const dispatch = useDispatch()
  const canvas = useRef<HTMLCanvasElement>(null)
  const mx = useRef(100)
  const my = useRef(10)

  useEffect(() => {
    dispatch(getFetchLogs())
    initCanvas()
  }, [])

  const initCanvas = () => {
    const element = canvas.current as HTMLCanvasElement
    element.width = 300
    element.height = 300
    const ctx = element.getContext('2d');

    var img = new Image();
    img.src = "/images/setting.jpg"
    ctx.drawImage(img,0,0);
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      img.style.display = 'none';
    };

    function pick(event) {
      var x = event.layerX;
      var y = event.layerY;
      var pixel = ctx.getImageData(x, y, 1, 1);
      var data = pixel.data;
      var rgba = 'rgba(' + data[0] + ',' + data[1] +
                 ',' + data[2] + ',' + (data[3] / 255) + ')';
      console.log(pixel)
      // color.style.background =  rgba;
      // color.textContent = rgba;
    }
    element.addEventListener('mousemove', pick);
    // if(ctx){
    //   ctx.fillRect(20,40,50,120)
    //   ctx.fillStyle = "rgb(0, 0, 255)";
    //   ctx.fill()
    // }

  }

  const addRect = () => {
    const element = canvas.current as HTMLCanvasElement
    const ctx = element.getContext('2d')
    if(ctx){
      ctx.fillRect(70,80,80,120)
      ctx.fillStyle = "rgb(0, 0, 255)";
      ctx.fill()
    }
    let path1b = new Path2D()
    path1b.rect(mx.current,my.current,100,100)

    const shapes = new Map([
      ["circle", new Path2D("M50,50m-50,0a50,50 0 1 1 100,0 50,50 0 1 1-100,0z")],
      ["rect"  , path1b]
    ]);
    let hovered:any, clicked:any;
    let move:any;
    const draw = () => {
      const canva = canvas.current as HTMLCanvasElement

      ctx.clearRect(0, 0, element.width, element.height);
      for(let [type, shape] of shapes){
        drawShape(shape);
        if(shape === clicked){
          ctx.fillStyle = "black", ctx.fillText(type + " was clicked.", 0, 200);
        }
      };
    };
    const drawShape = shape => {
      ctx.fillStyle = hovered === shape ? "red": "blue"; ctx.fill(shape);
    };
    element.onmousemove = element.onmouseleave = e => {
      hovered = null;
      ctx.clearRect(0, 0, element.width, element.height);
      for(let [type, shape] of shapes) {
        if(ctx.isPointInPath(shape, e.offsetX, e.offsetY)){
          mx.current = e.offsetX
          my.current = e.offsetY
          path1b.rect(mx.current,my.current,100,100)
          hovered = shape; break;
        }
      }
        
      draw();
    };
    element.onclick = e => {
      clicked = null;
      for(let [type, shape] of shapes)
        if(ctx.isPointInPath(shape, e.offsetX, e.offsetY)){
          clicked = shape;
          break;
        }
      draw();
    };
    draw();
  }

  const checkEvent = () => {
    const element = canvas.current as HTMLCanvasElement
    const ctx = element.getContext('2d')
    console.log(ctx)
  }

  return (
    <section className='l-section section--make-canvas'>
      <div className='content __limit-m'>
        <div className='content__title'>
          <h3 className='title'>画像作成ツール</h3>
        </div>
        <div className='content__body'>
          <button onClick={checkEvent}>non</button>
          <button onClick={addRect}>+</button>
          <div className="canvas-box">
            <canvas className="canvas" ref={canvas}></canvas>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionAbout
