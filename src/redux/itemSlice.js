import { createSlice } from '@reduxjs/toolkit';
import {
  createNewItem,
  deleteItem,
  getAllItems,
  action_UpdateItem,
  action_CreateManyItems,
  action_DisconnectOfCompany,
  action_DisassociatedCompany,
  action_CloseSession,
} from './actions';
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
  errorSearch: false,

  //? delete item
  statusDeleteItem: 'idle',
  errorDeleteItem: null,

  //? update item
  statusUpdateItem: 'idle',
  errorUpdateItem: null,

  //? create many item
  statusCreateManyItems: 'idle',
  errorCreateManyItems: null,
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    searchItem: (state, action) => {
      let response = searchInItems(action.payload, state.unalterableItems);
      if (!response) {
        state.errorSearch = true;
        state.items = [];
      } else {
        state.errorSearch = false;
        state.items = response;
      }
      return state;
    },
    setItems: (state) => {
      state.items = state.unalterableItems;
    },
    cleanErrorSearch: (state) => {
      state.errorSearch = false;
    },
    cleanStatusCreateItem: (state) => {
      state.statusCreateItem = 'idle';
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
      .addCase(createNewItem.fulfilled, (state, { payload: { newItem } }) => {
        state.statusCreateItem = 'succeeded';
        state.items.push(newItem);
        state.unalterableItems.push(newItem);
      })
      .addCase(createNewItem.rejected, (state, action) => {
        state.statusCreateItem = 'failed';
        state.errorCreateItem = action.payload;
      })

      //? delete item

      .addCase(deleteItem.pending, (state) => {
        state.statusDeleteItem = 'loading';
      })
      .addCase(deleteItem.fulfilled, (state, { payload: { id } }) => {
        state.statusDeleteItem = 'succeeded';
        state.items = state.items.filter((item) => item.id !== id);
        state.unalterableItems = state.unalterableItems.filter(
          (item) => item.id !== id
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.statusDeleteItem = 'failed';
        state.errorDeleteItem = action.payload;
      })

      //? update item

      .addCase(action_UpdateItem.pending, (state) => {
        state.statusUpdateItem = 'loading';
      })
      .addCase(
        action_UpdateItem.fulfilled,
        (state, { payload: { itemUpdated } }) => {
          state.statusUpdateItem = 'succeeded';

          state.items = state.items.map((item) =>
            item.id === itemUpdated.id ? itemUpdated : item
          );

          state.unalterableItems = state.unalterableItems.map((item) =>
            item.id === itemUpdated.id ? itemUpdated : item
          );
        }
      )
      .addCase(action_UpdateItem.rejected, (state, action) => {
        state.statusUpdateItem = 'failed';
        state.errorUpdateItem = action.payload;
      })

      //? create many items

      .addCase(action_CreateManyItems.pending, (state) => {
        state.statusCreateManyItems = 'loading';
      })
      .addCase(
        action_CreateManyItems.fulfilled,
        (state, { payload: { allItems } }) => {
          state.statusCreateManyItems = 'succeeded';
          state.items = allItems;
          state.unalterableItems = allItems;
        }
      )
      .addCase(action_CreateManyItems.rejected, (state, action) => {
        state.statusCreateManyItems = 'failed';
        state.errorCreateManyItems = action.payload;
      })

      //? delete data items when user disconnect of the company

      .addCase(action_DisconnectOfCompany.fulfilled, (state) => {
        state.items = [];
        state.unalterableItems = [];
      })

      // ? disassociated company
      .addCase(
        action_DisassociatedCompany.fulfilled,
        (state, { payload: { idCompany } }) => {
          state.statusDisassociatedComp = 'succeeded';
          state.items = state.items.filter(
            (item) => item.companyId === idCompany
          );
          state.unalterableItems = state.unalterableItems.filter(
            (item) => item.companyId === idCompany
          );
        }
      )

      // ? clear items at logoff
      .addCase(action_CloseSession.fulfilled, (state) => {
        state.items = [];
        state.unalterableItems = [];
      });
  },
});

export const { searchItem, cleanErrorSearch, setItems, cleanStatusCreateItem } =
  itemSlice.actions;

export default itemSlice.reducer;
