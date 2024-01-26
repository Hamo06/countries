import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import SearchIcon from '@mui/icons-material/Search';
import {getHomePage, population} from "../redux/reducers/homePageSlice";
import {Link, useParams} from "react-router-dom";
import {getSinglePage} from "../redux/reducers/singlePageSlice";


const HomePage = () => {
    const dispatch = useAppDispatch()
    const {Countries , changeMode } = useAppSelector(state => state.homePageReducer)
    const [region, setRegion] = useState('all');
    const [searchCountry, setSearchCountry] = useState('');

    useEffect(() =>{
        dispatch(getHomePage(region === 'all' ? region : `region/${region}`))
    },[region])

    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleOtherElementClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const filterCountry = Countries.filter(country => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

    return (
        <div className={`min-h-[100vh] ${changeMode? 'bg-[#273039]' : 'bg-[#fafafa]' } pt-10 `}>
            <div className='w-4/5 mx-auto'>
                <div className=' md:flex justify-between mb-10' >
                    <div className={`mb-5 md:mb-0 ${changeMode? 'border-[#313944]' : 'border-[#dfe6e9]'} `}>
                        <label
                            className={` p-[18px] rounded-s-lg cursor-pointer  ${changeMode? 'bg-[#313944]' : ' bg-[#fff]'}`}
                            onClick={handleOtherElementClick}
                        >
                            
                            <SearchIcon
                                className='text-[#a9a9a9]'
                                style={{fontSize:'30px'}}
                            />
                        </label>
                        <input
                            type='text'
                            ref={inputRef}
                            placeholder='Search for a country ...'
                            className={`w-[calc(100%-66px)] md:w-[500px] p-4 outline-0 rounded-r-lg text-[#a9a9a9]  placeholder:text-[#a9a9a9]  ${changeMode? 'bg-[#313944]' : ' bg-[#fff]'}`}
                            onChange={ e => setSearchCountry(e.target.value)}
                        />

                    </div>
                    <select
                        className={`w-[200px] py-3 px-3 border rounded-lg outline-0 text-[#a9a9a9]    
                         ${changeMode? ' border-[#313944] bg-[#313944] ' : 'bg-[#fff]'}`}
                        onChange={e => setRegion(e.target.value)}
                    >
                        <option value="all" >All region</option>
                        <option value="africa" >Africa</option>
                        <option value="america" >America</option>
                        <option value="asia" >Asia</option>
                        <option value="europe" >Europe</option>
                        <option value="oceania" >Oceania</option>
                    </select>
                </div>
                <div className='flex flex-wrap justify-center md:justify-between gap-28' >
                    {
                        (!!searchCountry.length ? filterCountry : Countries).map((country) => {
                            return (
                                <div
                                    className={`w-[19%] min-w-[290px] rounded-lg 
                                    ${changeMode? 'bg-[#313944] text-white' : 'bg-[#fff] text-black'}`}
                                    key={country.name.common}
                                >
                                    <Link to={`country/${country.cca3}`}
                                          onClick={()=> dispatch(getSinglePage(country.cca3))}
                                    >
                                    <div
                                        className=' h-[200px]'
                                    >

                                        <img className=' w-full h-full object-cover '
                                             src={country.flags.svg}
                                             alt={country.name.common}
                                        />

                                    </div>
                                    </Link>
                                    <div className='ml-5 mt-7 mb-12'>
                                        <h1 className='text-xl mb-5 font-bold'>
                                            {country.name.common}
                                        </h1>

                                        <div>
                                            <p>Population: <span className='text-[#a9a9a9]' >{population(country.population)}</span></p>
                                            <p>Region: <span className='text-[#a9a9a9]' >{country.continents}</span></p>
                                            <p>Capital: <span className='text-[#a9a9a9]' >{country.capital}</span></p>
                                            <a href={country.maps.googleMaps} target='_blank' >Google Maps: <span className='text-[#a9a9a9]' >{country.name.common}</span></a>
                                        </div>
                                    </div>

                                </div>

                            )
                        })
                    }
                </div>

            </div>
        </div>
    );
};

export default HomePage;