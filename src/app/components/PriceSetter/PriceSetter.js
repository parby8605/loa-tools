'use client'

import style from '@/app/components/PriceSetter/PriceSetter.module.css'
import { useState } from 'react'

export default function PriceSetter() {
  const [discount, setDiscount] = useState()
  const [userGoldPrice, setUserGoldPrice] = useState()
  const [BCPrice, setBCPrice] = useState()

  return (
    <div className={style.contentWrapper}>
      <div>골드 시세 입력</div>
      <div className={style.priceWrapper}>
        <div>
          <div>할인율</div>
          <input onChange={() => setDiscount} />
        </div>
        <div>
          <div>블루 크리스탈 가격 입력</div>
          <div>
            <div>2700 : </div>
            <input onChange={() => setBCPrice} />
          </div>
        </div>
        <div>
          <div>유저간 골드 거래가</div>
          <input onChange={() => setUserGoldPrice} />
        </div>
      </div>
    </div>
  )
}
