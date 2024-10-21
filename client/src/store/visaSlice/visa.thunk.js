import { createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../services/api";

function base64ToFile(base64, filename) {
    // Infer MIME type from filename extension
    const mimeType = filename ? inferMimeTypeFromFilename(filename) : 'application/octet-stream';

    const binaryString = atob(base64);
    const binaryArray = Uint8Array.from(binaryString, char => char.charCodeAt(0));

    // Create a Blob from the binary array
    const blob = new Blob([binaryArray], { type: mimeType });

    // Create a File object
    const file = new File([blob], filename, { type: mimeType });

    return file;
}


function inferMimeTypeFromFilename(filename) {
    const extension = filename.split('.').pop().toLowerCase();

    const mimeTypes = {
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'pdf': 'application/pdf',
        'txt': 'text/plain',
        'zip': 'application/zip',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'json': 'application/json'
    };

    return mimeTypes[extension] || 'application/octet-stream';
}

export const visaStatusInit = createAsyncThunk("visa/visaStatusInit", async () => {
    const { data } = await get('/visa/info')

    return ({ ...data, file: data.file ? base64ToFile(data.file, data.filename) : null })
})

export const updateVisaStatus = createAsyncThunk("visa/updateVisaStatus", async ({ type, uploadedFile }) => {
    try {
        const formData = new FormData();

        formData.append('file', uploadedFile);
        formData.append('type', type);

        const { data } = await post('/visa/submit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return ({ ...data, file: data.file ? base64ToFile(data.file, data.filename) : null })
    } catch (err) {
        console.error(err)
    }
})