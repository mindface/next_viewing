import React, { useEffect, useState } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { getFetchLogs } from '../store/logtools/slice'
import { getLogtoolsSelector } from '../store/selector/logstool'
import { FetchApi } from "../api/fetch-api";
import { iteratorSymbol } from 'immer/dist/internal';

export type Item = {
  id:number;
  link:string;
  text:string;
}

function SectionSearcher() {
  const dispatch = useDispatch()
  const [data,setData] = useState<Item[]>([])
  const [quiteData,setQuiteData] = useState<Item[]>([])
  const [zenData,setZenData] = useState<Item[]>([])

  useEffect( () => {
    dispatch(getFetchLogs())
    const fetchApi = new FetchApi()
    fetchApi.GetFetch<Item[]>("/json/sjal1.json")
      .then((res) => {
        setData(res)
      })
    fetchApi.GetFetch<Item[]>("/json/quite1.json")
    .then((res) => {
      setQuiteData(res)
    })
    fetchApi.GetFetch<Item[]>("/json/zenn1.json")
    .then((res) => {
      setZenData(res)
    })
    // fetchApi.GetFetch("https://api.github.com/search/repositories?q=typescript")
    // .then((res) => {
    //   setZenData(res)
    // })
  }, [])

  return (
    <section className='l-section section--searcher'>
      <div className='content __limit-l'>
        <div className='content__title'>
          <h3 className='title'>Python で情報収集した結果</h3>
        </div>
        <div className='content__body _flex_'>
          <div className='results'>
            {data.map((item:Item,index:number)=> <p key={index+'0'+item.id}><a className='link' href={item.link} target="_new">{item.text}</a></p>)}
          </div>
          <div className='results'>
            {quiteData.map((item:Item,index:number)=> <p key={index+'0'+item.id}><a className='link' href={item.link} target="_new">{item.text}</a></p>)}
          </div>
          <div className='results'>
            {zenData.map((item:Item,index:number)=> <p key={index+'0'+item.id}><a className='link' href={item.link} target="_new">{item.text}</a></p>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionSearcher
