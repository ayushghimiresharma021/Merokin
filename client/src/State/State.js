import { createSlice, configureStore } from '@reduxjs/toolkit' ;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        userDetails : null,
        places:null,
        bookings:null,
        reserve:null
    },

    reducers:{
        setToken: (state,action) => {
            state.token = action.payload.token
        },
        setUserDetails : (state,action) => {
            state.userDetails = action.payload.user
        },
        setSpecificPlaces: (state,action) => {
            state.places = action.payload.places
        },
        setBooks:(state,action) => {
            state.bookings = action.payload.bookings
        },
        setReservation:(state,action) => {
            state.reserve = action.payload.reservation
        }
    }
})

export const {setToken,setUserDetails,setSpecificPlaces,setBooks,setReservation} = userSlice.actions ;

export default userSlice.reducer
