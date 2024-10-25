import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../services/api";

export const fetchAllPendingStatuses = createAsyncThunk(
  "hrVisa/fetchAllPendingStatuses",
  async () => {
    const res = await get("/visa/all-pending");

    return res;
  }
);

export const fetchAllStatuses = createAsyncThunk(
  "hrVisa/fetchAllStatuses",
  async () => {
    const res = await get("/visa/all");

    return res;
  }
);

export const approveDocument = createAsyncThunk(
  "hrVisa/approve",
  async ({ documentId, status }) => {
    const { message } = await post("/visa/status", { documentId, status });
    const { data } = await get("/visa/all-pending");
    return { data, message };
  }
);

export const rejectDocument = createAsyncThunk(
  "hrVisa/reject",
  async ({ documentId, status }) => {
    await post("/visa/status", { documentId, status });
    const { data } = await get("/visa/all-pending");
    return data;
  }
);

export const postFeedback = createAsyncThunk(
  "hrVisa/feedback",
  async ({ documentId, feedback }) => {
    const { message } = await post("/visa/feedback", { documentId, feedback });
    const { data } = await get("/visa/all-pending");
    return { data, message };
  }
);
