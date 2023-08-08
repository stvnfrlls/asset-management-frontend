<template>
  <div>
    <Dev-manageAccount />
  </div>
</template>
<script>
import manageAccount from "~/components/Dev/manageAccount.vue";

export default {
  components: {
    "Dev-manageAccount": manageAccount,
  },
  name: "accountManagementPage",
  created() {
    this.$store.commit('setAuditPage', 'Dev tools: Account');
  },
  mounted() {
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
};
</script>

<style scoped>
.containers {
  width: 96%;
}

.containers {
  width: 96%;
}
</style>
