import React from 'react'
import { useDispatch } from 'react-redux'
import { LogoutUser } from '../../utils/UserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MainDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout =()=>{
      dispatch(LogoutUser()); // clear userdata from redux + localStorage
      toast.success("Logout successful");
      navigate("/");
    }
  return (
    <>
    <div>MainDashboard</div>

    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default MainDashboard