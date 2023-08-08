<template>
  <div>
    <component :is="currentComponent" @replace-component="handleReplaceComponent"></component>
  </div>
</template>
<script>
import Dispose from "~/components/Dispose/List.vue";
export default {
  components: {
    "Dispose": Dispose,
  },
  name: "IndexPage",
  data() {
    return {
      currentComponent: "Dispose", // Initial component to render
    };
  },
  created() {
    this.redirectToDashboard();
  },
  methods: {
    handleReplaceComponent(newComponent) {
      this.currentComponent = newComponent;
    },
    redirectToDashboard() {
      const permissions = this.$cookies.get('permission');

      if (permissions[0].asset_dispose != '1') {
        this.$router.push('/');
      }
    }
  },
};
</script>
<style scoped>
.not-container {
  width: 80%;
  margin: auto;
  overflow-y: auto;
  margin-bottom: 5%;
}
</style>
