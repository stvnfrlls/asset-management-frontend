<template>
  <div style="width:100%">
    <dashboard />
  </div>
</template>
<script>
export default {
  created() {
    const permissions = this.$cookies.get('permission');
    if (permissions[0].dashboard != '1') {
      this.$router.push('/asset/assetListPage');
    }
  },
}
</script>
