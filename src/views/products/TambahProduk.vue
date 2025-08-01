<template>
    <div class="container-fluid mt-3">
        <div class="row">
            <div class="col-12">
                <div class="card card-info card-outline mb-4">
                    <!--begin::Header-->
                    <div class="card-header">
                        <div class="card-title">Form Validation</div>
                    </div>
                    <!--end::Header-->
                    <!--begin::Form-->
                    <form class="needs-validation" novalidate>
                        <!--begin::Body-->
                        <div class="card-body">
                            <!--begin::Row-->
                            <div class="row g-3">
                                <!--begin::Col-->
                                <div class="col-md-6"> <label for="kode_produk" class="form-label">Kode
                                        Barang</label> <input type="text" name="kode_produk" class="form-control" id="kode_produk"
                                        value="" required>
                                    <div class="valid-feedback">Looks good!</div>
                                </div>
                                <!--end::Col-->
                                <!--begin::Col-->
                                <div class="col-md-6"> <label for="nama_produk" class="form-label">Nama
                                        Barang</label> <input type="text" class="form-control" id="nama_produk"
                                        value="" required>
                                    <div class="valid-feedback">Looks good!</div>
                                </div>
                                <!--end::Col-->
                                <!--begin::Col-->
                                <div class="col-md-6"> <label for="validationCustomUsername"
                                        class="form-label">Harga Jual</label>
                                     <input type="text" class="form-control"  required>
                                </div>
                                <!--end::Col-->
                                <div class="col-md-6"> <label for="harga_partai" class="form-label">Harga
                                        Grosir (Partai)</label> <input type="text" name="harga_partai" class="form-control" id="harga_partai"
                                        value="" required>
                                    <div class="valid-feedback">Looks good!</div>
                                </div>
                                <!--end::Col-->
                                <!--begin::Col-->
                                <div class="col-md-6"> <label for="validationCustom04" class="form-label">State</label>
                                    <select class="form-select" id="validationCustom04" required>
                                        <option selected disabled value="">Choose...</option>
                                        <option>...</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Please select a valid state.
                                    </div>
                                </div>
                                <!--end::Col-->
                                <!--begin::Col-->
                                <div class="col-md-6"> <label for="validationCustom05" class="form-label">Zip</label>
                                    <input type="text" class="form-control" id="validationCustom05" required>
                                    <div class="invalid-feedback">
                                        Please provide a valid zip.
                                    </div>
                                </div>
                                <!--end::Col-->
                                <!--begin::Col-->
                                <div class="col-12">
                                    <div class="form-check"> <input class="form-check-input" type="checkbox" value=""
                                            id="invalidCheck" required> <label class="form-check-label"
                                            for="invalidCheck">
                                            Agree to terms and conditions
                                        </label>
                                        <div class="invalid-feedback">
                                            You must agree before submitting.
                                        </div>
                                    </div>
                                </div>
                                <!--end::Col-->
                            </div>
                            <!--end::Row-->
                        </div>
                        <!--end::Body-->
                        <!--begin::Footer-->
                        <div class="card-footer"> <button class="btn btn-info" type="submit">Submit form</button> </div>
                        <!--end::Footer-->
                    </form>
                    <!--end::Form-->

                </div>
                <!--end::Form Validation-->
            </div>
        </div>
    </div>

</template>

<script setup>

</script>