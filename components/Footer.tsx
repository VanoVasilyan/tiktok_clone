import { footerList1, footerList2, footerList3 } from '../utils/constants';

type ListProps = {
  list: string[];
  mt: boolean
}

const List = ({ list, mt }: ListProps) => (
  <div className={`flex flex-wrap gap-2 ${mt ? 'mt-5' : ''}`}>
    {list.map((item) => (
      <p key={item} className='text-gray-400 text-sm hover:underline cursor-pointer'>
        {item}
      </p>
    ))}
  </div>
)

const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block'>
      <List list={footerList1} mt={false} />
      <List list={footerList2} mt />
      <List list={footerList3} mt />
      <p className='text-gray-400 text-sm mt-5'>
        {new Date().getFullYear()} TikTok Clone
      </p>
    </div>
  )
}

export default Footer