export const formatDate = (dateString) => {
    if(!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const formatDateTime = (dateString) => {
    if(!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

export const formatDateForInput = (dateString) => {
    if(!dateString) return "";
    const date = new Date(dateString);
    
    // Convert to 'YYYY-MM-DD' format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Add leading zero
    const day = String(date.getDate()).padStart(2, '0');         // Add leading zero
    
    return `${year}-${month}-${day}`;
};