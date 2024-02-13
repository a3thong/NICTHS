<template> 
    <main class="home-page">
        <h1>Dashboard</h1> 
      
        <p>This is the Dashboard Page</p>
        <div>
           <input type="date">
        </div>
        <div>
        <line :data="data1" :options="options" style="height: 400px; width: 70%;" />
      </div>
        <div>
        <l-map style="height: 400px; width: 40%" :zoom="zoom" :center="center" :options="{zoomControl: true}" :useGlobalLeaflet="false">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>

     
        <l-geo-json :geojson="geojson"  >
        </l-geo-json>
      </l-map>
      </div>
      <div>
        <pie :data="data1" :options="options" style="height: 400px; width: 70%;" />
      </div>
      

 

    </main>
</template>


<script setup>
import { ref, onMounted, computed, inject } from 'vue'
import { LMap, LTileLayer, LGeoJson, LControl, LControlZoom } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css"
import { Chart as ChartJS, ArcElement,CategoryScale, LinearScale,  PointElement,  LineElement,  Title, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { Pie, Line } from 'vue-chartjs'




const url = ref('whitebg.png');
const geojson = ref(null);
const fetchGeojson = async () => {
  // const response = await fetch('/PH_REGION.json');
  const response = await fetch('/PH_PROV.json');
  geojson.value = await response.json();
};
let zoom = ref(5)
let center = ref([12.8797, 121.7740])
const options = computed(() => ({

  }));

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


onMounted(fetchGeojson);
</script>

<!-- <script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LGeoJson, LControl, LControlZoom } from "@vue-leaflet/vue-leaflet";

const response = await fetch('/PH_REGION.json');

</script>
 -->

