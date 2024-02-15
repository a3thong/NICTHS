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
                 
                   <l-geo-json :geojson="geojson"  :options="options">
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
        <Line :data="data3" :options="options" style="height: 250px; width: 70%;" />
        </div>

        
      </div>
    
    </div>
      

 

    </main>
</template>


<script setup>
import { ref, onMounted, computed, inject, DeprecationTypes } from 'vue'
import { LMap, LTileLayer, LGeoJson, LControl, LControlZoom } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css"
import { Chart as ChartJS, ArcElement,CategoryScale, LinearScale,  PointElement,  LineElement,  Title, Tooltip, Legend } from 'chart.js'
import { Pie, Doughnut, Line } from 'vue-chartjs'


// to do put names, putting REGION restrictions, specific regions display, 

const url = ref('whitebg.png');
const geojson = ref(null);
const fetchGeojson = async () => {
const response = await fetch('/PH_REGION.json');
geojson.value = await response.json();
};
let zoom = ref(6)
let center = ref([12.8797, 121.7740])
const attribution = ref("Philippines")
const onEachFeatureFunction = computed(() => {
    return (feature, layer) => {
      layer.bindTooltip(feature.properties.Name,{ permanent: true, sticky: true });
      
    };
});
const options = computed(() => ({
      onEachFeature: onEachFeatureFunction.value,
      // filter: filterFunction.value,
  }));



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


onMounted(fetchGeojson);

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

  body {
    font-size: 14px;
  }
}

</style>

