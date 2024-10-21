import { createSelector } from "@reduxjs/toolkit";
const housingState = (state) => state.housing;

export const selectHousingByTitle = (title) =>
    createSelector(housingState, (housing) => housing.list.find((item) => title === item.title));
