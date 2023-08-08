<template>
  <div>
    <transferHistoryMains />
  </div>
</template>
<script>
import transferHistoryMain from '~/components/History/transferHistoryMain.vue';
export default {
  components: {
    'transferHistoryMains': transferHistoryMain,
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
