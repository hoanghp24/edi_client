import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Declare State Shape
interface ShippingState {
  activePlanId: string | null;
  totalPlans: number;
}

const initialState: ShippingState = {
  activePlanId: null,
  totalPlans: 0,
};

// 2. Create the slice dedicated to the Shipping Feature
const shippingSlice = createSlice({
  name: 'shipping', // Slice identifier
  initialState,
  reducers: {
    // Action: Select a specific shipping plan
    setActivePlan: (state, action: PayloadAction<string>) => {
      state.activePlanId = action.payload;
    },
    // Action: Increment total plan count
    incrementPlans: (state) => {
      state.totalPlans += 1;
    },
  },
});

// 3. Export Actions & Reducer
export const { setActivePlan, incrementPlans } = shippingSlice.actions;
export default shippingSlice.reducer;
