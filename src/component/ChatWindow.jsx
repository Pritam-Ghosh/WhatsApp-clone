import { MessageSquareText, Plus, SendHorizontal } from 'lucide-react';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function ChatWindow() {
  const [msg, setMsg] = useState();

  const params = useParams();

  const handleSendMsg = () => {
    console.log(msg);

    setMsg("")
  }

  // empty screen
  if (!params.chatid) {
    return <section className='w-[70vw] h-full flex flex-col gap-4 items-center justify-center'>
      <MessageSquareText className='w-28 h-28 text-gray-400' strokeWidth={1.2}>
      </MessageSquareText>
      <p className='text-gray-400'>
        Select any contact to
        <br />
        start a chat with
      </p>
    </section>
  }

  // chat screen

  return (
    <section className='w-[70vw] h-full flex flex-col gap-4 items-center justify-center'>
      <div className='h-full w-full bg-chat-bg flex flex-col'>
        {/* topbar */}
        <div className='bg-background flex items-center gap-2 shadow-sm py-2 px-2'>
          <img src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" className='w-9 h-9 rounded-full object-cover' alt="" />
          <h3> Pritam</h3>
        </div>


        {/* message list */}
        <div className='flex flex-grow flex-col gap-12 p-6 bg-red-100'>
          <h2>message</h2>
          <h2>message</h2>
          <h2>message</h2>
          <h2>message</h2>
        </div>


        {/*chat input */}
        <div className='flex items-center bg-background py-3 px-6 gap-6'>
          <Plus />
          <input type='text' className='w-full py-2 px-4 rounded focus:outline-none' placeholder='type a message...' value={msg} onChange={(e) => {
            setMsg(e.target.value)
          }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleSendMsg();

              }
            }} />
          <button className='hover:bg-gray-400 px-4 py-2 rounded-sm' onClick={handleSendMsg} >
            <SendHorizontal />
          </button>
        </div>
      </div>



    </section>
  )
}

export default ChatWindow