<template>
  <h1>{{ menuName }}</h1>
</template>
<script>
export default {
  computed: {
    menuName: function () {
      let s = decodeURIComponent(this.$route.query.menuName)
      this.test()
      return s
    }
  },
  methods: {
    test () {
      alert(1)
    }
  }
}
</script>
