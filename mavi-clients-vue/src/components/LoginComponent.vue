<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" v-model="email" value="admin@example.com" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" value="password123" id="password" required />
        </div>
        <button type="submit" class="btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('admin@example.com');
    const password = ref('password123');
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: email.value,
          password: password.value,
        });

        const token = response.data.token;
        localStorage.setItem('token', token);
        router.push('/dashboard');
      } catch (error) {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales incorrectas');
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>

<style scoped>
/* Contenedor principal */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  font-family: Arial, sans-serif;
}

/* Tarjeta de login */
.login-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

/* Título */
h2 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.8rem;
}

/* Grupo de formulario */
.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #6a11cb;
  outline: none;
}

/* Botón */
.btn-primary {
  display: inline-block;
  width: 100%;
  padding: 0.75rem;
  background-color: #6a11cb;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #4a0ea3;
}

.btn-primary:active {
  transform: scale(0.98);
}
</style>

