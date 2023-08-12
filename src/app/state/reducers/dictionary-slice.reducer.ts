// src/store/dictionarySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DictionaryState {
  words: Record<string, string>;
}

const initialState: DictionaryState = {
  words: {},
};

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<{ word: string; definition: string }>) => {
      const { word, definition } = action.payload;
      state.words[word] = definition;
    },
  },
});

export const { addWord } = dictionarySlice.actions;
export default dictionarySlice.reducer;
