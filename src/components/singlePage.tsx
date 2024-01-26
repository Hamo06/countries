import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks";
import {population} from "../redux/reducers/homePageSlice";
import {getSinglePage} from "../redux/reducers/singlePageSlice";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const SinglePage = () => {

    const {title} = useParams()
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {country} = useAppSelector(state => state.singlePageReducer)
    const { changeMode } = useAppSelector(state => state.homePageReducer)

    useEffect(()=>{
        dispatch(getSinglePage(title))
    },[title])


if (!Array.isArray(country))  return <div>asdsad</div>

    const [singleCountry] =  country
    const {flags , name, region, subregion, capital, tld, currencies, borders, maps} = singleCountry

    console.log(singleCountry,'singleCountry')

   const languages = Object.keys(singleCountry.languages)
   const [currency] = Object.keys(singleCountry.currencies)

    return (
        <div className={`${changeMode? 'bg-[#273039]' : 'bg-[#fafafa]' } min-h-[calc(100vh-74px)]`}>
            <div className='w-4/5 mx-auto'>
                <button
                    className={`my-12 md:my-24 px-10 py-2 shadow-2xl rounded-md   
                    ${changeMode? 'bg-[#313944] text-white' : 'bg-[#fff] text-black'}`}
                    onClick={()=> navigate('/')}

                >
                    <KeyboardBackspaceIcon /> Back
                </button>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='w-[100%] md:w-[45%] ' >
                        <img className='w-full h-[30vh] md:h-[50vh]  mx-auto object-cover '
                             src={flags.png}
                             alt={flags.png}
                        />
                    </div>
                    <div className={`w-[100%] md:w-1/2 mt-8 md:m-0 ${changeMode? 'text-[#fafafa]' : 'text-[#273039]]' } `}>
                        <h2 className='mb-10 md:mb-20 font-bold text-2xl'>{name.common}</h2>
                        <div className='md:flex mb-10 md:mb-0 '>
                            <div className='mb-10 md:mr-40'>
                                <p className='mb-5' >Population: <span className='text-[#a9a9a9]' >{population(singleCountry.population)}</span></p>
                                <p className='mb-5' >Region: <span className='text-[#a9a9a9]' >{region}</span></p>
                                <p className='mb-5' >Sub Region: <span className='text-[#a9a9a9]' >{subregion}</span></p>
                                <p className='mb-5' >Capital: <span className='text-[#a9a9a9]' >{capital[0]}</span></p>
                            </div>
                            <div>
                                {!!tld.length && <p className='mb-5'>Top Level Domain: <span
                                    className='text-[#a9a9a9]'>{tld[0]}</span></p>}
                                <p className='mb-5' >Currencies: <span className='text-[#a9a9a9]' >{currencies[currency].name}  ( {currencies[currency].symbol} )</span></p>
                                <p className='mb-5' >Languages:
                                    {
                                        languages.map(language => <span
                                            key={language}
                                            className='mx-2 text-[#a9a9a9]'
                                        >
                                                {singleCountry.languages[language]}</span>)
                                    }
                                </p>
                                <a href={maps.googleMaps} target='_blank' >Google Maps: <span className='text-[#a9a9a9]' >{name.common}</span></a>
                            </div>
                        </div>
                        <div className='flex '>
                            <p className='min-w-[130px]'>Border Countries: </p>
                            <div className='flex flex-wrap'>
                                {
                                    !!borders ? borders.map((item: string )=> {
                                            return  <button key={item}
                                                            onClick={()=> navigate(`/country/${item}`)}
                                                            className={`ml-3 mb-3 px-8 py-1 shadow-2xl rounded  ${changeMode ? 'bg-[#313944] text-white' : 'bg-[#fff] text-black'} `}
                                            >

                                                {item}
                                            </button>
                                        }):
                                        <div
                                            className={`ml-3 px-8 py-1 shadow-2xl rounded  ${changeMode ? 'bg-[#313944] text-white' : 'bg-[#fff] text-black'} `}
                                        >
                                            <HorizontalRuleIcon />
                                        </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SinglePage;