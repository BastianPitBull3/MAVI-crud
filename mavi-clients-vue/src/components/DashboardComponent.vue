<template>
  <div class="container">
    <!-- Navbar -->
    <nav class="navbar">
      <ul>
        <li><router-link to="/dashboard" @click="goToDashboard">Agregar Cliente</router-link></li>
        <li><router-link to="/clients">Ver Clientes</router-link></li>
      </ul>
    </nav>

    <!-- Formulario para crear o actualizar cliente -->
    <div class="form-container">
      <h2>{{ isEdit ? 'Editar Cliente' : 'Crear Cliente' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="firstName">Nombre:</label>
          <input type="text" id="firstName" v-model="client.firstName" required />
        </div>
        <div class="form-group">
          <label for="lastName">Apellido:</label>
          <input type="text" id="lastName" v-model="client.lastName" required />
        </div>
        <div class="form-group">
          <label for="motherLastName">Apellido Materno:</label>
          <input type="text" id="motherLastName" v-model="client.motherLastName" required />
        </div>
        <div class="form-group">
          <label for="address">Dirección:</label>
          <input type="text" id="address" v-model="client.address" required />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" v-model="client.email" required />
        </div>
        <button type="submit" class="submit-btn">{{ isEdit ? 'Actualizar Cliente' : 'Crear Cliente' }}</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      clients: [],  // Lista de clientes
      client: {  // Datos del cliente
        firstName: "",
        lastName: "",
        motherLastName: "",
        address: "",
        email: "",
      },
      isEdit: false,  // Bandera para verificar si estamos en modo edición
      token: localStorage.getItem("token") || "", // Token JWT desde localStorage
    };
  },
  methods: {
    // Método para obtener un cliente por su ID
    async fetchClient(clientId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/clients/${clientId}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        this.client = response.data;
        this.isEdit = true;  // Establecer el estado de edición
      } catch (error) {
        console.error("Error obteniendo el cliente:", error);
        if (error.response && error.response.status === 403) {
          alert("Acceso denegado. Verifica tu sesión.");
        }
      }
    },

    // Método para crear un nuevo cliente
    async createClient() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/clients",
          this.client,
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        this.clients.push(response.data);  // Agregar cliente creado a la lista
        this.clearForm();  // Limpiar formulario después de crear
      } catch (error) {
        console.error("Error creando cliente:", error);
      }
    },

    // Método para actualizar un cliente existente
    async updateClient() {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/clients/${this.client.id}`,
          this.client,
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        const index = this.clients.findIndex((c) => c.id === this.client.id);
        this.clients[index] = response.data;  // Actualizar cliente en la lista
        this.clearForm();  // Limpiar formulario después de actualizar
      } catch (error) {
        console.error("Error actualizando cliente:", error);
      }
    },

    // Método para manejar el envío del formulario (crear o actualizar cliente)
    handleSubmit() {
      if (this.isEdit) {
        this.updateClient();  // Actualizar cliente si estamos en modo edición
      } else {
        this.createClient();  // Crear cliente si no estamos en modo edición
      }
    },

    // Método para limpiar el formulario
    clearForm() {
      this.client = {
        firstName: "",
        lastName: "",
        motherLastName: "",
        address: "",
        email: "",
      };
      this.isEdit = false;  // Resetear la bandera de edición
    },

    // Método para preparar el formulario en modo edición
    editClient(client) {
      this.client = { ...client };  // Copiar los datos del cliente
      this.isEdit = true;  // Establecer el estado de edición
    },

    // Método para eliminar un cliente
    async deleteClient(clientId) {
      try {
        await axios.delete(`http://localhost:3000/api/clients/${clientId}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.clients = this.clients.filter((client) => client.id !== clientId);  // Filtrar el cliente eliminado
      } catch (error) {
        console.error("Error eliminando cliente:", error);
      }
    },

    // Método para redirigir al Dashboard y limpiar el formulario
    goToDashboard() {
      this.clearForm();  // Limpiar el formulario al redirigir
      this.$router.push("/dashboard");  // Navegar al dashboard
    },
  },
  mounted() {
    this.clearForm();  // Limpiar el formulario al montar el componente
    if (this.$route.query.isEdit === 'true') {
      const clientId = this.$route.query.clientId;
      if (clientId) {
        this.fetchClient(clientId);  // Obtener el cliente por su ID si estamos en modo edición
      }
    }
  },
};
</script>

<style scoped>
/* Estilos para el contenedor principal */
.container {
  font-family: Arial, sans-serif;
  margin: 20px;
}

/* Navbar */
.navbar {
  background-color: #333;
  padding: 10px;
}

.navbar ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

.navbar li {
  margin: 0 15px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
}

.navbar a:hover {
  text-decoration: underline;
}

/* Formulario */
.form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #45a049;
}

/* Lista de Clientes */
.clients-list {
  list-style-type: none;
  padding: 0;
  max-width: 600px;
  margin: 20px auto;
}

.client-item {
  background-color: #f1f1f1;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client-item span {
  font-size: 18px;
}

.btn-edit,
.btn-delete {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
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
</style>
