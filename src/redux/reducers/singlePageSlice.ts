import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URI} from "../../utils/keys";


interface CapitalInfo {
    latlng: number[]
}

interface Car {
    side: string
    signs: string[]
}

interface CoatOfArms {
    png: string
    svg: string
}

interface PKR {
    name: string
    symbol: string
}

interface Currencies {
    PKR: PKR
}

interface Eng {
    f: string
    m: string
}

interface Fra {

    f: string
    m: string
}

interface Demonyms {
    eng: Eng
    fra: Fra
}

interface Flags {
    alt: string
    png: string
    svg: string
}

interface Gini {
    2018: number
}

interface Idd {
    root: string
    suffixes: string[]
}

interface Languages {
    eng: string
    urd: string
}

interface Maps {
    googleMaps: string
    openStreetMaps: string
}

interface Name {
    common: string;
    nativeName: {
        eng: {
            common: string;
            official: string;
        };
        urd: {
            common: string;
            official: string;
        };
        // другие возможные языки
    };
    official: string;
}

interface PostalCode {
    format: string
    regex: string
}

interface Translations {
    [key: string]: {
        common: string;
        official: string;
    };
}


interface Country {
    altSpellings?: string[]
    area?: number
    borders?: string[]
    capital?: string[]
    capitalInfo?: CapitalInfo
    car?: Car
    cca2?: string
    cca3?: string
    ccn3?: string
    cioc?: string
    coatOfArms?: CoatOfArms
    continents?: string[]
    currencies?: Currencies
    demonyms?: Demonyms
    fifa?: string
    flag?: string
    flags?: Flags
    gini?: Gini
    idd?: Idd
    independent?: boolean
    landlocked?: boolean
    languages?: Languages
    latlng?: number[]
    maps?: Maps
    name?: Name
    population?: number
    postalCode?: PostalCode
    region?: string
    startOfWeek?: string
    status?: string
    subregion?: string
    timezones?: string[]
    tld?: string[]
    translations?: Translations
    unMember?: boolean
}

interface initialStateProps {
    country: Country | null,
    changeMode: boolean
}



const initialState:initialStateProps = {
    country: null,
    changeMode: true
}

export const getSinglePage = createAsyncThunk< Country, any,  {rejectValue: string}>(
    'getSinglePage',
    async (args:any,{rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URI}/alpha/${args}`)
            return response.data
        } catch (e: any){
            return rejectWithValue(e.message )
        }
    }
)



const singlePageSlice = createSlice({
    name: 'singlePage',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSinglePage.fulfilled, (state, action) => {
                state.country = null
                state.country = action.payload
            })
    }
})

export default singlePageSlice.reducer