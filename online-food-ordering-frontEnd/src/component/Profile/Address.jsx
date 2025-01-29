import React, { useEffect } from 'react'
import AddressCard from '../Cart/AddressCard'
import { useDispatch, useSelector } from 'react-redux';
import { getAddressByUserId } from '../State/Address/Thunk';


export default function Address() {

  const dispatch = useDispatch();

  const userId = useSelector(state => state.auth.user?.id);


  useEffect(() => {
    dispatch(getAddressByUserId(userId))
 }, [])

  
  return (
    <div>
      <AddressCard isOpen={false}/>
    </div>
  )
}
