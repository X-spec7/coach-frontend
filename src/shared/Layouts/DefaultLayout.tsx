import Sidebar from '@/shared/Layouts/Sidebar'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <div className='flex w-full min-h-screen bg-gray-bg'>
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className='relative flex-1'>

          {/* <main className='h-[calc(100%-32px)]'> */}
          <main className='h-full'>
            <div className='mx-auto h-full'>
              {children}
            </div>
          </main>
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
    </>
  )
}
