import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";


export const createUser = createAsyncThunk('createUser', async (result, {rejectWithValue}) => {

    const response = await fetch('https://641451f936020cecfda538c5.mockapi.io/users',{
        method : 'POST',
        headers : {
            'content-type' : "application/json",
        },
        body:JSON.stringify(result)
    }) ; 

            try {

                const dataResult = await response.json();
                return dataResult 
                
            } catch (error) {
                return rejectWithValue(error)
            }

} );

export const readUser = createAsyncThunk('readUser', async (result, {rejectWithValue}) => {

    const response = await fetch('https://641451f936020cecfda538c5.mockapi.io/users') ; 

        try {
            const dataResult = await response.json();
            return dataResult 
            
        } catch (error) {
            return rejectWithValue(error)
        }

} );

export const deleteUser = createAsyncThunk('deleteUser', async (id, {rejectWithValue}) => {

    const response = await fetch(`https://641451f936020cecfda538c5.mockapi.io/users/${id}`,{method : 'DELETE'}) ; 

        try {
            const dataResult = await response.json();
            return dataResult 
            
        } catch (error) {
            return rejectWithValue(error)
        }

} );

export const updateUser = createAsyncThunk('updateUser', async (result, {rejectWithValue}) => {

    const response = await fetch(`https://641451f936020cecfda538c5.mockapi.io/users/${result.id}`,{
        method : 'PUT',
        headers : {
            'content-type' : "application/json",
        },
        body:JSON.stringify(result)
    }) ; 

        try {
            const dataResult = await response.json();
            return dataResult 
            
        } catch (error) {
            return rejectWithValue(error)
        }

} );


const userSlice = createSlice({

    name: 'user',
    initialState:{
        data : [],
        dataPerPage : 10,
        currentPage : 1,
        loading:false,
        error:null
    },
    reducers:{

      onNavigateNext: (state)=>{
        state.currentPage++;
      },

      onNavigatePrev: (state)=>{
        state.currentPage--;
      },

      onChangedataPerPage: (state,action)=>{
        state.dataPerPage = action.payload
      },
      onClickCurrentPage: (state,action)=>{
        state.currentPage = action.payload
      },
      },


 

    extraReducers:{

        [createUser.pending] : (state) =>{
             state.loading = true;
        },
        [createUser.fulfilled] : (state,action) => {
            state.loading = false;
            console.log(action.payload);
            state.data.push(action.payload);
        },
        [createUser.rejected] : (state,action) =>{
            state.loading = false;
            state.error = action.payload.message
        },


        [readUser.pending] : (state) =>{
             state.loading = true;
        },
        [readUser.fulfilled] : (state,action) => {
            state.loading = false;
            state.data = action.payload ;
        },
        [readUser.rejected] : (state,action) =>{
            state.loading = false;
            state.error = action.payload
        },



        [deleteUser.pending] : (state) =>{
             state.loading = true;
        },
        [deleteUser.fulfilled] : (state,action) => {
            state.loading = false;
            const {id} = action.payload;
           state.data = state.data.filter((element) => element.id !== id)
        },
        [deleteUser.rejected] : (state,action) =>{
            state.loading = false;
            state.error = action.payload
        },


        
        [updateUser.pending] : (state) =>{
            state.loading = true;
       },
       [updateUser.fulfilled] : (state,action) => {
           state.loading = false;
           const {id} = action.payload;

           let index = state.data.findIndex(
            (item) => item.id === id
          )
          state.data[index].username = action.payload.username
          state.data[index].password = action.payload.password
       },
       [updateUser.rejected] : (state,action) =>{
           state.loading = false;
           state.error = action.payload.message
       },

     



    }

    
});

export const userAction = userSlice.actions;

export default userSlice.reducer;