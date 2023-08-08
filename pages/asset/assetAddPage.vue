<template>
  <div class="not-container" style="">
    <component :is="currentComponents" @replace-component="handleReplaceComponent"></component>
  </div>
</template>

<script>
import Create from '~/components/Asset/Create.vue';
export default {
  components: {
    'Create': Create,
  },
  data() {
    return {
      currentComponents: 'Create', // Initial component to render
    }
  },
  created() {
    this.updateAuditPage();
    this.updateAuditAction();
    this.redirectToDashboard();
  },
  methods: {
    handleReplaceComponent(newComponent) {
      this.currentComponents = newComponent
    },
    updateAuditPage() {
      this.$store.commit('setAuditPage', 'Asset');
    },
    updateAuditAction() {
      this.$store.commit('setAuditAction', 'Create');
    },
    redirectToDashboard() {
      const permissions = this.$cookies.get('permission');

      if (permissions[0].asset_create != '1') {
        this.$router.push('/');
      }
    }
  },
}
</script>
