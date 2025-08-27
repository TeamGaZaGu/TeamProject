import api from "./axios";

export const reqReport = async () => await api.get("/api/report");

export const submitReport = async (data) => await api.put("/api/report", data);

export const submitReportComplete = async (reportId) => await api.post(`/api/report/${reportId}`)