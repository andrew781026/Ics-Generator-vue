<script setup>
import ButtonGroup from "./components/ButtonGroup.vue";
import EventTable from "./components/EventTable.vue";
import EventForm from "./components/EventForm.vue";
</script>

<template>

  <div class="container">
    <h2 class="mb-4">📅 活動產生器</h2>
    <EventForm/>

    <h4>🗂 活動清單</h4>
    <EventTable/>

    <ButtonGroup/>
  </div>


</template>

<style scoped>

</style>
