<template>
  <div class="not-container">
    <component :is="currentComponent" @replace-component="handleReplaceComponent"></component>
  </div>
</template>

<script>
import DeviceSpec from '~/components/Asset/DeviceSpec.vue';
export default {
  components: {
    'DeviceSpec': DeviceSpec,
  },
  data() {
    return {
      currentComponent: 'DeviceSpec', // Initial component to render
    }
  },
  created() {
    this.updateAuditAction();
    this.redirectToDashboard();
  },
  methods: {
    handleReplaceComponent(newComponent) {
      this.currentComponent = newComponent
    },
    updateAuditAction() {
      this.$store.commit('setAuditPage', 'Asset');
      this.$store.commit('setAuditAction', 'Added Device Specs');
    },
    redirectToDashboard() {
      const permissions = this.$cookies.get('permission');

      if (permissions[0].asset_device != '1') {
        this.$router.push('/');
      }
    }
  },
}
</script>

<style scoped>
.not-container {
  width: 90%;
  margin: auto;
  overflow-y: auto;
  margin-bottom: 5%;
}
</style>
