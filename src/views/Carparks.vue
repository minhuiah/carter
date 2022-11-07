<template>
  <mapbox-map
    class="map"
    mapStyle="mapbox://styles/mapbox/outdoors-v10?optimize=true"
    :zoom="16"
    accessToken="pk.eyJ1IjoiMWhpdW9uaiIsImEiOiJjbDlhcnNha2MwbWRtM3BxdDJ1d2psNTF5In0.3I_UAtOyTVSwLev2yEua8w"
    :center="centerLocation"
  >
    <mapbox-geolocate-control />
    <mapbox-navigation-control position="bottom-left" />
    <mapbox-marker v-for="data in carparks" :lngLat="[data.lat, data.lng]">
      <template v-slot:icon>
        <div class="carpark-icon">
          {{ data.availableLots }}
        </div>
      </template>
    </mapbox-marker>
  </mapbox-map>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCarparkStore } from "@/stores/Carparks";
import { mapState } from "pinia";

export default defineComponent({
  data() {
    return {
      currentLocation: {
        long: 103.852119,
        lat: 1.296568,
      },
    };
  },
  computed: {
    centerLocation() {
      return [this.currentLocation.long, this.currentLocation.lat];
    },
    ...mapState(useCarparkStore, ["carparks"]),
  },
});
</script>
