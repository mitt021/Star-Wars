import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApiGet } from 'api'
import { StatusEnum } from 'redux/types'
import { toast } from 'react-toastify'
import { IAllCharacters, ICharactersState } from 'redux/characters/interface'

export const initialState: ICharactersState = {
  charactersStatus: StatusEnum.Idle,
  allCharacters: [],
}

export const fetchCharacters = createAsyncThunk('characters/getCharacters', async (page: number, thunkAPI) => {
  try {
    const response = await ApiGet(`people/?page=${page}`)
    if (response) {
      return thunkAPI.fulfillWithValue(response)
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.detail, { autoClose: 2000 })
    return thunkAPI.rejectWithValue(error)
  }
})

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchCharacters
    builder.addCase(fetchCharacters.pending, (state) => {
      state.charactersStatus = StatusEnum.Pending
    })
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.charactersStatus = StatusEnum.Success
      const actionPayload = action.payload as { results: IAllCharacters[] }
      state.allCharacters = actionPayload.results
    })
    builder.addCase(fetchCharacters.rejected, (state) => {
      state.charactersStatus = StatusEnum.Failed
    })
  },
})

export default charactersSlice.reducer
