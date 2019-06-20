<template>
  <div class="product-detail">
    <h1>{{ product.name }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    product: Object
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
