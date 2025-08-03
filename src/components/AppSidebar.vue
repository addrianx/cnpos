<template>
    <aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark"> <!--begin::Sidebar Brand-->
        <div class="sidebar-brand"> <!--begin::Brand Link--> <a href="./index.html" class="brand-link"> <!--begin::Brand Image--> <img src="/dist/assets/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image opacity-75 shadow"> <!--end::Brand Image--> <!--begin::Brand Text--> <span class="brand-text fw-light">AdminLTE 4</span> <!--end::Brand Text--> </a> <!--end::Brand Link--> </div> <!--end::Sidebar Brand--> <!--begin::Sidebar Wrapper-->
        <div class="sidebar-wrapper">
            <nav class="mt-2"> <!--begin::Sidebar Menu-->
                <ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false">

                    <li class="nav-item" :class="{ 'menu-open': isDashboardActive, 'active': isDashboardActive }"> <router-link to="/dashboard" class="nav-link" exact-active-class="active"> <i class="nav-icon bi bi-grip-horizontal"></i>
                            <p>Dashboard</p>
                    </router-link> 
                    </li>

                    <li class="nav-header">Separator</li>

                    <li class="nav-item" :class="{ 'menu-open': isManajemenProdukActive, 'active': isManajemenProdukActive }"> <a href="#" class="nav-link"> <i class="nav-icon fa-solid fa-cart-shopping"></i>
                            <p>
                                Manajemen Produk <i class="nav-arrow bi bi-chevron-right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item"> <router-link to="/dashboard/daftar-produk" class="nav-link" exact-active-class="active"> <i class="nav-icon bi bi-circle"></i>
                                    <p>Daftar</p>
                            </router-link> </li>
                            <li class="nav-item"> <router-link to="/dashboard/tambah-produk" class="nav-link" exact-active-class="active"> <i class="nav-icon bi bi-circle"></i>
                                    <p>Tambah</p>
                            </router-link> </li>
                            <li class="nav-item"> <a href="./layout/collapsed-sidebar.html" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                    <p>Stok Item</p>
                                </a> </li>
                            <li class="nav-item"> <router-link to="/dashboard/kategori-produk" class="nav-link" exact-active-class="active"> <i class="nav-icon bi bi-circle"></i>
                                    <p>Kategori</p>
                            </router-link> </li>
                        </ul>
                    </li>

                    <li class="nav-item"> <a href="#" class="nav-link"> <i class="nav-icon fa-solid fa-wallet"></i>
                            <p>
                                Data Transaksi <i class="nav-arrow bi bi-chevron-right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item"> <a href="./layout/unfixed-sidebar.html" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                    <p>Transaksi</p>
                                </a> </li>
                            <li class="nav-item"> <a href="./layout/fixed-sidebar.html" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                    <p>Transaksi Baru</p>
                                </a> </li>
                        </ul>
                    </li>

                    <li class="nav-item"> <a href="#" class="nav-link"> <i class="nav-icon fa-solid fa-users"></i>
                            <p>
                                Data Pelanggan <i class="nav-arrow bi bi-chevron-right"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item"> <a href="./layout/unfixed-sidebar.html" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                    <p>Daftar Pelanggan</p>
                                </a> </li>
                            <li class="nav-item"> <a href="./layout/fixed-sidebar.html" class="nav-link"> <i class="nav-icon bi bi-circle"></i>
                                    <p>Tambah Pelanggan</p>
                                </a> </li>
                        </ul>
                    </li>
    
                    <li class="nav-item"> <a href="" class="nav-link"> <i class="nav-icon fa-solid fa-gear"></i>
                            <p>Pengaturan</p>
                        </a> 
                    </li>

                </ul> <!--end::Sidebar Menu-->
            </nav>
        </div> <!--end::Sidebar Wrapper-->
    </aside> <!--end::Sidebar--> <!--begin::App Main-->
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

// Reusable checker function
const isMenuActive = (paths, exact = false) => {
  return computed(() =>
    paths.some((p) => exact ? route.path === p : route.path.startsWith(p))
  );
};

const isDashboardActive = isMenuActive(['/dashboard'], true); // pakai exact match

const manajemenProdukRoutes = [
  '/dashboard/daftar-produk',
  '/dashboard/tambah-produk',
  '/dashboard/kategori-produk'
];

// Hasil computed untuk menu ini
const isManajemenProdukActive = isMenuActive(manajemenProdukRoutes);


        const SELECTOR_SIDEBAR_WRAPPER = ".sidebar-wrapper";
        const Default = {
            scrollbarTheme: "os-theme-light",
            scrollbarAutoHide: "leave",
            scrollbarClickScroll: true,
        };
        document.addEventListener("DOMContentLoaded", function() {
            const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
            if (
                sidebarWrapper &&
                typeof OverlayScrollbarsGlobal?.OverlayScrollbars !== "undefined"
            ) {
                OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
                    scrollbars: {
                        theme: Default.scrollbarTheme,
                        autoHide: Default.scrollbarAutoHide,
                        clickScroll: Default.scrollbarClickScroll,
                    },
                });
            }
        });
</script>
