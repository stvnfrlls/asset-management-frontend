<template>
  <div>
    <component :is="currentComponent" @replace-component="handleReplaceComponent"></component>
  </div>
</template>
<script>
import licenseMain from '~/components/License/licenseMain.vue';

export default {
  components: {
    'Asset-licenseMain': licenseMain,
  },
  data() {
    return {
      currentComponent: 'licenseMain', // Initial component to render
    }
  },
  created() {
    this.$store.commit('setAuditPage', 'Licensing');
  },
  methods: {
    handleReplaceComponent(newComponent) {
      this.currentComponent = newComponent
    },
  },
}
</script>
