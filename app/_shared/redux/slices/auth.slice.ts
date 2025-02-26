import { createSlice } from "@reduxjs/toolkit";



type InitialState = {
    value: any
}

const initialState = {
    value: {
        isAuth: false
    }
} as InitialState


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {

    }
})