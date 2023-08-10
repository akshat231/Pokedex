import { configureStore } from "@reduxjs/toolkit"
import pokereducer from './PokeSlice';
const store = configureStore({
    reducer: {
      pokeurl:pokereducer,
    },
  })
  export default store;