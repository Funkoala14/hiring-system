import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, upload } from '../../services/api.js'


export const submitOnboarding = createAsyncThunk(
  'onboarding/submit',
  async (formData, { rejectWithValue }) => {
    try {
      const formDataObj = new FormData();

      // Loop through the formData and append to FormData object
      for (const [key, value] of Object.entries(formData)) {
        if (key === 'documents' || key === 'driverLicense' || key === 'img') {
          // Append files for documents, driverLicense, and profile image
          if (Array.isArray(value)) {
            value.forEach((file) => formDataObj.append(key, file));
          } else {
            formDataObj.append(key, value);
          }
        } else {
          // Append other fields
          formDataObj.append(key, value);
        }
      }

      // Post formDataObj to the server
      const response = await upload('/onboarding/submit', formData);
      console.log('response.data', response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
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
      image: {
        src : "",
        name: ""
      },
      img: null,
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
      driverLicenseDetails: {
        number: '',
        expirationDate: '',
        driverLicense: null

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
    updateEmergencyContact(state, action) {
      const { index, key, value } = action.payload;
      state.formData.emergencyContacts[index][key] = value;
    },
    addEmergencyContact(state) {
      state.formData.emergencyContacts.push({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        relationship: '',
      });
    },
    removeEmergencyContact(state, action) {
      const index = action.payload;
      state.formData.emergencyContacts.splice(index, 1);
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

export const { updateFormField, updateEmergencyContact, addEmergencyContact, removeEmergencyContact } = onboardingSlice.actions;
export default onboardingSlice.reducer;
