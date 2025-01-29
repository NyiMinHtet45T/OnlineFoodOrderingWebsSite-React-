import React, { useEffect, useState } from 'react'
import "./MessageBox.css"
import { useDispatch, useSelector } from 'react-redux';
import { reciveMessageSuccess } from '../State/MessageReducer';

export default function GlobalMessageBox() {

   // const [message, setMessage] = useState();
   const [showMessage, setShowMessage] = useState(false);

   const {message} = useSelector(state => state.message)
   const dispatch = useDispatch();

   useEffect(() => {
      if(message) {
         setShowMessage(true)
         setHandleTime();
      }
   }, [message])

   const setHandleTime = () => {
      setTimeout(() => {
         setShowMessage(false)
         dispatch(reciveMessageSuccess(null))
      }, 4000)
   }

   return (
      <div>
         {
            showMessage && (
               <div className={`left-[34rem] fade-out  top-2 z-50 fixed justify-center shadow mx-auto w-[33rem] border-double border border-slate-800  p-4 bg-red-600 rounded-lg mt-4`}>
                  {message && <p className='text-center'>{message}</p>}
               </div>
            )
         }
      </div>
   )
}
