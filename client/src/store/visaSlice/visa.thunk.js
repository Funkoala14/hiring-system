import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../services/api";

export const visaStatusInit = createAsyncThunk(
  "visa/visaStatusInit",
  async () => {
    const { data } = await get("/visa/info");

    console.log("data", data);

    return data;
  }
);

export const updateVisaStatus = createAsyncThunk(
  "visa/updateVisaStatus",
  async ({ type, uploadedFile }) => {
    try {
      const formData = new FormData();

      formData.append("file", uploadedFile);
      formData.append("type", type);

      const { data } = await post("/visa/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);
