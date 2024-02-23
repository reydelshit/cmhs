import { useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { CropTypes, FieldTypes } from '@/entities/types'
import { useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import { ScheduleTypes } from '@/entities/types'
import ScheduleTable from './schedule/ScheduleTable'
import ScheduleForm from './schedule/ScheduleForm'
import FilterContainer from './schedule/FilterContainer'

export default function ScheduleGeneration() {
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [selectedCrops, setSelectedCrops] = useState<string>('')
  const [selectedField, setSelectedField] = useState<string>('')
  const [selectedActivity, setSelectedActivity] = useState<string>('')
  const [fieldData, setFieldData] = useState<FieldTypes[]>([])
  const [cropsData, setCropsData] = useState<CropTypes[]>([])
  const [scheduleData, setScheduleData] = useState<ScheduleTypes[]>([])
  const [status, setStatus] = useState('' as string)
  const [sortOrder, setSortOrder] = useState('asc')

  const user_id = localStorage.getItem('cmhs_token')

  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const handleChange = (item: any) => {
    setState(item.selection)
    console.log(item.selection)
  }

  const handleCrops = (e: string) => {
    setSelectedCrops(e)
  }
  const handleField = (e: string) => {
    setSelectedField(e)
  }
  const handleActivity = (e: string) => {
    setSelectedActivity(e)
  }

  const fetchCropsField = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/crops.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setCropsData(res.data)
          // setFieldData(res.data)
        }
      })

    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/field.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setFieldData(res.data)
          // setFieldData(res.data)
        }
      })
  }

  const fetchSchedule = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/schedule.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setScheduleData(res.data)
        }
      })
  }
  useEffect(() => {
    fetchCropsField()
    fetchSchedule()
  }, [])

  const handleSubmit = () => {
    if (
      selectedCrops === '' ||
      selectedField === '' ||
      selectedActivity === ''
    ) {
      return
    }
    axios
      .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/schedule.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        crops_id: selectedCrops,
        field_id: selectedField,
        activity: selectedActivity,
        scheduled_date: moment().format('ll'),
        actual_start_date: state.startDate,
        actual_end_date: state.endDate,
        user_id: user_id,
        status: 'Ongoing',
      })
      .then((res) => {
        if (res.data.status === 'success') {
          fetchSchedule()
          setShowScheduleForm(false)
        }
      })
  }

  const handleUpdateStatus = (id: string, status: string) => {
    console.log('click')
    axios
      .put(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/schedule.php`, {
        schedule_id: id,
        status: status === 'Ongoing' ? 'Done' : 'Ongoing',
        user_id: user_id,
      })
      .then((res) => {
        console.log(res.data)
        if (res.data.status === 'success') {
          fetchSchedule()
        }
      })
  }

  const handleDeleteSched = (schedule_id: number) => {
    axios
      .delete(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/schedule.php`, {
        data: {
          schedule_id: schedule_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          fetchSchedule()
        }
      })
  }

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
  }

  const sortedData = [...scheduleData].sort((a, b) => {
    console.log(a.scheduled_date, b.scheduled_date)
    // Assuming scheduled_date is the property containing the date
    const dateA = new Date(a.actual_start_date).getTime()
    const dateB = new Date(b.actual_end_date).getTime()

    if (sortOrder === 'asc') {
      return dateA - dateB
    } else {
      return dateB - dateA
    }
  })

  const handleStatus = (e: string) => {
    setStatus(e)
  }

  return (
    <div className="w-full h-dvh flex  items-start flex-col pl-[20rem] relative">
      <div className="my-[4rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          Schedule
        </h1>
      </div>

      <div className="flex gap-10 w-full h-full justify-around">
        <div className="w-full h-full flex justify-between items-start ">
          <div className="w-full h-[95%] rounded-2xl p-4 gap-2 flex justify-start items-center flex-col">
            <FilterContainer
              toggleSortOrder={toggleSortOrder}
              sortOrder={sortOrder}
              handleStatus={handleStatus}
              showScheduleForm={showScheduleForm}
              setShowScheduleForm={setShowScheduleForm}
            />
            <div className="w-[100%] min-h-[80%] border-4 rounded-3xl border-primary-yellow p-4">
              <ScheduleTable
                sortedData={sortedData}
                handleUpdateStatus={handleUpdateStatus}
                handleDeleteSched={handleDeleteSched}
                status={status}
              />
              F
            </div>
          </div>
        </div>
      </div>

      {showScheduleForm && (
        <ScheduleForm
          handleActivity={handleActivity}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          state={state}
          setState={setState}
          setShowScheduleForm={setShowScheduleForm}
          selectedActivity={selectedActivity}
          cropsData={cropsData}
          fieldData={fieldData}
          handleCrops={handleCrops}
          handleField={handleField}
        />
      )}
    </div>
  )
}
