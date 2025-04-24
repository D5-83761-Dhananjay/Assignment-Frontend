import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [
      {
        name: "Mobile Phones",
        children: [
          {
            name: "iPhone 13",
            quantity: [
              { name: "Cash", qty: 50 },
              { name: "EMI", qty: 30 },
            ],
          },
          {
            name: "Samsung Galaxy S21",
            quantity: [
              { name: "Cash", qty: 40 },
              { name: "EMI", qty: 25 },
            ],
          },
        ],
      },
      {
        name: "Laptops",
        children: [
          {
            name: "MacBook Pro 16",
            quantity: [
              { name: "Cash", qty: 20 },
              { name: "EMI", qty: 15 },
            ],
          },
          {
            name: "Dell XPS 13",
            quantity: [
              { name: "Cash", qty: 35 },
              { name: "EMI", qty: 25 },
            ],
          },
        ],
      },
      {
        name: "Headphones",
        children: [
          {
            name: "Sony WH-1000XM4",
            quantity: [
              { name: "Cash", qty: 70 },
              { name: "EMI", qty: 60 },
            ],
          },
          {
            name: "Bose QuietComfort 35 II",
            quantity: [
              { name: "Cash", qty: 50 },
              { name: "EMI", qty: 40 },
            ],
          },
        ],
      },
      {
        name: "Tablets",
        children: [
          {
            name: "iPad Pro 12.9",
            quantity: [
              { name: "Cash", qty: 30 },
              { name: "EMI", qty: 20 },
            ],
          },
          {
            name: "Samsung Galaxy Tab S7",
            quantity: [
              { name: "Cash", qty: 25 },
              { name: "EMI", qty: 15 },
            ],
          },
        ],
      },
      {
        name: "Smartwatches",
        children: [
          {
            name: "Apple Watch Series 7",
            quantity: [
              { name: "Cash", qty: 50 },
              { name: "EMI", qty: 40 },
            ],
          },
          {
            name: "Samsung Galaxy Watch 4",
            quantity: [
              { name: "Cash", qty: 45 },
              { name: "EMI", qty: 35 },
            ],
          },
        ],
      },
    ],
    selectedChildren: {},
  },
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;
    },
    addCategory: (state, action) => {
      const { name } = action.payload;
      state.items.push({ name, children: [] });
    },
    removeCategory: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter((cat) => cat.name !== name);
    },
    addChild: (state, action) => {
      const { categoryName, child } = action.payload;

      const category = state.items.find((cat) => cat.name === categoryName);

      if (category) {
        const childExists = category.children.some(
          (c) => c.name === child.name
        );

        if (!childExists) {
          category.children.push({
            name: child.name,
            quantity: child.quantity.map((q) => ({
              name: q.name,
              qty: Number(q.qty),
            })),
          });
        } else {
          console.warn(
            `Child "${child.name}" already exists in "${categoryName}"`
          );
        }
      } else {
        console.warn(`Category "${categoryName}" not found`);
      }
    },
    updateChildQuantity: (state, action) => {
      const { categoryName, childName, quantity } = action.payload;
      const category = state.items.find((cat) => cat.name === categoryName);
      if (category) {
        const child = category.children.find((c) => c.name === childName);
        if (child) {
          child.quantity = quantity;
        }
      }
    },
    removeChild: (state, action) => {
      const { categoryName, childName } = action.payload;
      const category = state.items.find((cat) => cat.name === categoryName);
      if (category) {
        category.children = category.children.filter(
          (c) => c.name !== childName
        );
      }
    },
    toggleChildSelection: (state, action) => {
      const { categoryName, childName } = action.payload;
      const key = `${categoryName}:${childName}`;
      state.selectedChildren[key] = !state.selectedChildren[key];
    },
    clearSelections: (state) => {
      state.selectedChildren = {};
    },
  },
});

export const {
  setCategories,
  addCategory,
  removeCategory,
  addChild,
  updateChildQuantity,
  removeChild,
  toggleChildSelection,
  clearSelections,
} = categorySlice.actions;

export default categorySlice.reducer;
