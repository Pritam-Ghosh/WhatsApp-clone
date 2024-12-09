import { MessageSquareText } from 'lucide-react';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function ChatWindow() {
  const params = useParams();


  if(params.chatid){
    return  <div>
    Chat:<p> {params.chatid}</p>
    
        </div>
  }

  return ( <section className='w-[70vw] h-full flex flex-col gap-4 items-center justify-center'>
    <MessageSquareText className='w-28 h-28 text-gray-400' strokeWidth={1.2}></MessageSquareText>
  </section>
  )
}

export default ChatWindow