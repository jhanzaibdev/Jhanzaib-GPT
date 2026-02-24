import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment'

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const { chats, setTheme, theme, user, navigate, chat, setSelectedChat } = useAppContext()
  const [search, setSearch] = useState("")

  return (
    <div className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 to-[#000000]/30 border-r border-[#80609f]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-1 ${!isMenuOpen && "max-md:-translate-x-full"}`}>

      {/* Logo */}
      <img src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark} alt="Logo" className='w-full max-w-48' />

      {/* New Chat Button */}
      <button className='flex justify-center items-center w-full py-2 mt-20 text-white bg-gradient-to-b from-[#a456f7] to-[#3d81f6] text-sm rounded-md cursor-pointer hover:opacity-90 transition-opacity'>
        <span className='mr-2 text-xl'>+</span>New Chat
      </button>

      {/* Search Conversation */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md bg-transparent">
        <img src={assets.search_icon} className='w-4 dark:invert-0 invert' alt="Search" />
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder='Search Conversations'
          className='text-xs bg-transparent placeholder:text-gray-400 outline-none w-full dark:text-white'
        />
      </div>

      {/* Recent Chats Header */}
      {chats.length > 0 && <p className='mt-4 text-sm font-medium dark:text-gray-300'>Recent Chats</p>}

      {/* Recent Chats List */}
      <div className="flex-1 overflow-y-auto mt-3 text-sm space-y-3 scrollbar-hide">
        {
          chats
            .filter((chat) => {
              const chatLabel = chat.messages[0]?.content || chat.name || "";
              return chatLabel.toLowerCase().includes(search.toLowerCase());
            })
            .map((chat) => (
              <div onClick={() => {
                navigate("/");
                setSelectedChat(chat);   // ✅ correct
                setIsMenuOpen(false);    // ✅ sidebar close
              }}

                key={chat._id}
                className="p-3 px-4 dark:bg-[#57317c]/10 border border-gray-300 dark:border-[#80609f]/15 rounded-md cursor-pointer flex justify-between items-center group hover:border-[#a456f7] transition-colors"
              >
                <div className=""> <p className='truncate w-40 dark:text-gray-200'>
                  {chat.messages.length > 0 ? chat.messages[0].content : chat.name}
                </p>
                  <p className='text-[10px] text-gray-500 dark:text-[#b1a6c0]'>
                    {moment(chat.updatedAt).fromNow()}
                  </p></div>
                <img src={assets.bin_icon} className='hidden group-hover:block w-4 cursor-pointer not-dark:invert' alt="Bin Icon" />
              </div>
            ))
        }
      </div>

      {/* Community Images */}
      <div onClick={() => { navigate("/Community"); setIsMenuOpen(false) }} className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all">
        <img src={assets.gallery_icon} alt="Gallery ICON" className='w-4.5 not-dark:invert' />
        <div className="flex flex-col text-sm">
          <p>Community Images</p>
        </div>
      </div>

      {/* User Credits  */}
      <div onClick={() => { navigate("/Credits"); setIsMenuOpen(false) }} className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all">
        <img src={assets.diamond_icon} alt="Diamond Icon" className='w-4.5 dark:invert' />
        <div className="flex flex-col text-sm">
          <p>Credits : {user?.credits}</p>
          <p className='text-xs text-gray-400'>Purshase Credits To Use Jhanzaib GPT</p>
        </div>
      </div>

      {/* Dark Mode Toogle */}

      <div className="flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md ">
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.theme_icon} alt="Theme Icon" className='w-4 not-dark:invert' />
          <p>Dark Mode</p>
        </div>
        <label className='relative inline-flex cursor-pointer'>
          <input onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} type="checkbox" className='sr-only peer' checked={theme === 'dark'} />
          <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all"></div>
          <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
        </label>
      </div>

      {/* User Account */}
      <div className="flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group">
        <img src={assets.user_icon} alt="User Icon" className='w-7 rounded-full' />
        <p className="flex-1 text-sm dark:text-primary truncate ">{user ? user.name : 'Login Your Account'}</p>
        {user && <img src={assets.logout_icon} className='h-5 cursor-pointer hidden not-dark:invert group-hover:block' />}
      </div>

      <img onClick={() => setIsMenuOpen(false)} src={assets.close_icon} alt="Close Icons" className='absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert' />
    </div>
  )
}

export default SideBar