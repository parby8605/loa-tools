'use client'

import { useEffect, useState } from 'react'

export default function SearchChar() {
  const [charName, setCharName] = useState('리희정')
  const [charList, setCharList] = useState([])
  const [serverName, setServerName] = useState('카마인')
  async function fetchChar(charName, server) {
    try {
      const response = await fetch(`/api/schedule?charName=${charName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error(`Fetch Error! status: ${response.status}`)
      }
      const data = await response.json()
      const groupByServer = data
        //서버명 같은 목록만 뽑아오기
        .filter((char) => char.ServerName === server)
        //아이템 레벨 순 정렬
        .sort(
          (a, b) =>
            parseFloat(b.ItemAvgLevel.replace(',', '')) -
            parseFloat(a.ItemAvgLevel.replace(',', '')),
        )
      return groupByServer
    } catch (e) {
      console.error('Fetching error : ', e)
    }
  }
  useEffect(() => {
    if (charName !== null) {
      const getCharList = async () => {
        const charListData = await fetchChar(charName, serverName)
        setCharList(charListData)
      }
      getCharList()
    }
  }, [])

  console.log('charList : ', charList)

  return (
    <>
      <div></div>
    </>
  )
}
