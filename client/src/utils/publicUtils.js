export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  // Convert to 'YYYY-MM-DD' format
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero
  const day = String(date.getDate()).padStart(2, "0"); // Add leading zero

  return `${year}-${month}-${day}`;
};

export function getDocumentMessage(documentType, status) {
  const messages = {
    "OPT Receipt": {
      "not-submited": "Please upload your OPT Receipt for review",
      pending: "Waiting for HR to approve your OPT Receipt",
      approved: "Please upload a copy of your OPT EAD",
      rejected: "Please check HR's feedback and re-upload your OPT Receipt",
    },
    "OPT EAD": {
      "not-submited": "Please upload your OPT EAD for review",
      pending: "Waiting for HR to approve your OPT EAD",
      approved: "Please download and fill out the I-983 form",
      rejected: "Please check HR's feedback and re-upload your OPT EAD",
    },
    "I-983": {
      "not-submited": "Please upload your I-983 for review",
      pending: "Waiting for HR to approve and sign your I-983",
      approved:
        "Please send the I-983 along with all necessary documents to your school and upload the new I-20",
      rejected: "Please check HR's feedback and re-upload your I-983",
    },
    "I-20": {
      "not-submited": "Please upload your I-20 for review",
      pending: "Waiting for HR to approve your I-20",
      approved: "All documents have been approved",
      rejected: "Please check HR's feedback and re-upload your I-20",
    },
  };

  // Ensure the document type exists in the messages object
  if (!messages[documentType]) {
    return "Invalid document type.";
  }

  // Safely return the message based on the provided status
  return (
    messages[documentType]?.[status] ||
    "Invalid status for the given document type."
  );
}
