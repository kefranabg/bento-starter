<template>
  <div class="contributor-list">
    <p v-if="contributors === null">Fetching...</p>
    <contributor-item
      v-for="contributor in contributors"
      :key="contributor.id"
      :data="contributor"
    ></contributor-item>
  </div>
</template>

<script>
import ContributorItem from './ContributorItem'

export default {
  components: { ContributorItem },
  props: {
    contributors: Array
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.contributor-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
