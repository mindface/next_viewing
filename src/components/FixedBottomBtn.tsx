import React, { useEffect, useState } from 'react'
import { useStore, useDispatch } from 'react-redux'

function FixedBottomBtn() {
  useEffect(() => {}, [])

  function viewBtnAction() {}

  return (
    <div className='footer-btn'>
      <button className='btn' onClick={viewBtnAction}>
        +
      </button>
    </div>
  )
}

export default FixedBottomBtn
