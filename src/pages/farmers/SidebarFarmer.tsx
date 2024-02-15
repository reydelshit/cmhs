import { Link } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'

export default function Sidebar() {
  return (
    <div className="block w-[17rem] h-screen">
      <div className=" flex flex-col justify-between w-full h-full mt-[5rem]">
        <div className=" flex flex-col">
          <Link className="p-2 mb-2 flex items-center gap-2" to="/">
            <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" /> Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
