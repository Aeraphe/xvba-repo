import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PackagesHttpService from "../services/packagesHttp.service";

export const fetchPackagesByUserId = createAsyncThunk(
    'packages/fetchByUserId',
    async () => {
        const response = await PackagesHttpService.getUserAuthPackages();
        return response.data
    }
)

export const userPackagesSlice = createSlice({

    name: 'user-packages',
    initialState: {
        entities: [],
        loading: 'idle',
        currentRequestId: undefined,
        error: null
    },
    reducers: {},
    extraReducers: {

        [fetchPackagesByUserId.fulfilled]: (state, action) => {
            state.entities = action.payload
        }

    }

})

export default userPackagesSlice.reducer