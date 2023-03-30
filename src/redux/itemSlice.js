import { createSlice } from '@reduxjs/toolkit';
import { createNewItem, getAllItems } from './actions';
import searchInItems from '../utils/searchInItems';

const initialState = {
  //? get items
  items: [],
  unalterableItems: [],
  statusItems: 'idle',
  errorItems: null,

  //? create item
  statusCreateItem: 'idle',
  errorCreateItem: null,

  //? search item
  errorSearch: null,
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    searchItem: (state, action) => {
      let response = searchInItems(action.payload, state.unalterableItems);
      if (!response) {
        state.errorSearch = 'Not found';
        state.items = [];
      } else {
        state.errorSearch = '';
        state.items = response;
      }
      return state;
    },
    setItems: (state) => {
      state.items = state.unalterableItems;
    },
    cleanErrorSearch: (state) => {
      state.errorSearch = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //? get items

      .addCase(getAllItems.pending, (state) => {
        state.statusItems = 'loading';
      })
      .addCase(getAllItems.fulfilled, (state, { payload: { allItems } }) => {
        state.statusItems = 'succeeded';
        state.items = allItems;
        state.unalterableItems = allItems;
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.statusItems = 'failed';
        state.errorItems = action.payload;
      })

      //? create items

      .addCase(createNewItem.pending, (state) => {
        state.statusCreateItem = 'loading';
      })
      .addCase(createNewItem.fulfilled, (state) => {
        state.statusCreateItem = 'succeeded';
      })
      .addCase(createNewItem.rejected, (state, action) => {
        state.statusCreateItem = 'failed';
        state.errorCreateItem = action.payload;
      });
  },
});

export const { searchItem, cleanErrorSearch, setItems } = itemSlice.actions;

export default itemSlice.reducer;
