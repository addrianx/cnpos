<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">

                <div class="card-header">
                    <h3 class="card-title">Responsive Hover Table</h3>

                    <div class="card-tools">
                    <form @submit.prevent="fetchData(1)">
                        <div class="input-group input-group-sm" style="width: 200px;">
                            <input
                                type="text"
                                v-model="searchQuery"
                                class="form-control"
                                placeholder="Cari produk..."
                                @input="debouncedSearch"
                            />
                            <button type="submit" class="btn btn-default">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                    </div>
                </div>

                    <div class="card-body p-0">
                        <!-- WRAP table dengan .table-responsive -->
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama Produk</th>
                                        <th>Kategori</th>
                                        <th>Satuan</th>
                                        <th>Harga</th>
                                        <th>Stok</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr
                                    v-for="(produk, index) in items"
                                    :key="produk.id"
                                    @click="goToEdit(produk.id)"
                                    class="table-row-clickable"
                                >
                                    <td>{{ index + 1 + ((Number(currentPage) || 1) - 1) * perPage }}</td>
                                    <td>{{ produk.nama_produk }}</td>
                                    <td>{{ produk.kategori?.nama_kategori || '-' }}</td>
                                    <td>{{ produk.satuan?.nama_satuan || '-' }}</td>
                                    <td>Rp{{ Number(produk.harga).toLocaleString('id-ID') }}</td>
                                    <td>{{ produk.stok }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Pagination -->
                        <div class="pagination my-3 text-center">
                            <button 
                                :disabled="currentPage === 1" 
                                @click="fetchData(currentPage - 1)">
                                «
                            </button>

                            <button 
                                v-for="page in visiblePages" 
                                :key="page" 
                                :class="{ active: page === currentPage }"
                                @click="fetchData(page)">
                                {{ page }}
                            </button>

                            <button 
                                :disabled="currentPage === lastPage" 
                                @click="fetchData(currentPage + 1)">
                                »
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash/debounce'
import { useRouter } from 'vue-router'
const router = useRouter()

// State
const items = ref([])
const currentPage = ref(1)
const lastPage = ref(1)
const searchQuery = ref('')
const perPage = 10
const token = localStorage.getItem('token')

// Fungsi ambil data produk
// Fungsi ambil data
const fetchData = async (page = 1) => {
  try {
    const res = await axios.get('http://localhost/login_api_lumen/public/api/produk', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page,
        per_page: perPage,
        search: searchQuery.value // <-- kirim pencarian
      }
    })

    items.value = res.data.data
    currentPage.value = res.data.current_page
    lastPage.value = res.data.last_page
  } catch (error) {
    console.error('Gagal ambil data', error)
  }
}

// Debounce biar gak spam API saat ngetik
const debouncedSearch = debounce(() => {
  fetchData(1)
}, 500)

onMounted(() => {
  fetchData()
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(currentPage.value - 1, 1)
  const end = Math.min(currentPage.value + 1, lastPage.value)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (currentPage.value <= 2 && lastPage.value >= 3) return [1, 2, 3]
  if (currentPage.value >= lastPage.value - 1) {
    return [lastPage.value - 2, lastPage.value - 1, lastPage.value].filter(p => p > 0)
  }

  return pages
})

const goToEdit = (id) => {
  router.push(`/dashboard/edit-produk/${id}`)
}
</script>

<style>
.table-responsive {
    width: 100%;
    overflow-x: auto;
}

.table {
    white-space: nowrap;
}
.pagination {
    display: flex;
    justify-content: center;
    gap: 6px;
}

.pagination button {
    margin: 0;
    padding: 6px 12px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 4px;
}

.pagination .active {
    background-color: #007bff;
    color: white;
    font-weight: bold;
}
.table-row-clickable {
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.table-row-clickable:hover {
  background-color: #f2f2f2;
}
</style>
