'use client'

import { useEffect, useState } from 'react'
import style from '@/app/components/MaterialLoader/MaterialLoader.module.css'
import Image from 'next/image'
import MaterialContainer from './MaterialContainer'

export default function MaterialLoader() {
  /**
   * 불러올 아이템 목록
   * 1. 명예의 파편 ItemName: 명예의 파편
   * 2. 오레하 -> 묶음으로 처리 ItemName: 오레하
   * 3. 돌파석 -> 묶음으로 처리 ItemName: 돌파석
   * 4. 강석 종류 -> ItemName: 강석 으로 요청하면 묶여서 옴
   * 5. 추가 강화 재료 -> CategoryCode: 50020 ItemName : "태양"
   */
  const [honorShard, setHonorShard] = useState([])
  const [oreha, setOreha] = useState([])
  const [leafStone, setLeafStone] = useState([])
  const [forgeStone, setForgeStone] = useState([])
  const [auxMaterial, setAuxMaterial] = useState([])
  const [loading, setLoading] = useState(true)

  /** 재료 fetch api : reqParams에 body 작성해서 파라미터로 넘김( ex : { ItemName: "명예의 파편" }) */
  async function fetchItems(reqParams) {
    try {
      const response = await fetch('/api/package-efficiency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqParams),
      })

      if (!response.ok) {
        throw new Error(`Fetch Error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (e) {
      console.error('Fetching error : ', e)
    }
  }
  useEffect(() => {
    async function fetchAllMaterial() {
      const honorShard = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50010,
        ItemName: '명예의 파편 주머니(대)',
        ItemTier: 3,
        SortCondition: 'ASC',
      })
      setHonorShard(honorShard)

      const oreha = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50010,
        ItemName: '오레하',
        ItemTier: 3,
        SortCondition: 'ASC',
      })
      setOreha(oreha)

      const leafStone = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50010,
        ItemName: '돌파석',
        ItemTier: 3,
        SortCondition: 'ASC',
      })
      setLeafStone(leafStone)

      const forgeStone = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50010,
        ItemName: '강석',
        ItemTier: 3,
        SortCondition: 'ASC',
      })
      setForgeStone(forgeStone)

      const auxMaterial = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50020,
        ItemName: '태양',
        ItemTier: 3,
        SortCondition: 'ASC',
      })
      setAuxMaterial(auxMaterial)
    }
    fetchAllMaterial()
    setLoading(false)
  }, [])

  // 데이터 로딩중일경우 노출
  if (loading) {
    return <div>Now Loading...</div>
  }

  return (
    <>
      <div className={style.letterBox}>재련 재료 가격</div>
      <div className={style.itemWrapper}>
        <MaterialContainer itemArray={honorShard} />
        <MaterialContainer itemArray={oreha} />
        <MaterialContainer itemArray={leafStone} />
        <MaterialContainer itemArray={forgeStone} />
        <MaterialContainer itemArray={auxMaterial} />
      </div>
    </>
  )
}
