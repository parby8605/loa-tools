'use client'

import style from '@/app/components/PriceSetter/PriceSetter.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function PriceSetter() {
  const [discount, setDiscount] = useState()
  const [userGoldPrice, setUserGoldPrice] = useState()
  const [BCPrice, setBCPrice] = useState()
  const goldIMG = '/Gold.png'

  return (
    <div className={style.priceContainer}>
      <div className='flex flex-row items-center gap-x-4 mb-4'>
        <Image src={goldIMG} width={46} height={46} alt='GOLD' />
        <div>골드 시세 입력</div>
      </div>
      <div className={style.priceWrapper}>
        <div className={style.price}>
          <div>상품권 할인율</div>
          <input onChange={() => setDiscount} />
        </div>
        <div className={style.price}>
          <div>블루 크리스탈 가격 입력</div>
          <div className={style.priceRatio}>
            <div className='pr-4'>2700 : </div>
            <input onChange={() => setBCPrice} />
          </div>
        </div>
        <div className={style.price}>
          <div>유저간 골드 거래가</div>
          <div className={style.priceRatio}>
            <div className='pr-4'>100 : </div>
            <input onChange={() => setUserGoldPrice} />
          </div>
        </div>
      </div>
    </div>
  )
}
