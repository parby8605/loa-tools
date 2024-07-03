import Image from 'next/image'
import style from '@/app/components/MaterialLoader/MaterialLoader.module.css'

export default function MaterialContainer({ itemArray }) {
  return (
    <>
      <div>
        {itemArray?.map((item) => {
          return (
            <div key={item.Id} className={style.itemContainer}>
              <div className={style.itemImage}>
                <Image src={item.Icon} width={46} height={46} alt='명예의파편' />
              </div>
              <div className={style.itemInfo}>
                <div className={style.itemName}>{item.Name}</div>
                <div className={style.itemPrice}>{item.RecentPrice} Gold</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
