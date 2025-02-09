<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs';
    return;
  }

  try {
    loading.value = true;
    error.value = '';

    // Envoyer une requête POST à l'API Symfony
    const response = await fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    // Vérifier si la réponse est OK
    if (!response.ok) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Extraire le token JWT de la réponse
    const data = await response.json();
    const token = data.token;

    // Stocker le token dans le localStorage ou un store (ex: Pinia)
    localStorage.setItem('authToken', token);

    // Rediriger l'utilisateur vers la page d'accueil
    router.push('/');
  } catch (e) {
    error.value = 'Email ou mot de passe incorrect';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-header">
        <div class="logo">🍽️</div>
        <h1>Restaurant Manager</h1>
        <p>Connectez-vous à votre espace de gestion</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <div class="input-wrapper">
            <span class="input-icon">📧</span>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="votre@email.com"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="password">Mot de passe</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Votre mot de passe"
              required
            />
          </div>
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" :disabled="loading" class="login-button">
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style>

.login-container {
  min-height: 100vh; /* Prend toute la hauteur de la vue */
  display: flex;
  align-items: center; /* Centre verticalement */
  justify-content: center; /* Centre horizontalement */
  background: linear-gradient(135deg, var(--primary-color) 0%, #0d9488 100%);
  padding: 1rem;
}

.login-content {
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Largeur maximale du formulaire */
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.login-header h1 {
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #666;
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  font-size: 1.2rem;
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.error-message {
  color: #dc2626;
  font-size: 0.9rem;
  text-align: center;
}

.login-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.login-button:hover {
  background-color: #059669;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>