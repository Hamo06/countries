import React from 'react';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {changeDarkLight} from "../redux/reducers/homePageSlice";

const Header = () => {

    const dispatch = useAppDispatch()
    const {changeMode} = useAppSelector(state => state.homePageReducer)

    return (
        <div className={`border ${changeMode? 'bg-[#313944] border-[#313944]' : 'bg-[#fff]'}`}>
            <div className={`w-4/5 mx-auto  text-white py-5 flex justify-between  `}>
               <Link
                   className={`text-2xl font-bold ${changeMode? 'text-white' : 'text-black'}`} to='/'
               >
                   Where in the world
               </Link>
                <div className={`flex items-center cursor-pointer ${changeMode? 'text-white' : 'text-black'}`}  onClick={() => dispatch(changeDarkLight(!changeMode))}>
                    {changeMode ? <NightlightRoundIcon/> : <LightModeOutlinedIcon /> }
                    <p className='ml-3 text-lg'  >{changeMode? 'Dark Mode' : 'Light Mode'}</p>
                </div>
            </div>
        </div>
    );
};

export default Header;