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
