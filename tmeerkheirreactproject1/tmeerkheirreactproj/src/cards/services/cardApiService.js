import axios from "axios";



const apiUrl = "http://localhost:8181";
export const getCards = async () => {
  try {
    const response = await axios.get(`${apiUrl}/cards`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getMyCards = async () => {

  try {
    const response = await axios.get(`${apiUrl}/cards/my-cards`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/cards/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getCard = async (cardId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/cards/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createCard = async (normalizedCard) => {
  try {
    
    const { data } = await axios.post(`${apiUrl}/cards`, 
      normalizedCard);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const editCard = async (cardId, normalaizedCard) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/cards/${cardId}`,
      normalaizedCard
    );
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const changeLikeStatus = async (cardId,userid) => {
  
  try {

    const { data } = await axios.put(`${apiUrl}/cards/${cardId}`);
    if (data.likes.includes(userid)){
      
      data.likes.pop(userid);
      
    }else
  {

    data.likes.push(userid);
     
    
  }
    const response = await axios.put(`${apiUrl}/cards/${cardId}`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};





    
    
