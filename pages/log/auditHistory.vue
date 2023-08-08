<template>
  <div>
    <auditHistoryMain />
  </div>
</template>
<script>
import auditHistoryMain from "~/components/History/auditHistoryMain.vue";
export default {
  components: {
    auditHistoryMain: auditHistoryMain,
  },
  created() {
    this.updateAuditPage();
    this.redirectToDashboard();
  },
  methods: {
    updateAuditPage() {
      this.$store.commit('setAuditPage', 'History');
    },
    redirectToDashboard() {
      const permissions = this.$cookies.get('permission');

      if (permissions[0].view_logs != '1') {
        this.$router.push('/');
      }
    }
  },
};
</script>
