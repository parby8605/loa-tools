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
        <div className='font-semibold text-[20px]'>골드 시세 입력</div>
      </div>
      <div className={style.priceWrapper}>
        <div className={style.price}>
          <div className='flex'>상품권 할인율</div>
          <input
            className={style.nospinner}
            onChange={() => setDiscount}
            type='number'
            defaultValue={0}
          />
        </div>
        <div className={style.price}>
          <div>블루 크리스탈 가격 입력</div>
          <div className={style.priceRatio}>
            <div className='pr-4'>2700 : </div>
            <input
              className={style.nospinner}
              onChange={() => setBCPrice}
              type='number'
              defaultValue={0}
            />
          </div>
        </div>
        <div className={style.price}>
          <div>유저간 골드 거래가</div>
          <div className={style.priceRatio}>
            <div className='pr-4'>100 : </div>
            <input
              className={style.nospinner}
              onChange={() => setUserGoldPrice}
              type='number'
              defaultValue={0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
