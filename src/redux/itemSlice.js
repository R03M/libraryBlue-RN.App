import { createSlice } from '@reduxjs/toolkit';
import { createNewItem, getAllItems } from './actions';

const initialState = {
  //? get items
  items: [],
  unalterableItems: [],
  statusItems: 'idle',
  errorItems: null,

  //? create item
  statusCreateItem: 'idle',
  errorCreateItem: null,
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {},
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

// export const { searchAtItem } = itemSlice.actions;

export default itemSlice.reducer;
