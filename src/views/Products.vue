<template>
  <div class="page-wrapper">
    <h1 class="products-page-title">Products page</h1>
    <product-list class="product-list"></product-list>
    <add-product></add-product>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'
import AddProduct from '@/components/AddProduct'

export default {
  head: {
    title: {
      inner: 'Products'
    },
    meta: [
      {
        name: 'description',
        content:
          'A list of all your information about vuejs-firebase-starter-kit.'
      }
    ]
  },
  components: { ProductList, AddProduct }
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
