import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, upload } from '../../services/api.js'


export const submitOnboarding = createAsyncThunk(
  'onboarding/submit',
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Submitting form data:", formData);
      const formDataObj = new FormData();

      // Loop through the formData and append to FormData object
      for (const [key, value] of Object.entries(formData)) {
        if (key === 'documents' || key === 'driverLicenseFile' || key === 'profilePicture') {
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
      // return rejectWithValue({
      //   feedback: "Your application was rejected due to missing documents.",
      // });
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
      driverLicense: {
        hasLicense: 'no',
        number: '',
        expirationDate: '',
        driverLicenseFile: null

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
      
      visaStatus:{
        citizenship: '',
        citizenshipType: '',
        visaTitle: '',
        startDate: '',
        endDate: '',
        documents: [],
      }

    },
    status: null,
    error: null,
    onboardingStatus: null,
    housingAssignment: null,
    visaStatus: null,
    feedback: "Rejected", // Store feedback from rejected applications
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
    resetFeedback: (state) => {
      state.feedback = null; // Reset feedback when resubmitting
    },
    setInitialFormData: (state, action) => {
      state.formData = action.payload; // Set form data to user info when rejected
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
          state.feedback = null;
        }
      })
      .addCase(submitOnboarding.rejected, (state, action) => {
        
        state.status = 'failed';
        state.error = action.payload.message;
        state.feedback = action.payload?.feedback || "Your application was rejected for unspecified reasons."; // Handle feedback from API
      });
  },
});

export const { updateFormField, 
  updateEmergencyContact, 
  addEmergencyContact, 
  removeEmergencyContact,
  resetFeedback, 
  setInitialFormData,
 } = onboardingSlice.actions;
export default onboardingSlice.reducer;
