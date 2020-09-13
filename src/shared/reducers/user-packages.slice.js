import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PackagesHttpService from "../services/packagesHttp.service";



export const fetchPackagesByUserId = createAsyncThunk(
    'packages/fetchByUserId',
    async () => {
        const response = await PackagesHttpService.getUserAuthPackages();
        return response.data
    }
)


export const deleteUserPackage = createAsyncThunk(
    'packages/deleteById',
    async (id) => {
        const response = await PackagesHttpService.delete(id);
        return response.data
    }
)

export const userPackagesSlice = createSlice({

    name: 'user-packages',
    initialState: {
        entities: [],
        loading: 'idle',
        currentRequestId: undefined,
        deleted: null,
        error: null
    },
    reducers: {},
    extraReducers: {

        [fetchPackagesByUserId.fulfilled]: (state, action) => {
            state.entities = action.payload
        },
        [deleteUserPackage.fulfilled]: (state, action) => {
            state.deleted = action.payload
        }

    }

})



export default userPackagesSlice.reducer