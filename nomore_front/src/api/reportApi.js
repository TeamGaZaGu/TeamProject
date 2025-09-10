import api from "./axios";

export const reqReport = async () => await api.get("/api/reports");

export const submitReport = async (data) => await api.put("/api/reports", data);

export const submitReportComplete = async (reportId) => await api.post(`/api/reports/${reportId}/complete`)