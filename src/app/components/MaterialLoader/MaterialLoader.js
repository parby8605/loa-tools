'use client'

import { useEffect, useState } from 'react'
import style from '@/app/components/MaterialLoader/MaterialLoader.module.css'
import MaterialContainer from './MaterialContainer'
import PriceSetter from '@/app/components/PriceSetter/PriceSetter'

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
  const [destinyShard, setDestinyShard] = useState([])
  const [oreha, setOreha] = useState([])
  const [abidos, setAbidos] = useState([])
  const [leafStone, setLeafStone] = useState([])
  const [destinyLeafStone, setDestinyLeafStone] = useState([])
  const [forgeStone, setForgeStone] = useState([])
  const [destinyForgeStone, setDestinyForgeStone] = useState([])
  const [auxMaterial, setAuxMaterial] = useState([])
  const [destinyAuxMaterial, setDestinyAuxMaterial] = useState([])
  const [loading, setLoading] = useState(true)

  /** 재료 fetch api : reqParams에 body 작성해서 파라미터로 넘김( ex : { ItemName: "명예의 파편" }) */
  async function fetchItems(reqParams, update) {
    try {
      const response = await fetch(`/api/package-efficiency?update=${update}`, {
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

  // SSR vs CSR 생각 -> 추후 가격 수정기능 확장 생각하면 CSR이 맞을듯
  useEffect(() => {
    async function fetchAllMaterial() {
      const honorShard = await fetchItems(
        {
          Sort: 'GRADE',
          CategoryCode: 50010,
          ItemName: '명예의 파편 주머니(대)',
          ItemTier: 3,
          SortCondition: 'ASC',
        },
        false,
      )
      setHonorShard(honorShard)

      const destinyShard = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50010,
        ItemName: '운명의 파편',
        ItemTier: 4,
        SortCondition: 'ASC',
      })
      setDestinyShard(destinyShard)

      const destinyLeafStone = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50010,
        ItemName: '운명의 돌파',
        ItemTier: 4,
        SortCondition: 'ASC',
      })
      setDestinyLeafStone(destinyLeafStone)

      const destinyForgeStoneA = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50010,
        ItemName: '운명의 수호석',
        ItemTier: 4,
        SortCondition: 'ASC',
      })

      const destinyForgeStoneB = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50010,
        ItemName: '운명의 파괴석',
        ItemTier: 4,
        SortCondition: 'ASC',
      })
      setDestinyForgeStone([...destinyForgeStoneA, ...destinyForgeStoneB])

      const oreha = await fetchItems(
        {
          Sort: 'GRADE',
          CategoryCode: 50010,
          ItemName: '상급 오레하',
          ItemTier: 3,
          SortCondition: 'ASC',
        },
        false,
      )
      setOreha(oreha)

      const abidos = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50010,
        ItemName: '아비도스',
        ItemTier: 4,
        SortCondition: 'ASC',
      })
      setAbidos(abidos)

      const leafStone = await fetchItems(
        {
          Sort: 'GRADE',
          CategoryCode: 50010,
          ItemName: '돌파석',
          ItemTier: 3,
          SortCondition: 'ASC',
        },
        false,
      )
      setLeafStone(leafStone)

      const forgeStone = await fetchItems(
        {
          Sort: 'GRADE',
          CategoryCode: 50010,
          ItemName: '강석',
          ItemTier: 3,
          SortCondition: 'ASC',
        },
        false,
      )
      setForgeStone(forgeStone)

      const auxMaterial = await fetchItems(
        {
          Sort: 'GRADE',
          CategoryCode: 50020,
          ItemName: '태양',
          ItemTier: 3,
          SortCondition: 'ASC',
        },
        false,
      )
      setAuxMaterial(auxMaterial)

      const destinyAuxMaterial = await fetchItems({
        Sort: 'GRADE',
        CategoryCode: 50020,
        ItemName: '숨결',
        ItemTier: 4,
        SortCondition: 'ASC',
      })
      setDestinyAuxMaterial(destinyAuxMaterial)
    }
    fetchAllMaterial()
    setLoading(false)
  }, [])

  // 데이터 로딩중일경우 노출
  if (loading) {
    return (
      <>
        <div className={style.letterBox}>재련 재료 가격</div>
        <div className={style.itemWrapper}>Now Loading...</div>
      </>
    )
  }

  return (
    <div className='my-2 flex flex-row w-full flex-grow justify-between'>
      <div className='w-[20%]'>
        <div className={style.letterBox}>
          <div>재련 재료 가격</div>
          {/* <button onClick={() => fetchNewItems()}>⟳</button> */}
        </div>
        <div className={style.itemWrapper}>
          <MaterialContainer itemArray={honorShard} />
          <MaterialContainer itemArray={destinyShard} />
          <MaterialContainer itemArray={oreha} />
          <MaterialContainer itemArray={abidos} />
          <MaterialContainer itemArray={leafStone} />
          <MaterialContainer itemArray={destinyLeafStone} />
          <MaterialContainer itemArray={forgeStone} />
          <MaterialContainer itemArray={destinyForgeStone} />
          <MaterialContainer itemArray={auxMaterial} />
          <MaterialContainer itemArray={destinyAuxMaterial} />
        </div>
      </div>
      <div className='flex flex-col w-[75%]'>
        <div>
          <PriceSetter />
        </div>
        <div>패키지선택 및 효율표시</div>
      </div>
    </div>
  )
}
