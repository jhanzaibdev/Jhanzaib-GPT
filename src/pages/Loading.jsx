import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Loading = () => {

  const naviage = useNavigate()
  useEffect(() => {
    const timeout = setTimeout(() => {
      Navigate('/')
    }, 8000)
    return ()=> clearTimeout (timeout)
  }, [])

  return (
    <div className='bg-gradient-to-b from-[#531b81] to-[#29184b] flex items-center justify-center h-screen w-screen'>
      <div className="w-12 h-12 rounded-full border-[3px] border-white border-t-transparent animate-spin"></div>
    </div>
  )
}

export default Loading
