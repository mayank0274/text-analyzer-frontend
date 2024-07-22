import { createSlice } from "@reduxjs/toolkit";

export interface IAnalysis {
  summary: string;
  sentimentAnalysis: string;
  topics: string;
  keywords: string;
}

const initialState: { analysis: IAnalysis } = {
  analysis: {
    summary: "",
    sentimentAnalysis: "",
    topics: "",
    keywords: "",
  },
};

const analysisSlice = createSlice({
  initialState,
  name: "analysis",
  reducers: {
    setAnalysisResult(state, action) {
      state.analysis = action.payload.result;
    },
  },
});

export const { setAnalysisResult } = analysisSlice.actions;

export default analysisSlice.reducer;
