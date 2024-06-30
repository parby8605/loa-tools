import MaterialLoader from '@/app/components/MaterialLoader/MaterialLoader'

export default function packageEfficiency() {
  return (
    <>
      <div className='flex flex-row flex-grow gap-5 m-5'>
        <div className='w-[20%]'>
          <MaterialLoader />
        </div>
        <div>
          <div>여기에 패키지 선택 컴포넌트</div>
        </div>
      </div>
    </>
  )
}
