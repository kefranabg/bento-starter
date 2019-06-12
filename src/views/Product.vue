<template>
  <div class="page-wrapper">
    <product-detail v-if="areProductsLoaded" :id="id"></product-detail>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductDetail from '@/components/ProductDetail'

export default {
  components: { ProductDetail },
  props: {
    id: String
  },
  computed: mapGetters('products', ['areProductsLoaded'])
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
