import { configureStore } from '@reduxjs/toolkit';

// 
export const store = configureStore({
    reducer: {}
});

// Because we are working on typescript, we need to export two types(Types of the Store and Types of the State)
// ReturnType is a typescript utility type that returns the type of a function.
// In this case, the function is store.getState().

// We will have the return type from the store.getState() function as a root state.
// Have access through typescript to all the states in the store using the RootState type.
export type RootState = ReturnType<typeof store.getState>;
// The AppDispatch will be very useful when dealing with async actions.
export type AppDispatch = typeof store.dispatch;