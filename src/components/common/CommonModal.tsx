import React, { useImperativeHandle, forwardRef, useState, Ref, RefObject } from 'react'
import Image from 'next/image'

type Props = {
  children?: React.ReactNode
  type?: string
  closeBtn?: boolean
  ref?: RefObject<Handler>
  setMethods?: () => void
}

export interface Handler {
  modalAction(): void
}

function CommonModal({ children, type, setMethods, closeBtn = true }: Props, ref: any) {
  const [closeClass, setCloseClass] = useState(false)
  const [styleClass, setStyleClass] = useState(false)

  const modalAction = () => {
    setCloseClass(!closeClass)
    if (setMethods) {
      setMethods()
    }
  }

  useImperativeHandle(ref, () => ({
    modalAction,
  }))

  const setIcons = () => {
    switch (type) {
      case 'view':
        return '/images/disc-view.svg'
      default:
        return '/images/add.svg'
    }
  }

  return (
    <div className={`modal-outer${styleClass ? ' edit' : ''}`}>
      {!type && (
        <button className='btn open' onClick={(e) => modalAction()}>
          open
        </button>
      )}
      {type !== 'nobtn' ? (
        <button className='btn open __radius' onClick={(e) => modalAction()}>
          <Image src={setIcons()} alt='add svg' width={15} height={15} />
        </button>
      ) : (
        ''
      )}
      {closeClass && (
        <div className={`modal-transfer`}>
          <div className='modal-box __radius'>
            <div className='styler-switch'>
              <input
                type='checkbox'
                className='input'
                name='styler'
                id='styler'
                onChange={() => {
                  setStyleClass(!styleClass)
                }}
              />
              <label htmlFor='styler' className='label switch'>
                edit スタイル
              </label>
            </div>
            {closeBtn && (
              <button className='btn close' onClick={(e) => modalAction()}>
                close
              </button>
            )}
            <div className='box-modal__body'>{children}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default forwardRef(CommonModal)
