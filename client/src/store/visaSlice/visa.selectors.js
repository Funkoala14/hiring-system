import { createSelector } from '@reduxjs/toolkit'

export const selectVisaState = (state) => state.visa

export const selectDocumentStatus = createSelector(selectVisaState, ({ status }) => status)

export const selectDocumentFeedback = createSelector(selectVisaState, ({ feedback }) => feedback)

export const selectDocumentType = createSelector(selectVisaState, ({ documentType }) => documentType)
