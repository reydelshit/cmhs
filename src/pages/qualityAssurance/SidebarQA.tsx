import { Link } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'

export default function SidebarQA() {
  return (
    <div className="block w-[17rem] h-screen">
      <div className="flex flex-col justify-between w-full h-full mt-[5rem]">
        <div className=" flex flex-col">
          <Link className="p-2 mb-2 flex items-center gap-2" to="/qa">
            <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" />
            QA Dashboard
          </Link>

          <Link className="p-2 mb-2 flex items-center gap-2" to="/qa/visit">
            <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" /> Visit
          </Link>
        </div>
      </div>
    </div>
  )
}
