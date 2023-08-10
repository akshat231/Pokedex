import { createSlice } from "@reduxjs/toolkit";

const PokeSlice=createSlice({
    name:"Pokemon",
    initialState:{
        imageurl:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/200653/psykokwak.gif"
    },
    reducers:{
        changeimageurl:(state,name)=>{
            state.imageurl=name.payload;
        }
    }
});
export const { changeimageurl }=PokeSlice.actions;
export default PokeSlice.reducer;