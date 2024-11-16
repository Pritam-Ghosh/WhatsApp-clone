import React from 'react'

function Login() {
  return (
    <>
      <div className='bg-[#04a784] h-[200px] '>

        <div className='flex ml-[200px] pt-6 items-center gap-4 font-medium'>
          <img src="https://whatsapp-clone-826a9.web.app/whatsapp.svg" alt="" className='h-8'/>
          <div className=' text-white '>WhatsApp</div>  
          </div>
        
       
      </div>


      <div className='bg-[#eff2f5] h-[calc(100vh-200px)] flex items-center justify-center relative'>
        <div className='bg-white shadow-2xl h-[90%] w-[50%] absolute top-[-15%] flex flex-col gap-4 items-center justify-center'>

          
          <div>Sign in </div>
          <div><i className="fa-solid fa-fingerprint text-[50px]"></i></div>
          <div className='text-gray-500 font-thin'>Sign in with your google account to get started.</div>
          <button className='bg-[#04a784] p-3 text-white font-medium rounded-[6px]'>Sign in with Google <span><i className="fa-solid fa-right-to-bracket">  </i></span></button>
        </div>
      </div>

    </>
  )
}

export default Login