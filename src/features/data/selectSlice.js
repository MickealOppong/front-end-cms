import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attributeList: [],
  categoryList: [],
  currency: JSON.parse(localStorage.getItem('currency')) || { iso: 'EUR', fx: 1 }
}

const selectSlice = createSlice({
  name: 'listView',
  initialState,
  reducers: {
    addToList: (state, action) => {
      const { title, list, index } = action.payload;
      if (!title || !list) return
      let item = state.attributeList.find((a, i) => i === index);
      if (item) {
        item.title = title;
        item.list = list;
        return
      }

      state.attributeList.push({ title, list })
    },
    clear: (state) => {
      state.attributeList = [];
      state.categoryList = [];
    },
    addToCategory: (state, action) => {
      const { value, index } = action.payload;
      if (!value) return
      let item = state.categoryList.find((_, i) => i === index);
      if (item) {
        item.value = value;
        return
      }
      state.categoryList.push({ value })

    },
    removeItem: (state, action) => {
      const { title, sku } = action.payload;
      let item = state.attributeList.find((f) => f.title === title);

      item.list = item.list.reduce((acc, value) => {
        if (value !== sku) {
          acc.push(value)
        }
        return acc;
      }, [])
      selectSlice.caseReducers.gc(state, title)
    },
    add: () => { },
    gc: (state) => {
      state.attributeList = state.attributeList.reduce((acc, value) => {
        if (value.list.length !== 0) {
          acc.push(value)
        }
        return acc;
      }, [])
    },
    removeIndex: (state, action) => {
      const { i, type } = action.payload;
      if (type === 'attribute') {
        state.attributeList = state.attributeList.reduce((acc, value, index) => {
          if (index !== i) {
            acc.push(value)
          }
          return acc;
        }, [])
      } else {
        state.categoryList = state.categoryList.reduce((acc, value, index) => {
          if (index !== i) {
            acc.push(value)
          }
          return acc;
        }, [])
      }

    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
    }
  }

})
export const { addToList, clear, addToCategory, add, removeItem, removeIndex, setCurrency } = selectSlice.actions;
export default selectSlice.reducer;