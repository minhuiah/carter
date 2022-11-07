<template>
  <mapbox-map
    class="map"
    mapStyle="mapbox://styles/mapbox/outdoors-v10?optimize=true"
    :zoom="16"
    accessToken="pk.eyJ1IjoiMWhpdW9uaiIsImEiOiJjbDlhcnNha2MwbWRtM3BxdDJ1d2psNTF5In0.3I_UAtOyTVSwLev2yEua8w"
    :center="[location.lng, location.lat]"
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
import { useMapStore } from "@/stores/Map";

export default defineComponent({
  computed: {
    ...mapState(useCarparkStore, ["carparks"]),
    ...mapState(useMapStore, ["location"]),
  },
});
</script>
