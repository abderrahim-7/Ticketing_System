import api from './axios';

export const getAgentProfile = async () => {
    return api.get('/agent/profile');
};

export const getAgentStatistics = async () => {
    return api.get('/agent/statistics');
};

export const getAgentTickets = async () => {
    return api.get('/agent/tickets');
};

export const solveTicket = async (ticketId:number) => {
    return api.put(`/agent/tickets/${ticketId}`);
};

export const updateAgentProfile = async (username : string, phoneNumber: string, departement: string, jobTitle :string) => {
    return api.patch("/agent/profile",{username,phoneNumber,departement,jobTitle});
}

export const updateAgentSkills = async (skills: any[]) => {
  return api.patch("/agent/skills", skills);
};

export const updateAgentCategories = async (categories: any[]) => {
  return api.patch("/agent/categories", categories);
};