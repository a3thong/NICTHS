<template> 
    <main class="home-page">
        <h1>Dashboard</h1> 
      
        <p>This is the Dashboard Page</p>
        <div>
           <input type="date">
        </div>
        <div class="container">
           <div class="map">
              <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: true}" :useGlobalLeaflet="false">
                 <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                   <l-geo-json :geojson="geojson"  >
                    </l-geo-json>
              </l-map>
            </div>
          
            <div class="charts">
        <div class="chart">
        <doughnut :data="data1" :options="options" style="height: 250px; width: 70%;" />
        </div>
      
        <div class="chart">
        <pie :data="data2" :options="options" style="height: 250px; width: 70%;" />
        </div>
        <div class="chart">
        <pie :data="data3" :options="options" style="height: 250px; width: 70%;" />
        </div>
        <!-- <div class="bar-graph-container">
           <canvas id="barGraph"></canvas>
         </div> -->
        
      </div>
    
    </div>
      

 

    </main>
</template>


<script setup>
import { ref, onMounted, computed, inject, DeprecationTypes } from 'vue'
import { LMap, LTileLayer, LGeoJson, LControl, LControlZoom } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css"
import { Chart as ChartJS, ArcElement,CategoryScale, LinearScale,  PointElement,  LineElement,  Title, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { Pie, Line, Bar } from 'vue-chartjs'


// to do put names, putting REGION restrictions, specific regions display, 

const url = ref('whitebg.png');
const geojson = ref(null);
const fetchGeojson = async () => {
const response = await fetch('/PH_REGION.json');
geojson.value = await response.json();
};
let zoom = ref(6)
let center = ref([12.8797, 121.7740])
const options = computed(() => ({

  }));
  onMounted(fetchGeojson);

  // restriction depends on user CO,RO,PO deligate graphs kung anong area ang dinidisplay

  ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale, LinearScale,  PointElement,  LineElement,  Title,)
  const data1 = ref({
  labels: ['Ongoing', 'Not yet Started', 'Completed', 'Callback'],
  datasets: [
    {
      backgroundColor: ['#d1e2f2', '#539dcc', '#093168' , '#055312'],
      data: [33, 23, 45, 19]
    }
  ]
})

  const data2 = ref({
  labels: ['Ongoing', 'Not yet Started', 'Completed', 'Callback'],
  datasets: [
    {
      backgroundColor: ['#d1e2f2', '#539dcc', '#093168' , '#055312'],
      data: [33, 123, 45, 111]
    }
  ]
})

const data3 = ref({
  labels: ['Ongoing', 'Not yet Started', 'Completed', 'Callback'],
  datasets: [
    {
      backgroundColor: ['#d1e2f2', '#539dcc', '#093168' , '#055312'],
      data: [33, 123, 45, 111]
    }
  ]
})

// bar graph

// var barGraphData = {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: 'My First Dataset',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   };

//   // Chart options
//   var barGraphCanvas = document.getElementById('barGraph').getContext('2d');
//   var barGraph = new Chart(barGraphCanvas, {
//     type: 'bar',
//     data: barGraphData,
//     options: barGraphOptions
//   });
//   var barGraphOptions = {
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   };
 


</script>


<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 0;
  
}

.chart {
  background-color: rgb(230, 218, 173);
  padding: 20px;
}

.charts {
  display: grid;
  grid-template-columns: 1fr; 
  gap: 0; 
}

.bar-graph-container {
  margin-top: 20px; /* Adjust spacing from the charts */
}
.map {
  background-color: lightgreen;
  padding: 20px;
}

@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 480px)
  and (-webkit-min-device-pixel-ratio: 2) {

}

</style>

