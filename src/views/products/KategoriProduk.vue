<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-12">
                <div v-if="successMessage" class="bg-green-100 text-green-800 px-4 py-2 mb-4 rounded">
                    {{ successMessage }}
                </div>

                <div v-if="errorMessage" class="bg-red-100 text-red-800 px-4 py-2 mb-4 rounded">
                    {{ errorMessage }}
                </div>

                <div class="card card-info card-outline mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <div class="card-title flex-grow-1 text-start">Atur Kategori Produk</div>
                        <button class="btn btn-sm btn-primary" @click="showKategoriModal = true">
                            Tambah Kategori
                        </button>
                    </div>

                    <div class="card-body">
                        <div v-if="loading" class="text-center">Loading...</div>

                        <div v-else>
                            <div v-for="kategori in kategoriList" :key="kategori.id" class="card mb-2">
                                <div class="card-body d-flex justify-content-between align-items-center">
                                     <div class="flex-grow-1 text-start">{{ kategori.nama_kategori }}</div>
                                    <button class="btn btn-sm btn-danger" @click="hapusKategori(kategori.id)">
                                        Hapus
                                    </button>
                                </div>
                            </div>

                            <!-- Pagination -->
                            <nav v-if="totalPages > 1" class="mt-3">
                                <ul class="pagination justify-content-center">
                                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                        <button class="page-link" @click="currentPage--">Sebelumnya</button>
                                    </li>

                                    <li class="page-item" v-for="page in totalPages" :key="page"
                                        :class="{ active: page === currentPage }">
                                        <button class="page-link" @click="currentPage = page">{{ page }}</button>
                                    </li>

                                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                        <button class="page-link" @click="currentPage++">Berikutnya</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Tambah Kategori -->
    <div class="modal fade d-block" :class="{ show: showKategoriModal }" v-if="showKategoriModal"
        style="background-color: rgba(0, 0, 0, 0.5); position: fixed; inset: 0; z-index: 1050;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tambah Kategori</h5>
                    <button type="button" class="btn-close" @click="showKategoriModal = false"></button>
                </div>
                <div class="modal-body">
                    <input v-model="newKategori" type="text" class="form-control" placeholder="Nama kategori baru" />
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="showKategoriModal = false">Batal</button>
                    <button class="btn btn-primary" @click="tambahKategori">Simpan</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch } from 'vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const kategoriList = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const loading = ref(true)

const showKategoriModal = ref(false)
const newKategori = ref('')
const kategoriError = ref('')

const successMessage = ref('')
const errorMessage = ref('')

// ✅ Validasi input kategori
const isValidKategori = computed(() => /^[A-Za-z]+$/.test(newKategori.value))
const token = localStorage.getItem('token')

const fetchKategori = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const res = await axios.get(
      `http://localhost/login_api_lumen/public/api/kategori-produk?page=${currentPage.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    // Backend pagination pakai struktur res.data.data
    if (res.data && res.data.data) {
      kategoriList.value = res.data.data
      totalPages.value = res.data.last_page || 1
    } else {
      kategoriList.value = []
      errorMessage.value = 'Format data tidak dikenali.'
    }

  } catch (err) {
    console.error('❌ Error ambil kategori:', err)
    errorMessage.value = 'Gagal memuat kategori. Token mungkin tidak valid.'
  } finally {
    loading.value = false
  }
}


const tambahKategori = async () => {
  kategoriError.value = ''
  const token = localStorage.getItem('token')

  if (!token) {
    errorMessage.value = 'Token tidak ditemukan. Silakan login ulang.'
    return
  }

  if (!newKategori.value.trim()) {
    kategoriError.value = 'Nama kategori tidak boleh kosong.'
    return
  }

  if (!isValidKategori.value) {
    kategoriError.value = 'Kategori hanya boleh huruf saja (tanpa angka/spasi).'
    return
  }

  try {
    await axios.post(
      'http://localhost/login_api_lumen/public/api/kategori-produk',
      { nama_kategori: newKategori.value },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    // Ubah ke halaman 1 dan fetch ulang dari server
    currentPage.value = 1
    await fetchKategori()

    successMessage.value = '✅ Kategori berhasil ditambahkan!'
    newKategori.value = ''
    showKategoriModal.value = false
  } catch (err) {
    console.error('❌ Gagal tambah kategori:', err)
    errorMessage.value = '❌ Gagal menambahkan kategori.'
  }
}


const hapusKategori = async (id) => {
  const token = localStorage.getItem('token')
  if (!token) {
    errorMessage.value = 'Token tidak ditemukan. Silakan login ulang.'
    return
  }

  if (!confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return

  try {
    await axios.delete(
      `http://localhost/login_api_lumen/public/api/kategori-produk/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    kategoriList.value = kategoriList.value.filter(k => k.id !== id)
    successMessage.value = '✅ Kategori berhasil dihapus!'
  } catch (err) {
    errorMessage.value = '❌ Gagal menghapus kategori.'
  }
}

onMounted(fetchKategori)

watch(currentPage, () => {
  fetchKategori()
})
</script>



<style scoped>
    .invalid-feedback {
        display: block;
    }
</style>