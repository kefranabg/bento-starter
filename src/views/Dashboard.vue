<template>
  <div class="page-wrapper">
    <h1 class="dashboard-page-title">Dashboard page</h1>
    <product-list class="product-list"></product-list>
    <add-product></add-product>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'
import AddProduct from '@/components/AddProduct'

export default {
  components: { ProductList, AddProduct }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.dashboard-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.product-list {
  margin: 20px 0;
}
</style>
