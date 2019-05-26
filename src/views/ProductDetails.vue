<template>
  <div>
    <!-- Product details -->
    <div v-if="currentProduct">
      <h1>{{ currentProduct.name }}</h1>
      <div>Product description ...</div>
    </div>

    <!-- This will be display while loading the products -->
    <div v-else>Fetching products...</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('products', ['productById']),
    currentProduct() {
      return this.productById(this.$route.params.id)
    }
  }
}
</script>

<style></style>
