import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post, upload } from "../../services/api.js";

export const submitOnboarding = createAsyncThunk(
  "onboarding/submit",
  async (formData, { rejectWithValue }) => {
    console.log("Files received:", formData.files); // Log files
    console.log("Body received:", formData.body); // Log other form fields
    try {
      // Create a new FormData object
      const formDataObj = new FormData();

      // Loop through the formData object to append all fields and files
      for (const [key, value] of Object.entries(formData)) {
        if (key === "profilePicture" || key === "driverLicense" || key === "visaDocuments") {
          // Handle file uploads (profilePicture, driverLicense, visaDocuments)
          if (Array.isArray(value)) {
            value.forEach((file) => formDataObj.append(key, file));
          } else if (value instanceof File) {
            formDataObj.append(key, value);
          }
        } else {
          // Append other fields
          formDataObj.append(key, value);
        }
      }

      // Post formDataObj to the server (ensure 'upload' function supports multipart/form-data)
      const response = await upload("/onboarding/submit", formDataObj);
      console.log("response.data", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);



export const uploadEmployeeProfile = createAsyncThunk(
  "onboarding/uploadProfile",
  async (formData, { rejectWithValue }) => {
    // Create a new FormData object
    const formDataObj = new FormData();

    // Append files and body data to the FormData object

    // Assuming formData contains both files and regular form fields:
    if (formData.profilePicture) {
      formDataObj.append("profilePicture", formData.profilePicture); // Append file
    }

    // Append other fields like firstName, lastName, etc. from formData.body
    for (const [key, value] of Object.entries(formData.body)) {
      formDataObj.append(key, value);  // Append form fields (e.g., firstName, lastName)
    }

    // Logging to check what's being sent to the server
    console.log("FormData object being sent to the server:", formDataObj);

    try {
        const response = await upload("/onboarding/submit-pic", formDataObj);  // Your backend endpoint
        return response.data;  // Return updated user data
    } catch (error) {
        return rejectWithValue(error.response.data.message || "Something went wrong");
    }
  }
);

export const updateEmployeeProfile = createAsyncThunk(
  "onboarding/uploadProfilePic",
  async (formData, { rejectWithValue }) => {
      try {
          console.log(formData);
          
          const response = await upload("/onboarding/submit-pic", formData);
          const { data, code, message } = response;
          return data;
      } catch (error) {
          return rejectWithValue(error.response.data.message || "Something went wrong");
      }
  }
);


const onboardingSlice = createSlice({
  name: "onboarding",
  initialState: {
    formData: {
      firstName: "",
      lastName: "",
      middleName: "",
      preferredName: "",
      profilePicture: null,
      ssn: "",
      dob: "",
      gender: "",
      address: {
        buildingOrAptNumber: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      cellPhone: "",
      workPhone: "",
      carInfo: {
        make: "",
        model: "",
        color: "",
      },

      driverLicenseDetails: {
        number: "",
        expirationDate: "",
        driverLicense: null,
      },
      reference: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        relationship: "",
      },
      emergencyContacts: [
        { firstName: "", lastName: "", phone: "", email: "", relationship: "" },
      ],
      citizenshipType: "",
      visaTitle: "",
      visaStartDate: "",
      visaEndDate: "",
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
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        relationship: "",
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
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitOnboarding.fulfilled, (state, action) => {
        const data = action.payload; // action.payload contains the API response
        if (data) {
          state.status = "succeeded";
          state.error = null;
          state.formData = {
            ...state.formData,
            ...data, // Assuming the response contains updated user data
            address: { ...state.formData.address, ...data.address },
            carInfo: { ...state.formData.carInfo, ...data.carInfo },
            driverLicenseDetails: {
              ...state.formData.driverLicenseDetails,
              ...data.driverLicense,
            },
          };

          state.onboardingStatus = data.onboardingStatus;
          state.housingAssignment = data.housingAssignment;
          state.visaStatus = data.visaStatus;
        }
      })
      .addCase(submitOnboarding.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(uploadEmployeeProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadEmployeeProfile.fulfilled, (state, action) => {
        const data = action.payload; // action.payload contains the API response
        if (data) {
          state.status = "succeeded";
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
      .addCase(uploadEmployeeProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  updateFormField,
  updateEmergencyContact,
  addEmergencyContact,
  removeEmergencyContact,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
