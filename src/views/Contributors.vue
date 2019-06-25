<template>
  <div class="page-wrapper">
    <h1 class="page-title">Thanks to all contributors !</h1>
    <contributor-list :contributors="contributorList"></contributor-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ContributorList from '@/components/ContributorList'

export default {
  components: { ContributorList },
  head: function() {
    return {
      title: {
        inner: 'Contributors'
      },
      meta: [
        {
          name: 'contributors',
          content: `Thanks to all ${this.appTitle} contributors`,
          id: 'contributors'
        }
      ]
    }
  },
  computed: {
    ...mapState('app', ['appTitle']),
    ...mapState('contributors', {
      contributorList: 'list'
    })
  },
  mounted() {
    this.fetchContributors()
  },
  methods: mapActions('contributors', ['fetchContributors'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .page-title {
    text-align: center;
  }
}
</style>
