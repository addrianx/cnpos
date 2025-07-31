<!-- src/views/Login.vue -->
<template>
  <div class="login-page bg-body-secondary">
    <div class="login-box">
      <div class="login-logo"> <a href="#"><b>Admin</b>LTE</a> </div>
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Sign in to start your session</p>

          <div v-if="error" class="alert alert-danger mt-3">{{ errorMessage }}</div>
          <div v-if="success" class="alert alert-success mt-3">{{ successMessage }}</div>

          <form @submit.prevent="login">
            <div class="input-group mb-3">
              <input v-model="email" type="email" class="form-control" placeholder="Email" required>
              <div class="input-group-text"> <span class="bi bi-envelope"></span> </div>
            </div>

            <div class="input-group mb-3">
              <input v-model="password" type="password" class="form-control" placeholder="Password" required>
              <div class="input-group-text"> <span class="bi bi-lock-fill"></span> </div>
            </div>

            <div class="row">
              <div class="col-8">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="rememberMe" id="rememberMe">
                  <label class="form-check-label" for="rememberMe">Remember Me</label>
                </div>
              </div>
              <div class="col-4">
                <button type="submit" class="btn btn-primary w-100">Sign In</button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'  // ✅ tambahkan useRoute & useRouter

const route = useRoute()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref(false)
const errorMessage = ref('')
const success = ref(false)
const successMessage = ref('')

watchEffect(() => {
  if (route.query.logout === 'true') {
    success.value = true
    successMessage.value = 'Anda berhasil logout.'
  } else if (route.query.forced === 'true') {
    error.value = true
    errorMessage.value = 'Anda harus login terlebih dahulu untuk mengakses dashboard.'
  }
})

  async function login() {
    error.value = false
    success.value = false

      try {
        const res = await fetch('http://localhost/login_api_lumen/public/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        })

        const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Login gagal')
      }

      if (data.user && data.token) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        success.value = true
        successMessage.value = `Selamat datang, ${data.user.name}`

        // Redirect ke dashboard
        location.href = '/dashboard'
      } else {
        throw new Error('Data tidak lengkap dari server')
      }

    } catch (err) {
      console.error(err)
      error.value = true
      errorMessage.value = err.message || 'Terjadi kesalahan koneksi'
    }
  }
</script>
