
import fetch from 'node-fetch'

const apiUrl = 'http://127.0.0.1:3000/tasks';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozfQ.WvYMQzVvjnfArvxaupcGwYOFRRHf7qxjwgPQJALgEzg';

const requestData = {
  title: 'Arrumar o cabelo',
  description: 'Preciso passar chapinha no cabelo',
  date: '2024-01-13',
  category: 'Beleza'
};

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};

const sendRequest = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      console.error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('An error occurred while sending the request:', error);
  }
};

// Send 500 requests asynchronously
const sendMultipleRequests = async () => {
  const requestPromises = Array.from({ length: 10000 }, () => sendRequest());
  
  try {
    await Promise.all(requestPromises);
    console.log('All requests completed successfully.');
  } catch (error) {
    console.error('An error occurred while sending requests:', error);
  }
};

// Start sending requests
sendMultipleRequests();
