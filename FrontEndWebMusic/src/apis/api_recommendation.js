import axios from 'axios';

export const getRecommendations = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/recommendations?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};