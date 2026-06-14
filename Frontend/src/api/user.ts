import api from './axios';

export const getUserProfile = async () => {
    return api.get('/user/profile');
};

export const getUserStatistics = async () => {
    return api.get('/user/statistics');
};

export const getAllCategories = async () => {
    return api.get("/admin/categories");
}

export const creatTicket = async (title: String, description: String, categoryId: number) => {
    return api.post("/user/tickets",{"title" : title, "categoryId" : categoryId, "description":description});
}

export const getUserTickets = async () => {
    return api.get("/user/tickets");
}

export const updateUserProfile = async (username : string, phoneNumber: string, departement: string, jobTitle :string) => {
    return api.patch("/user/profile",{username,phoneNumber,departement,jobTitle});
}