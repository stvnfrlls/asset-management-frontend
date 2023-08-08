<template>
  <div>
    <client-only>
      <h3><span>License Category</span></h3>
      <PieChart :data="this.chartData" />
    </client-only>
  </div>
</template>
<script>
export default {
  data() {
    return {
      AssetCount: 0,
      AssetInUse: 0,
      LicenseCount: 0,
      AuditLogs: [],
      AvailableSoftwarePerCategory: []
    }
  },
  computed: {
    chartData() {
      const labels = this.AvailableSoftwarePerCategory.map((item) => item.software);
      const data = this.AvailableSoftwarePerCategory.map((item) => item.count);

      const randomColors = labels.map(() => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, .8)`;
      });

      return {
        labels: labels,
        datasets: [
          {
            label: labels,
            data: data,
            backgroundColor: randomColors,
            borderColor: randomColors,
            borderWidth: 2,
          },
        ],
      }
    },
  },
  created() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const dashboardData = await this.$axios.$get('/dashboardData', {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('authToken')
          }
        });
        this.AvailableSoftwarePerCategory = dashboardData.AvailableSoftwarePerCategory;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
<style scoped>
h3 {
  text-align: center;
}

@media screen and (max-width: 1024px) {
  h3 {
    font-size: 20px;
  }
}
</style>
