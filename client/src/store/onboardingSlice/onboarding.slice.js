import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../../services/api.js'


export const submitOnboarding = createAsyncThunk(
  'onboarding/submit',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await post('/onboarding/submit', formData);
      console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: {
    formData: {
      firstName: '',
      lastName: '',
      middleName: '',
      preferredName: '',
      image: null,
      address: {
        buildingOrAptNumber: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
      },
      cellPhone: '',
      workPhone: '',
      carInfo: {
        make: '',
        model: '',
        color: '',
      },
      ssn: '',
      dob: '',
      gender: '',
      driverLicense: {
        number: '',
        expirationDate: '',
        copy: null,
      },
      reference: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        relationship: '',
      },
      emergencyContacts: [
        { firstName: '', lastName: '', phone: '', email: '', relationship: '' },
      ],
      citizenshipType: '',
      visaTitle: '',
      visaStartDate: '',
      visaEndDate: '',
      documents: [],

    },
    status: null,
    error: null,
    onboardingStatus: null,
    housingAssignment: null,
    visaStatus: null,
  },
  reducers: {
    updateFormField(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOnboarding.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitOnboarding.fulfilled, (state, action) => {
        const data = action.payload; // action.payload contains the API response
        if (data) {
          state.status = 'succeeded';
          state.error = null;
          state.formData = {
            ...state.formData,
            ...data, // Assuming the response contains updated user data
          };
          state.onboardingStatus = data.onboardingStatus;
          state.housingAssignment = data.housingAssignment;
          state.visaStatus = data.visaStatus;
        }
      })
      .addCase(submitOnboarding.rejected, (state, action) => {
        
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateFormField } = onboardingSlice.actions;
export default onboardingSlice.reducer;
