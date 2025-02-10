import ClassDetail from '@/features/classes/pages/detail'

const Page = ({ params }: { params: { classId: string } }) => {
  return (
    <ClassDetail classId={Number(params.classId)} />
  )
}

export default Page
