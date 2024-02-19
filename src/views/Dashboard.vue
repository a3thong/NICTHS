<template> 


    <main class="home-page">
        <h2>Dashboard</h2>
        <!-- <div class="card flex justify-content-center">
      <div class="flex flex-column gap-3">
        <label for="categorySelect">Select a User:</label>
        <select id="categorySelect" v-model="selectedCategory">
          <option value="">-- Please select --</option>
          <option v-for="category in categories" :key="category.key" :value="category.key">{{ category.name }}</option>
        </select>
        <div v-if="selectedCategory">
          <p>Selected Category: {{ getCategoryName(selectedCategory) }}</p>
        </div>
      </div>
    </div> -->

    <b>Region: </b>
            <select class="selectPageRowsStyle" v-model="selectedRegion" >
              <option :value=null>Region1</option>
              <option :value=null>Region2</option>
              <option :value=null>Region3</option>
              <option :value=null>Region4-A</option>
              <option :value=null>MIMAROPA</option>
              <option :value=null>Region6</option>
              <option :value=null>Region7</option>
              <option :value=null>Region8</option>
              <option :value=null>Region9</option>
              <option :value=null>Region10</option>
              <option :value=null>Region11</option>
              <option :value=null>Region12</option>
              <option :value=null>Region13</option>
              <option :value=null>Region14</option>
              <option :value=null>NCR</option>
              <option :value=null>CAR</option>
              <option :value=null>BARMM</option>
              <option v-for="region in regions" v-bind:key="region.Reg" :value="region.Reg">
                {{ region.name }}
              </option>
            </select>
            
        <div class="container">       
          <!-- map -->
           <div class="map">
              <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center" :options="{zoomControl: true}" :useGlobalLeaflet="false">
                 <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                   <l-geo-json :geojson="geojson"  :options="options">
                    </l-geo-json>
              </l-map>
            </div>
          <!-- Charts -->
         <div class="charts">   
            <div class="chart">
              <h5 class="chartTitle">Regional Survey Status</h5>
              <Chart type="bar" :data="chartData" :options="chartOptions" style="height: 350px; width: 70%;"  />
            </div>
            <div class="chart">
              <h5 class="chartTitle">Provincial Survey Status</h5>
              <Chart type="bar" :data="chartData1" :options="chartOptions1" style="height: 250px; width: 100%;" />
            </div>
            <div class="chart">
              <h5 class="chartTitle">Municipality Survey Status</h5>
              <Chart type="pie" :data="chartData2" :options="chartOptions2" style="height: 250px; width: 70%;"/>
            </div>     
          </div> 
        </div>

    </main>
</template>


<script setup>
import { ref, onMounted, computed, inject, DeprecationTypes } from 'vue'
import { LMap, LTileLayer, LGeoJson, LControl, LControlZoom } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css"
import Chart from 'primevue/chart';




// calendar 

// to do put names, putting REGION restrictions, specific regions display, 
//  Map 
const url = ref('whitebg.png');
const geojson = ref(null);
const fetchGeojson = async () => {
const response = await fetch('/PH_REGION.json');
geojson.value = await response.json();
};
let zoom = ref(6)
let center = ref([12.8797, 121.7740])
const attribution = ref("")
let regions  = ref([])
let selectedRegion = ref()
let selectedProvince = ref()
const filterFunction = computed(() => {
      return (feature) => {
        if(selectedRegion.value == null){
          return feature.properties.Name;
        }else if(selectedRegion.value != null && selectedProvince.value == null){
          return feature.properties.Name == selectedRegion.value;
        }else if(selectedProvince.value.area_name != null && selectedMunicipal.value == null){
          return feature.properties.Name == selectedRegion.value && feature.properties.Province == selectedProvince.value.area_name.toUpperCase()
        }else if(selectedMunicipal.value.area_name != null){
          return feature.properties.Mun == selectedMunicipal.value.area_name.toUpperCase()
        }else{}

      }
    });
const onEachFeatureFunction = computed(() => {
    return (feature, layer) => {
        if(selectedRegion.value != null && selectedProvince.value == null){
            zoom.value = 7;
            let attributeValue = feature.properties.Reg;
            let color;
            if (attributeValue == selectedRegion.value) {
              color = "#216ba8";
              layer.on('mouseover', () => {
                layer.setStyle({
                  color: 'red',
                  weight: 5,
                  fillOpacity: 2,
                  opacity: 3
                });
              });
              layer.on('mouseout', () => {
                layer.setStyle({
                  color: 'black',
                  weight: 2,
                  fillOpacity: 1,
                  opacity: 1
                });
              });
              layer.bindTooltip(feature.properties.name,{ permanent: true, sticky: true });
            } else {
              color = "black";
            }
          layer.setStyle({
            fillColor: color,
            fillOpacity: 1,
            opacity: 2,
            weight: 2,
            color: "black",
          });
        }else if(selectedRegion.value != null && selectedProvince.value != null  && selectedMunicipal.value == null){
          let attributeValue = feature.properties.Reg;
          zoom.value = 8;
            let color;
            if (attributeValue == selectedRegion.value && feature.properties.Province == selectedProvince.value.area_name.toUpperCase()) {
              color = "#216ba8";
              layer.on('mouseover', () => {
                layer.setStyle({
                  color: 'red',
                  weight: 5,
                  fillOpacity: 2,
                  opacity: 3
                });
              });
              layer.on('mouseout', () => {
                layer.setStyle({
                  color: 'black',
                  weight: 2,
                  fillOpacity: 1,
                  opacity: 1
                });
              });
              layer.bindTooltip(feature.properties.Mun,{ permanent: true, sticky: true });
            } else {
              color = "black";
            }
          layer.setStyle({
            fillColor: color,
            fillOpacity: 1,
            opacity: 2,
            weight: 2,
            color: "black",
          });
        }else if(selectedRegion.value != null && selectedProvince.value != null && selectedMunicipal.value != null){
          let attributeValue = feature.properties.Reg;
          zoom.value = 8;
            let color;
            if (attributeValue == selectedRegion.value && feature.properties.Province == selectedProvince.value.area_name.toUpperCase() && feature.properties.Mun == selectedMunicipal.value.area_name.toUpperCase()) {
              color = "#216ba8";
              layer.on('mouseover', () => {
                layer.setStyle({
                  color: 'red',
                  weight: 5,
                  fillOpacity: 2,
                  opacity: 3
                });
              });
              layer.on('mouseout', () => {
                layer.setStyle({
                  color: 'black',
                  weight: 2,
                  fillOpacity: 1,
                  opacity: 1
                });
              });
              layer.bindTooltip(feature.properties.name,{ permanent: true, sticky: true });
            } else {
              color = "black";
            }
          layer.setStyle({
            fillColor: color,
            fillOpacity: 1,
            opacity: 2,
            weight: 2,
            color: "black",
          });
        }else{
          let attributeValue = feature.properties.Reg;
          let color;
            if (attributeValue == '01') {
              color = "#539dcc"; //value of created data ituro sa data yung color na magegenerate ng map.
            } else if (attributeValue == '02') {
              color = "#f8fbff";
            } else if (attributeValue == '03') {
              color = "#d1e2f2";
            } else if (attributeValue == '04') {
              color = "#9ac8e0";
            } else if (attributeValue == '05') {
              color = "#539dcc";
            } else if (attributeValue == '06') {
              color = "#1d6cb1";
            } else {
              color = "#093168";
            }
          layer.setStyle({
            fillColor: color,
            fillOpacity: 1,
            opacity: 1,
            weight: 2,
            color: 'black',
          });
          layer.on('mouseover', () => {
            layer.setStyle({
              color: 'purple',
              weight: 5,
              fillOpacity: 2,
              opacity: 3
            });
          });
          layer.on('mouseout', () => {
            layer.setStyle({
              color: 'black',
              weight: 2,
              fillOpacity: 1,
              opacity: 1
            });
          });
          layer.bindTooltip(feature.properties.Name,{ permanent: false, sticky: true });
      }
    };
  });



const options = computed(() => ({
      onEachFeature: onEachFeatureFunction.value,
     filter: filterFunction.value,
    
  }));


  
  
onMounted(fetchGeojson);


// restriction depends on user CO,RO,PO deligate graphs kung anong area ang dinidisplay

//  Bar Chart 
onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: [ 'Region1', 
                  'Region2', 
                  'Region3', 
                  'Region4-A', 
                  'MIMAROPA', 
                  'Region6', 
                  'Region7',
                  'Region8',
                  'Region9',
                  'Region10',
                  'Region11',
                  'Region12',
                  'Region13',
                  'NCR',
                  'CAR',
                  'BARMM'],
        datasets: [
            {
                label: 'Sample Size',
                backgroundColor: documentStyle.getPropertyValue('--cyan-500'),
                borderColor: documentStyle.getPropertyValue('--cyan-500'),
                data: [65, 59, 80, 81, 56, 55, 40, 42, 14, 55, 51, 61, 66, 17, 8, 72, 42]
            },
            {
                label: 'Total number of Surveys',
                backgroundColor: documentStyle.getPropertyValue('--purple-100'),
                borderColor: documentStyle.getPropertyValue('--purple-100'),
                data: [65, 59, 80, 81, 56, 55, 40, 42, 14, 55, 51, 61, 66, 17, 8, 72, 42]
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

//  Chart 2
onMounted(() => {
    chartData1.value = setChartData1();
    chartOptions1.value = setChartOptions1();
});
const chartData1 = ref();
const chartOptions1 = ref();

const setChartData1 = () =>  {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels:  ['Province1', 
                  'Province2', 
                  'Province3', 
                  'Province4', 
                  'Province6', 
                  'Province7',
                  'Province8',
                  'Province9',
                  'Province10',
                  'Province11',
                  'Province12',
                  'Province13'],
        datasets: [
            {
                type: 'bar',
                label: 'Sample Size',
                backgroundColor: documentStyle.getPropertyValue('--cyan-200'),
                data: [50, 25, 12, 48, 90, 76, 42, 14, 55, 51, 61, 66, 17, 8, 72, 42], 
            
            },
            {
                type: 'bar',
                label: 'Ongoing',
                backgroundColor: documentStyle.getPropertyValue('--green-100'),
                data: [21, 84, 24, 75, 37, 65, 34, 42, 14, 55, 51, 61, 66, 17, 8, 72, 42]
            },
            {
                type: 'bar',
                label: 'Done',
                backgroundColor: documentStyle.getPropertyValue('--pink-100'),
                data: [41, 52, 24, 74, 23, 21, 32, 42, 14, 55, 51, 61, 66, 17, 8, 72, 42]
            }
        ]
    };
};
const setChartOptions1 = () =>  {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}


onMounted(() => {
    chartData2.value = setChartData2();
    chartOptions2.value = setChartOptions2();
});

const chartData2 = ref();
const chartOptions2 = ref();

const setChartData2 = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: [],
        datasets: [
            {
                data: [540, 325, 702],
                BackgroundColor: [documentStyle.getPropertyValue('--pink-100'), documentStyle.getPropertyValue('--orange-100'), documentStyle.getPropertyValue('---500')]
            }
        ]
    };
};

const setChartOptions2 = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};

</script>


<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 0;
  
}

.chart {
  background-color: rgb(255, 255, 255);
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
  background-color: rgb(178, 238, 144);
  padding: 0px;
}

@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 480px)
  and (-webkit-min-device-pixel-ratio: 2) {

  body {
    font-size: 14px;
  }
}

.chartTitle {
  text-align-last: center;
}

</style>

