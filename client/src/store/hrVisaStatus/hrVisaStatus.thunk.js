import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../services/api";

export const fetchAllPendingStatuses = createAsyncThunk(
  "hrVisa/fetchAllPendingStatuses",
  async () => {
    const { data } = await get("/visa/all-pending");

    return data;
  }
);
