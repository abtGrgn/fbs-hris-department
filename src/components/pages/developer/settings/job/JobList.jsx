import Header from '@/components/partials/Header'
import Navigation from '@/components/partials/Navigation'
import { BsBarChartLineFill } from "react-icons/bs";
import React, { useContext } from 'react'
import { GoChevronRight } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';
import Footer from '@/components/partials/Footer';
import { StoreContext } from '@/store/storeContext';
import { setIsSettingsOpen } from '@/store/storeAction';

const JobList = () => {
    const {store, dispatch} = useContext(StoreContext);

     // used para mapanatili na bukas ang settings kahit ma-refresh
  React.useEffect(() => {
    dispatch(setIsSettingsOpen(true));
  }, []);

  return (
    <>
        <Header avatar="LR"/>
        <div className="flex">
            <Navigation menu="settings" submenu="job"/>
            <div className="px-4 py-1 ml-7 pb-0 w-full h-[calc(100vh-60px)] flex flex-col justify-between">
                <div className="h-screen">
                    <div className="list-content">
                        <h2>Job</h2>
                    </div>
                    <div className="list-content-button">
                    <Link to="/settings/job/level">
                        <button className='group'>
                            <span className='font-semibold'><BsBarChartLineFill size={20}/>Job Level</span>
                            <GoChevronRight className="group-hover:bg-[#9f1659] group-hover:text-white border duration-200 border-gray-300 rounded-md inline-block w-[2rem] h-[2rem] py-1" />
                        </button>
                    </Link>
                    <Link to="/settings/job/title">
                        <button className='group'>
                            <span className='font-semibold'><FaUserTie size={20}/>Job Title</span>
                            <GoChevronRight className="group-hover:bg-[#9f1659] group-hover:text-white border duration-200 border-gray-300 rounded-md inline-block w-[2rem] h-[2rem] py-1" />
                        </button>
                    </Link>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    </>
  )
}

export default JobList
