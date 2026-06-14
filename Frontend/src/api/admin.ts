import api from "./axios"

export const getAllCategories = async () => {
    return api.get("/admin/categories");
}

export const createCategory = async (name: String) => {
    return api.post("/admin/categories",{"name": name,"description" :null});
}

export const deleteCategory = async (id: number) => {
    return api.delete(`/admin/categories/${id}`);
}

export const getAllSkills = async () => {
    return api.get("/admin/skills");
}

export const createSkill = async (name: String) => {
    return api.post("/admin/skills",{"name": name});
}

export const deleteSkill = async (id: number) => {
    return api.delete(`/admin/skills/${id}`);
}

export const getAllAgents = async () => {
    return api.get("/admin/agents");
}

export const getAllUsers = async () => {
    return api.get("/admin/users");
}

export const getAllTickets = async () => {
    return api.get("/admin/tickets");
}

export const getTicketsByAgent = async (id:number) => {
    return api.get(`/admin/agents/${id}/tickets`);
}

export const activateAgent = async (id : number) => {
    return api.put(`/admin/agent/${id}/activate`)
}

export const refuseAgent = async (id : number) => {
    return api.delete(`/admin/agent/${id}/refuse`)
}

export const disableAccount = async (id : number) => {
    return api.put(`/admin/account/${id}/disable`)
}

export const activateAccount = async (id : number) => {
    return api.put(`/admin/account/${id}/activate`)
}

export const assignTicket = async (ticketId : number, agentId:number) => {
    return api.put(`/admin/tickets/${ticketId}/assign/${agentId}`)
}

export const rejectTicket = async (ticketId : number) => {
    return api.put(`/admin/tickets/${ticketId}/refuse`)
}

export const fetchUsersStats = async () => {
    return api.get("/admin/stats/users")
}

export const fetchAgentsStats = async () => {
    return api.get("/admin/stats/agents")
}

export const fetchTicketsByCategory = async () => {
    return api.get("/admin/stats/tickets-by-category")
}
