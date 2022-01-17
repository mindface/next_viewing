import React from 'react'

function BordCategory() {

  return (
    <div className="box-task bord bord-category">
      <div className="box-task__title">
        <h3 className="title">カテゴライズ</h3>
      </div>
      <div className="box-task__body">
        <ul className="list">
          <li className="item">
            <p className="caption">タスク名</p>
            <p className="caption">詳細詳細</p>
          </li>
          <li className="item">
            <p className="caption">タスク名</p>
            <p className="caption">詳細詳細</p>
          </li>
          <li className="item">
            <p className="caption">タスク名</p>
            <p className="caption">詳細詳細</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BordCategory
