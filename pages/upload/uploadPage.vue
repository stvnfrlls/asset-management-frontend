
<template>
  <div style="">
    <component :is="currentComponent" @replace-component="handleReplaceComponent"></component>
  </div>
</template>
<script>
import UploadAsset from '~/components/Upload/UploadAsset.vue';

export default {
  components: {
    'Asset-UploadAsset': UploadAsset,
  },
  data() {
    return {
      currentComponent: 'UploadAsset', // Initial component to render
    }
  },
  created() {
    this.$store.commit('setAuditPage', 'Upload');
    this.$store.commit('setAuditAction', 'Created');
    this.redirectToDashboard();
  },
  methods: {
    handleReplaceComponent(newComponent) {
      this.currentComponent = newComponent
    },
    redirectToDashboard() {
      const permissions = this.$cookies.get('permission');

      if (permissions[0].asset_upload != '1') {
        this.$router.push('/');
      }
    }
  },
}
</script>
