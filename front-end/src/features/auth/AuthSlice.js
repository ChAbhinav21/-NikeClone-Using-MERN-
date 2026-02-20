// front-end/src/features/auth/AuthSlice.js
import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import { createUser,fetchUser,fetchCurrentUser } from "./authApi";

const initialState={ 
    status:'idle',
    currentUser :null,
    LogginError:null,
 
}
export const createUserAsync = createAsyncThunk(
    "auth/createUser",
    async(user)=>{
        const response = await createUser(user);
        console.log("response from createUSerAsync"+response)
        return response;
    }
)

export const fetchUserAsync = createAsyncThunk(
    "auth/fetchUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetchUser(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message); // <-- now payload has error
        }
    }
);

// Auto-login via cookie
export const fetchCurrentUserAsync = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            return await fetchCurrentUser();
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const authSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
         .addCase(createUserAsync.pending,(state)=>{
            state.status = 'loading';
         })
         .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.status ='idle';
            state.currentUser = (action.payload);
         })
         .addCase(fetchUserAsync.pending,(state)=>{
            state.status = "loading"
         })
         .addCase(fetchUserAsync.fulfilled,(state,action)=>{
            state.status='idle'
            state.currentUser = action.payload
         })
         .addCase(fetchUserAsync.rejected,(state,action)=>{
            state.status = 'idle'
            state. LogginError = action.payload
         })
        .addCase(fetchCurrentUserAsync.pending,(state)=>{
    state.status = "loading"
})
.addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
    state.status = "idle";   
    state.currentUser = action.payload;
})
.addCase(fetchCurrentUserAsync.rejected, (state) => {
    state.status = "idle";    
    state.currentUser = null;
});

    }
})

export const selectCreateUser =(state)=>state.user.currentUser 
export const selectCurrentUser = (state)=>state.user.currentUser
export const selectLogginError = (state)=>state.user.LogginError
export const selectStatus = (state)=>state.user.status
export default authSlice.reducer