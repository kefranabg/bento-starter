<template>
  <div class="page-wrapper">
    <h1 class="products-page-title">Products page</h1>
    <product-list class="product-list"></product-list>
    <add-product v-if="networkOnLine"></add-product>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductList from '@/components/ProductList'
import AddProduct from '@/components/AddProduct'

export default {
  components: { ProductList, AddProduct },
  computed: mapState('app', ['networkOnLine'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.products-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.product-list {
  margin: 20px 0;
}
</style>
