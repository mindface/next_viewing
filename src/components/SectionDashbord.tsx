import React, { useEffect, useState, useRef } from 'react'
import { useStore ,useDispatch, useSelector } from 'react-redux'
import { getFetchLogs } from '../store/logtools/slice'
import { getLogtoolsSelector } from '../store/selector/logstool'
import BordObjective from "../components/bord/BordObjective"
import BordPlan from "../components/bord/BordPlan"
import BordTaskNumber from "../components/bord/BordTaskNumber"
import BordStructure from "../components/bord/BordStructure"
import BordPremise from "../components/bord/BordPremise"
import BordTask from "../components/bord/BordTask"
import CommonUser from "../components/common/CommonUser"

function SectionDashbord() {
  const dispatch = useDispatch()
  const store = useStore()
  const [switcherClass,setSwitcherClass] = useState('01')

  useEffect(() => {
    dispatch(getFetchLogs())
  },[])

  const switcherOnChange = (num:string) => {
    setSwitcherClass(num)
  }

  return (
    <section className={`section section--dashbord card-style-${switcherClass}`}>
      <div className="switcher">
        <input type="radio" name="switcher" id="style01" defaultChecked onChange={e => switcherOnChange('01')} />
        <label htmlFor="style01" className="label">style01</label>
        <input type="radio" name="switcher" id="style02" onChange={e => switcherOnChange('02')} />
        <label htmlFor="style02" className="label">style02</label>
        <input type="radio" name="switcher" id="style03" onChange={e => switcherOnChange('03')} />
        <label htmlFor="style03" className="label">style03</label>
      </div>
      <div className="card-box">
        <div className="_flex_">
          <div className="card card--user card--20 __radius">
            <CommonUser />
          </div>
          <div className="card card--80 __radius">
            <BordTask />
          </div>
          <div className="card card--40 __radius">
            <BordObjective />
          </div>
          <div className="card card--60 __radius">
            <BordTaskNumber />
          </div>
          <div className="card card--30 __radius">
            <BordPlan />
          </div>
          <div className="card card--30 __radius">
            <BordStructure />
          </div>
          <div className="card card--30 __radius">
            <BordPremise />
          </div>
        </div>
        <div className="info-box info-box--info __radius">
            <div className="card__title">
              <h3 className="title">サイド</h3>
            </div>
            <div className="card__body">
              <ul className="list">
                <li className="item">
                  <p className="caption">サイドサイドサイド</p>
                </li>
              </ul>
            </div>
          </div>
      </div>
    </section>
  )
}

export default SectionDashbord