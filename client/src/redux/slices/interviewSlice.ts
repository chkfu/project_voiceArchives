import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import short from 'short-uuid';

// Define a type for the slice state
export interface InterviewState {
  _id: string;
  time: number;
  venue: string;
  host: string;
  _guest: string;
  language: string;
  title: string;
  summary: string;
  auth: boolean;
  created_at: number;
  updated_at: number | null;
}

// Define the initial state using that type
const initialState: InterviewState = {
  _id: short.uuid().split("-").join("").slice(0, 8).toUpperCase(),
  title: "",
  summary: "",
  time: new Date().getTime(),
  venue: "",
  host: "",
  _guest: "",
  language: 'en-uk',
  auth: false,
  created_at: new Date().getTime(),
  updated_at: null
};

export const interviewSlice = createSlice({
  name: 'interview',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateSummary: (state, action: PayloadAction<string>) => {
      state.summary = action.payload;
    },
    updateTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    updateVenue: (state, action: PayloadAction<string>) => {
      state.venue = action.payload;
    },
    updateHost: (state, action: PayloadAction<string>) => {
      state.host = action.payload;
    },
    updateGuest: (state, action: PayloadAction<string>) => {
      state._guest = action.payload;
    },
    updateLang: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    updateAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    resetAll: (state) => {
      state._id = short.uuid().split("-").join("").slice(0, 8).toUpperCase(),
        state.title = "",
        state.summary = "",
        state.time = new Date().getTime(),
        state.venue = "",
        state.host = "",
        state._guest = "",
        state.language = 'en-uk',
        state.auth = false,
        state.created_at = new Date().getTime(),
        state.updated_at = null;
    },
  },
});

export const { updateId, updateTitle, updateSummary, updateHost, updateGuest, updateTime, updateVenue, updateLang, updateAuth, resetAll } = interviewSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export default interviewSlice.reducer;


