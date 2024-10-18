import { createSelector } from '@reduxjs/toolkit'

const selectVisaState = (state) => state.visa

export const selectDocumentStatus = createSelector(selectVisaState, ({ status }) => status)

export const selectDocumentFeedback = createSelector(selectVisaState, ({ feedback }) => feedback)