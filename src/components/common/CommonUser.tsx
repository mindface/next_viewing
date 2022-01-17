import React from 'react'
import { useStore, useSelector } from 'react-redux'

function CommonUser() {
  const store = useStore()
  const user = useSelector(() => store.getState().user.user)

  function checkData(){
  }

  return (
    <div className="box-task">
      <div className="box-task__title">
        <h3 className="title" onClick={checkData}>ユーザー名</h3>
      </div>
      <div className="box-task__body">
        <ul className="list">
          <li className="item">
            <p className="caption __p-b-8">ネーム</p>
            <p className="val">{user.username}</p>
          </li>
          <li className="item">
            <p className="caption __p-b-8">作成タスク数</p>
            <p className="val">3</p>
          </li>
          <li className="item">
            <p className="caption __p-b-8">完了数</p>
            <p className="val">2</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CommonUser
