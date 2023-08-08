import Vue from 'vue'
import { Bar, Line, Pie, Doughnut, HorizontalBar } from 'vue-chartjs'

Vue.component('DoughnutChart', {
    extends: Doughnut,
    props: {
        data: {
            type: Object,
            required: true,
        },
        options: {
            type: Object,
            required: false,
            default: () => ({
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
            }),
        },
    },
    watch: {
        data() {
            this.renderChart(this.data, this.options)
        },
    },
    mounted() {
        this.renderChart(this.data, this.options);
        let sidebarBtn = document.getElementById("bx-menu");
        window.addEventListener('resize', this.resetChartSize);
        sidebarBtn.addEventListener("click", () => {
            // Add a delay of 300 milliseconds (half a second)
            setTimeout(() => {
                this.resetChartSize();
            }, 300);
        });

    },
    beforeDestroy() {
        let sidebarBtn = document.getElementById("bx-menu");
        window.removeEventListener('resize', this.resetChartSize);
        sidebarBtn.addEventListener("click", () => {
            // Add a delay of 300 milliseconds (half a second)
            setTimeout(() => {
                this.resetChartSize();
            }, 300);
        });

    },
    methods: {
        resetChartSize() {
            const chartContainer = this.$refs.canvas.parentNode;
            const canvas = chartContainer.getElementsByTagName('canvas')[0];
            const computedStyle = getComputedStyle(chartContainer);
            const containerWidth = parseInt(computedStyle.getPropertyValue('width'), 10);
            const containerHeight = parseInt(computedStyle.getPropertyValue('height'), 10);

            canvas.width = containerWidth;
            canvas.height = containerHeight;

            this.renderChart(this.data, this.options);
        },
    },
})

Vue.component('BarChart', {
    extends: HorizontalBar, // Assuming you have imported the necessary HorizontalBar chart component
    props: {
        data: {
            type: Object,
            required: true,
        },
        options: {
            type: Object,
            required: false,
            default: () => ({
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                beginAtZero: true, // Start the x-axis at zero
                                precision: 0, // Display only integers
                                suggestedMin: 0, // Set a value lower than the lowest value in your data
                            },
                        },
                    ],
                },
            }),
        },
    },
    watch: {
        data() {
            this.renderChart(this.data, this.options);
        },
    },
    mounted() {
        this.renderChart(this.data, this.options);
        let sidebarBtn = document.getElementById("bx-menu");
        window.addEventListener('resize', this.resetChartSize);
        sidebarBtn.addEventListener("click", () => {
            // Add a delay of 300 milliseconds (half a second)
            setTimeout(() => {
                this.resetChartSize();
            }, 300);
        });

    },
    beforeDestroy() {
        let sidebarBtn = document.getElementById("bx-menu");

        window.removeEventListener('resize', this.resetChartSize);
        sidebarBtn.addEventListener("click", () => {
            // Add a delay of 300 milliseconds (half a second)
            setTimeout(() => {
                this.resetChartSize();
            }, 300);
        });

    },
    methods: {
        resetChartSize() {
            const chartContainer = this.$refs.canvas.parentNode;
            const canvas = chartContainer.getElementsByTagName('canvas')[0];
            const computedStyle = getComputedStyle(chartContainer);
            const containerWidth = parseInt(computedStyle.getPropertyValue('width'), 10);
            const containerHeight = parseInt(computedStyle.getPropertyValue('height'), 10);

            canvas.width = containerWidth;
            canvas.height = containerHeight;

            this.renderChart(this.data, this.options);
        },
    },
});

Vue.component('PieChart', {
    extends: Pie, // Assuming you have imported the necessary Pie chart component
    props: {
        data: {
            type: Object,
            required: true,
        },
        options: {
            type: Object,
            required: false,
            default: () => ({
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'bottom',
                },
            }),
        },
    },
    watch: {
        data() {
            this.renderChart(this.data, this.options);
        },
    },
    mounted() {
        this.renderChart(this.data, this.options);
        let sidebarBtn = document.getElementById("bx-menu");
        window.addEventListener('resize', this.resetChartSize);
        sidebarBtn.addEventListener("click", () => {
            // Add a delay of 300 milliseconds (half a second)
            setTimeout(() => {
                this.resetChartSize();
            }, 300);
        });

    },
    beforeDestroy() {
        let sidebarBtn = document.getElementById("bx-menu");

        window.removeEventListener('resize', this.resetChartSize);
        sidebarBtn.addEventListener("click", () => {
            // Add a delay of 300 milliseconds (half a second)
            setTimeout(() => {
                this.resetChartSize();
            }, 300);
        });

    },
    methods: {
        resetChartSize() {
            const chartContainer = this.$refs.canvas.parentNode;
            const canvas = chartContainer.getElementsByTagName('canvas')[0];
            const computedStyle = getComputedStyle(chartContainer);
            const containerWidth = parseInt(computedStyle.getPropertyValue('width'), 10);
            const containerHeight = parseInt(computedStyle.getPropertyValue('height'), 10);

            canvas.width = containerWidth;
            canvas.height = containerHeight;

            this.renderChart(this.data, this.options);
        },
    },
});
