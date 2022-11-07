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
    <mapbox-marker v-for="car in rentals" :lngLat="[car.lng, car.lat]">
      <template v-slot:icon>
        <img class="icon" src="@/assets/images/bluecar.png" />
      </template>
    </mapbox-marker>
  </mapbox-map>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useMapStore } from "@/stores/Map";
import { useRentalStore } from "@/stores/Rental";

export default defineComponent({
  computed: {
    ...mapState(useRentalStore, ["rentals"]),
    ...mapState(useMapStore, ["location"]),
  },
});
</script>

<style scoped>
.icon {
  height: 3rem;
  width: 3rem;
}
</style>
