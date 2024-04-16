<template>
  <div class="navbar">
    <h1>{{ logoText }}</h1>
  </div>
  <div class="description">
    <h5>Berdasarkan data OpenAQ API</h5>
  </div>
  <apexchart
    type="line"
    height="350"
    :options="chartOptions"
    :series="series"
    @click="handlePointClick"
  ></apexchart>
  <!-- Popup for displaying detail data -->
  <div v-if="selectedData" class="popup">
    <h3>Detail Data</h3>
    <p><strong>Location:</strong> {{ selectedData.location }}</p>
    <p><strong>PM 2.5 Value:</strong> {{ selectedData.value }}</p>
    <!-- Add more detail fields as needed -->
  </div>
  <div class="footer">
    <p>&copy; 2024 Made by Didin Nur Yahya</p>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const logoText = ref("Air Quality Dashboard");

const chartOptions = ref({
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: "Air Quality Trends",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: [],
  },
});

const series = ref([]);

const selectedData = ref(null);
let fetchedData = null; // Variable to store fetched data

// Fetch data from the API and update chartOptions and series
onMounted(async () => {
  try {
    const response = await axios.get("https://api.openaq.org/v2/measurements", {
      params: {
        location_id: 5477,
        parameter: "pm25",
        date_from: "2024-01-31T14:32:55+07:00",
        date_to: "2024-02-01T14:32:55+07:00",
        limit: 10,
      },
    });
    fetchedData = response.data.results; // Store fetched data

    // Update chart x-axis categories with location names
    chartOptions.value.xaxis.categories = fetchedData.map(
      (item) => item.location
    );

    // Update series data with PM 2.5 values
    series.value = [
      {
        name: "PM 2.5",
        data: fetchedData.map((item) => item.value),
      },
    ];
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle error
  }
});

// Method to handle click event on chart
const handlePointClick = (event, chartContext, config) => {
  if (config.seriesIndex !== undefined && config.dataPointIndex !== undefined) {
    // Get the clicked data point
    const clickedData =
      series.value[config.seriesIndex].data[config.dataPointIndex];
    // Find the corresponding data object
    const clickedDataObject = fetchedData.find(
      (item) => item.value === clickedData
    );
    // Update selectedData with clicked data object
    selectedData.value = clickedDataObject;
  }
};
</script>

<style scoped>
.navbar {
  background-color: #9ad3bc; /* Navbar background color */
  color: #fff; /* Text color */
  padding: 20px; /* Padding */
  border-radius: 10px; /* Rounded corners */
  text-align: center; /* Center the text */
  margin-bottom: 20px; /* Add some space between navbar and chart */
}

.navbar h1 {
  margin: 0; /* Remove default margin */
}

.description {
  text-align: center; /* Center the text */
}

.popup {
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1000;
}

.footer {
  background-color: #9ad3bc; /* Footer background color */
  color: #fff; /* Text color */
  padding: 10px 20px; /* Padding */
  border-radius: 10px; /* Rounded corners */
  text-align: center; /* Center the text */
  margin-top: 17%; /* Add some space between chart and footer */
}
</style>
