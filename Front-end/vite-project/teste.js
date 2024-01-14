import axios from 'axios'

const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozfQ.WvYMQzVvjnfArvxaupcGwYOFRRHf7qxjwgPQJALgEzg";

const taskData = {
  title: "Arrumar o cabelo",
  description: "Preciso passar chapinha no cabelo",
  date: "2024-01-13",
  category: "Beleza"
};

const apiUrl = "http://localhost:3000/tasks"; // Replace with your actual API URL

axios.post(apiUrl, taskData, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(response => {
    console.log("Task created successfully:", response.data);
  })
  .catch(error => {
    console.error("Error creating task:", error.response ? error.response.data : error.message);
  });
