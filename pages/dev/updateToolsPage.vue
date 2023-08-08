<template>
  <div class="not-container">
    <p style="margin-top:-50px">Dev tools/Manage Selection</p>
    <Dev-updateTools />
  </div>
</template>
<script>
import updateTools from "~/components/Dev/updateTools.vue";

export default {
  components: {
    "Dev-updateTools": updateTools,
  },
  created() {
    this.$store.commit('setAuditPage', 'Dev tools: Selection');
    this.redirectToDashboard();
  },
  methods: {
    redirectToDashboard() {
      const permissions = this.$cookies.get('permission');

      if (permissions[0].dev_tools != '1') {
        this.$router.push('/');
      }
    }
  },
}
</script>

<style scoped>
.container {
  width: 96%;
}

.containers {
  width: 96%;
}
</style>
