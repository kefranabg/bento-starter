<template>
  <div>
    <p class="infos-label" v-if="products === null">Loading...</p>
    <p class="infos-label" v-if="products && !products.length">
      You don't have any product yet
    </p>
    <product-item
      class="product-row"
      v-for="(product, index) in products"
      :index="index"
      :key="product.id"
      :isProductDeletionPending="isProductDeletionPending(product.id)"
      @deleteProduct="deleteUserProduct"
      :data="product"
    ></product-item>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { ProductItem },
  computed: {
    ...mapGetters('products', ['isProductDeletionPending']),
    ...mapState('products', ['products'])
  },
  methods: mapActions('products', ['deleteUserProduct'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.infos-label {
  text-align: center;
}

.product-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin: 10px auto;
  justify-content: space-between;
}
</style>
