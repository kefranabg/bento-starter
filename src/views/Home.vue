<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">{{ appTitle }}</h1>
    <img class="logo" src="@/assets/img/bento-starter.svg" />

    <a
      class="documentation-link"
      target="_blank"
      href="https://bento-starter.netlify.com/"
      >Documentation →</a
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head: {
    title: {
      inner: 'Home'
    },
    meta: [
      {
        name: 'description',
        content: 'The front page of bento-starter.'
      }
    ]
  },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    margin-bottom: 3rem;
  }

  .home-page-title {
    margin-top: 3rem;
    text-align: center;
  }

  .documentation-link {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: #3eaf7c;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    border-bottom: 1px solid #389d70;
    text-decoration: none;
    width: fit-content;
    font-weight: 500;
  }
}
</style>
