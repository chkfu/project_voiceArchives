import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define a type for the slice state
export interface RecognizerState {
  // 1. main states - passive
  currentCaseId: string;
  currentSpeaker: string;
  currentSection: number;
  newMsg: string[][];
  audioURL: string;
  // 2. additional status - buttons
  infoStatus: boolean;
  mediaStatus: boolean;
  userDeviceStatus: boolean;
  recordingStatus: string,
  recognizerStatus: boolean;
  // 3. display - hidden information
  caseInfoStatus: boolean;
  langListStatus: boolean;
}

// Define the initial state using that type
const initialState: RecognizerState = {
  // 1. main states - passive
  currentCaseId: "default",
  currentSpeaker: "host",
  currentSection: 1,
  newMsg: [["system", "#### Section 1 ####"]],
  audioURL: "",
  // 2. additional status - buttons
  infoStatus: false,
  mediaStatus: false,
  userDeviceStatus: false,
  recordingStatus: "inactive",
  recognizerStatus: false,
  // 3. display - hidden information
  caseInfoStatus: false,
  langListStatus: false,
};

export const recognizerSlice = createSlice({
  name: 'recognizer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // 1. Main - Passive 
    updateCaseId: (state, action: PayloadAction<string>) => {
      state.currentCaseId = action.payload;
    },
    switchSpeaker: (state, action: PayloadAction<string>) => {
      state.currentSpeaker = action.payload;
    },
    updateSectNum: (state) => {
      state.currentSection += 1;
    },
    updateMsgs: (state, action: PayloadAction<string[][]>) => {
      if (state.newMsg[state.newMsg.length - 1][0] === state.currentSpeaker) {
        state.newMsg[state.newMsg.length - 1][1] = `${state.newMsg[state.newMsg.length - 1][1]} ${action.payload[0][1]}`;
      }
      else {
        state.newMsg = [...state.newMsg, ...action.payload];
      }
    },
    updateAudioURL: (state, action: PayloadAction<string>) => {
      state.audioURL = action.payload;
    },
    // 2. Additional - Control Panel
    breakSection: (state, action: PayloadAction<string[]>) => {
      state.newMsg = [...state.newMsg, action.payload];
    },
    setMediaStatus: (state) => {
      if (!state.mediaStatus)
        state.mediaStatus = true;
    },
    setUserDeviceStatus: (state, action: PayloadAction<boolean>) => {
      state.userDeviceStatus = action.payload;
    },
    setRecording: (state, action: PayloadAction<string>) => {
      state.recordingStatus = action.payload;
    },
    setRecognizer: (state, action: PayloadAction<boolean>) => {
      state.recognizerStatus = action.payload;
    },
    resetRecog: (state) => {
      state.newMsg = [["system", "#### Section 1 ####"]];
      state.audioURL = "";
      state.currentSpeaker = "host";
      state.currentSection = 1;
      state.recognizerStatus = false;
      state.recordingStatus = 'inactive';
      state.infoStatus = false;
      state.langListStatus = false;
    },
    nextResetRecog: (state) => {
      state.currentSpeaker = "host";
      state.currentSection = 1;
      state.recognizerStatus = false;
      state.recordingStatus = 'inactive';
      state.infoStatus = false;
      state.langListStatus = false;
    },
    // 3. display - hidden information
    showCaseInfo: (state) => {
      if (!state.caseInfoStatus) {
        state.caseInfoStatus = true;
        state.langListStatus = false;
      }
      else {
        state.caseInfoStatus = false;
        state.langListStatus = false;
      }
    },
    showLangList: (state) => {
      if (!state.langListStatus) {
        state.langListStatus = true;
        state.caseInfoStatus = false;
      }
      else {
        state.langListStatus = false;
        state.caseInfoStatus = false;
      }
    },
    closeLists: (state) => {
      state.caseInfoStatus = false;
      state.langListStatus = false;
    }
  },
});

export const {
  switchSpeaker,
  updateMsgs,
  updateAudioURL,
  resetRecog,
  nextResetRecog,
  setMediaStatus,
  setUserDeviceStatus,
  setRecognizer,
  setRecording,
  breakSection,
  updateSectNum,
  showCaseInfo,
  showLangList,
  closeLists
} = recognizerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export default recognizerSlice.reducer;


