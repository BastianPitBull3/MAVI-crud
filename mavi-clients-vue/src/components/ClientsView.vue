<template>
  <div class="read-container">
    <h2>Lista de Clientes</h2>
    <table class="clients-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Apellido Materno</th>
          <th>Dirección</th>
          <th>Correo Electrónico</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(client, index) in clients" :key="client.id">
          <td>{{ index + 1 }}</td>
          <td>{{ client.firstName }}</td>
          <td>{{ client.lastName }}</td>
          <td>{{ client.motherLastName }}</td>
          <td>{{ client.address }}</td>
          <td>{{ client.email }}</td>
          <td class="actions-cell">
            <button class="btn btn-edit" @click="editClient(client)">Editar</button>
            <button class="btn btn-delete" @click="deleteClient(client.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="dashboard-button">
      <button class="btn btn-dashboard" @click="goToDashboard">Volver al Dashboard</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      clients: [], // Lista de clientes obtenida desde la API
      token: localStorage.getItem("token") || "", // Token JWT almacenado en localStorage
    };
  },
  methods: {
    // Método para obtener la lista de clientes
    async fetchClients() {
      try {
        const response = await axios.get("http://localhost:3000/api/clients", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.clients = response.data;
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    },

    // Método para editar un cliente y redirigir al formulario de edición
    editClient(client) {
      this.$router.push({
        path: '/dashboard',
        query: { isEdit: 'true', clientId: client.id }, // Pasar ID del cliente como parámetro
      });
    },

    // Método para eliminar un cliente
    async deleteClient(clientId) {
      try {
        await axios.delete(`http://localhost:3000/api/clients/${clientId}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.clients = this.clients.filter((client) => client.id !== clientId); // Filtrar cliente eliminado
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    },

    // Método para redirigir al Dashboard
    goToDashboard() {
      this.$router.push("/dashboard"); // Redirige al dashboard
    },
  },
  mounted() {
    this.fetchClients(); // Llamar al método para obtener clientes cuando el componente se monte
  },
};
</script>

<style scoped>
.read-container {
  font-family: Arial, sans-serif;
  margin: 20px auto;
  max-width: 1000px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.clients-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  min-width: 900px;
}

.clients-table th,
.clients-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.clients-table th {
  background-color: #4CAF50;
  color: white;
}

.clients-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.clients-table tr:hover {
  background-color: #ddd;
}

.actions-cell {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #007bff;
}

.btn-edit:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

/* Botón de Dashboard */
.dashboard-button {
  text-align: center;
  margin-top: 20px;
}

.btn-dashboard {
  background-color: #4CAF50;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-dashboard:hover {
  background-color: #45a049;
}
</style>
