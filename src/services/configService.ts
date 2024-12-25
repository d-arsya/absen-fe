export const API_BASE_URL = "https://absen-be.vercel.app/api";
export const WS_BASE_URL = "ws://absen-be.vercel.app/ws";
let token = "";

export const getToken = () => token;
export const setToken = (dataToken: string) => (token = dataToken);
