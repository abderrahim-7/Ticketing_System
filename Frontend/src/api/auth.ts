import api from "./axios";

export const login = async (email: string, password: string) => {
    return api.post("/login", { email, password });
}

export const register = async (username:string, email: string, password: string, role: "USER"|"AGENT") => {
    return api.post("/register", { username, email, password, role });
}

export const changePassword = async (oldPassword : string, newPassword:string ) => {
    return api.put("/change-password", { oldPassword,newPassword });
}

export const forgotPassword =  async (email:string) => {
    return api.post("/forget-password",{email});
}

export const resetPassword =  async (token:string,newPassword:string) => {
    return api.post("/reset-password",{token,newPassword});
}