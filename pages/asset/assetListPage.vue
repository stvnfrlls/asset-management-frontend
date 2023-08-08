<template>
  <div>
    <component :is="currentComponent" @replace-component="handleReplaceComponent"></component>
  </div>
</template>
<script>
import List from '~/components/Asset/List.vue';

export default {
  components: {
    'List': List,
  },
  data() {
    return {
      currentComponent: 'List', // Initial component to render
    }
  },
  created() {
    this.updateAuditPage();
  },
  methods: {
    handleReplaceComponent(newComponent) {
      this.currentComponent = newComponent
    },
    updateAuditPage() {
      this.$store.commit('setAuditPage', 'Asset');
    },
  },
}
</script>
