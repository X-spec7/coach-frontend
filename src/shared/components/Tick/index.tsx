
export const Tick: React.FC<{ticked: boolean}> = ({ ticked }) => {

  return (
    <div className={`flex justify-center items-center w-6 h-6 rounded-lg
      ${ticked ? 'bg-blue' : 'bg-gray-bg border-stroke border-2'}
    `}>
      {
        ticked &&
        <svg fill='#000000' height='8px' width='12px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg'  
          viewBox='0 0 512 512' enable-background='new 0 0 512 512'>
          <polygon points='437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94' stroke='#212738' strokeWidth={3}/>
        </svg>
      }
    </div>
  )
}
