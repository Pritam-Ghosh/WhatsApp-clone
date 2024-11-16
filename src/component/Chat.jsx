import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function Chat() {
  const params = useParams();
  console.log(params);

  return (
    <div>
Chat:
  <p>
  {params.uniqueChat}
</p>

    </div>
  )
}

export default Chat