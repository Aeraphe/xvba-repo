import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PackageHttpService from "../services/packagesHttp.service";
import { DBServices } from "../services/indexddb/db.service";

export const searchPackagesThunk = createAsyncThunk(
    'packages/fuse-search',
    async (search) => {
        const response = await PackageHttpService.fuseSearch(search);
        const db = await DBServices.open();
        await DBServices.clear('packages', db);
        await DBServices.update(response.data, 'packages', db);
        await DBServices.clear('search', db);
        await DBServices.update([{ search }], 'search', db);
        return { data: response.data, search }
    }
)


export const getSearchPackagesThunk = createAsyncThunk(
    'packages/get-search-result',
    async () => {
        const db = await DBServices.open();
        const data = await DBServices.getAll('packages', db);
        return { data }
    }
)

export const getSearchTextThunk = createAsyncThunk(
    'packages/get-search-text',
    async () => {
        const db = await DBServices.open();
        const data = await DBServices.getAll('search', db);
       
        return { ...data[0] }
    }
)

export const searchPackageSlice = createSlice({
    name: 'search-packages',
    initialState: {
        search: null,
        entities: [],
        error: null
    }, reducers: {},
    extraReducers: {
        [searchPackagesThunk.fulfilled]: (state, action) => {
            state.entities = action.payload.data

        },
        [getSearchPackagesThunk.fulfilled]: (state, action) => {

            state.entities = action.payload.data
        },
        [getSearchTextThunk.fulfilled]: (state,action) => {
            state.search = action.payload.search
        }
    }
})


export default searchPackageSlice.reducer