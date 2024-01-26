import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URI} from "../../utils/keys";

// interface Flag {
//     svg: string;
//     png: string;
//     alt?: string;
// }
//
// interface Currency {
//     code: string;
//     name: string;
//     symbol: string;
// }
//
// interface Language {
//     iso639_1: string;
//     iso639_2: string;
//     name: string;
//     nativeName: string;
// }
//
// interface Translation {
//     [key: string]: string;
// }
//
// interface RegionalBloc {
//     acronym: string;
//     name: string;
// }
//
// interface Country {
//     name: string;
//     topLevelDomain: string[];
//     alpha2Code: string;
//     alpha3Code: string;
//     callingCodes: string[];
//     capital: string;
//     altSpellings: string[];
//     subregion: string;
//     region: string;
//     population: number;
//     latlng: number[];
//     demonym: string;
//     area: number;
//     timezones: string[];
//     borders: string[];
//     nativeName: string;
//     numericCode: string;
//     flags: Flag;
//     currencies: Currency[];
//     languages: Language[];
//     translations: Translation;
//     flag: string;
//     regionalBlocs: RegionalBloc[];
//     cioc: string;
//     independent: boolean;
// }

interface Translation {
    common: string;
    official: string;
}

interface PostalCode {
    format: string;
    regex: string;
}

interface Flags {
    png: string;
    svg: string;
}

interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

interface Name {
    common: string;
    nativeName: { [key: string]: string };
    official: string;
}


interface Country {
    altSpellings: string[];
    area: number;
    capital: string[];
    capitalInfo: { latlng: number[] };
    car: { side: string; signs: string[] };
    cca2: string;
    cca3: string;
    ccn3: string;
    coatOfArms: Flags;
    continents: string[];
    currencies: { [key: string]: { name: string; symbol: string } };
    demonyms: { [key: string]: { [key: string]: string } };
    flag: string;
    flags: Flags;
    idd: { root: string; suffixes: string[] };
    independent: boolean;
    landlocked: boolean;
    languages: { [key: string]: string };
    latlng: number[];
    maps: Maps;
    name: Name;
    population: number;
    postalCode: PostalCode;
    region: string;
    startOfWeek: string;
    status: string;
    subregion: string;
    timezones: string[];
    tld: string[];
    translations: { [key: string]: Translation };
    unMember: boolean;
}


interface initialStateProps {
    Countries: Country[],
    changeMode: boolean
}



const initialState:initialStateProps = {
    Countries: [],
    changeMode: true
}

export function population(num:number)  {
    const args = num.toString()
    const population:any = []
    args.toString().split('').reverse().map((item, index)=> {

        population.push(item)
        if((index === 2 && args.length-1 !== index ) || (index === 5 && args.length-1 !== index ) || (index === 8 && args.length-1 !== index )){
            population.push(',')
        }
    })


    return population.reverse().join('')
}


export const getHomePage = createAsyncThunk< Country[], any,  {rejectValue: string}>(
    'getHomePage',
    async (args:any,{rejectWithValue}) => {

        try {
            const response = await axios.get(`${API_URI}/${args}`)
            return response.data
        } catch (e: any){
            return rejectWithValue(e.message )
        }
    }
)



const homePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        changeDarkLight: (state, action: PayloadAction<boolean>) => {
            state.changeMode = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHomePage.fulfilled, (state, action) => {
                state.Countries = action.payload
            })
    }
})

export const {changeDarkLight} = homePageSlice.actions
export default homePageSlice.reducer