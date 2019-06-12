<template>
  <div class="product-detail">
    <h1>{{ currentProduct.name }}</h1>
    <div>Product description ...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    id: String
  },
  computed: {
    ...mapGetters('products', ['getProductById']),
    currentProduct() {
      return this.getProductById(this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.product-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
