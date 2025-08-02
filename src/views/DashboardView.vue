<template>
    <div class="content-wrapper">
        <main class="app-main">
            <!--begin::App Content Header-->
            <div class="app-content-header">
                <!--begin::Container-->
                <div class="container-fluid">
                    <!--begin::Row-->
                    <div class="row">
                        <div class="row g-3">
                            <div class="col-12 col-sm-6 col-md-4" v-for="(box, index) in [
                        { title: 'Total Produk', value: totalProduk, icon: 'bi bi-box', color: 'bg-primary' },
                        { title: 'Total Transaksi', value: totalTransaksi, icon: 'bi bi-receipt', color: 'bg-success' },
                        { title: 'Jumlah Pelanggan', value: totalPelanggan, icon: 'bi bi-people', color: 'bg-warning' },
                        { title: 'Servis Selesai', value: totalServis, icon: 'bi bi-laptop', color: 'bg-info' }
                        ]" :key="index">
                                <div class="card text-white" :class="box.color">
                                    <div class="card-body d-flex justify-content-between align-items-center">
                                        <div class="d-flex flex-column flex-grow-1">
                                            <h5 class="card-title mb-0">{{ box.title }}</h5>
                                            <p class="card-text fs-4 fw-bold mb-0">{{ box.value }}</p>
                                        </div>
                                        <i :class="`${box.icon} fs-1 ms-3`"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <!--end::Row-->
                </div>
                <!--end::Container-->
            </div>
        </main>
        <!--end::App Main-->
        <!--begin::Footer-->
    </div>
</template>

<script setup>
    import {
        ref,
        onMounted
    } from 'vue'
    import axios from 'axios'

    const totalProduk = ref(0)
    const token = localStorage.getItem('token')

    // Data statis
    const totalTransaksi = ref(120) // dummy
    const totalPelanggan = ref(80) // dummy
    const totalServis = ref(45) // dummy

    const fetchTotalProduk = async () => {
        try {
            const res = await axios.get('http://localhost/login_api_lumen/public/api/produk', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            totalProduk.value = res.data.data.length // asumsi respons berupa array produk
        } catch (err) {
            console.error('Gagal mengambil total produk:', err)
        }
    }

    onMounted(() => {
        fetchTotalProduk()
    })
</script>