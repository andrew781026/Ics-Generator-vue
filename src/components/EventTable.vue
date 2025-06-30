<template>
  <div class="overflow-auto">
    <table class="table table-striped table-bordered" id="eventsTable">
      <thead>
      <tr>
        <th>#</th>
        <th>UUID</th>
        <th>標題</th>
        <th>說明</th>
        <th>地點</th>
        <th>開始</th>
        <th>結束</th>
        <th>動作</th>
      </tr>
      </thead>
      <tbody>
      <tr :key="event.id" v-for="(event,idx) in Object.values(eventList)">
        <td>{{ idx + 1 }}</td>
        <td>{{ event.id }}</td>
        <td>{{ event.summary }}</td>
        <td>{{ event.description }}</td>
        <td>{{ event.location || '' }}</td>
        <td>{{ event.start.toLocaleString() }}</td>
        <td>{{ event.end.toLocaleString() }}</td>
        <td>
          <div class="d-flex flex-wrap gap-1">
            <button class="btn btn-sm btn-outline-warning" @click="editEvent(event.id)">✏️</button>
            <button class="btn btn-sm btn-outline-danger" @click="deleteEvent(event.id)">🗑️</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {deleteEventInList, eventList} from "../composables/useEventList.js";
import {formData, formMode} from "../composables/useFormData.js";

const oneHour = 60 * 60 * 1000;

function toDatetimeLocalString(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0')

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hour = pad(date.getHours())
  const minute = pad(date.getMinutes())

  return `${year}-${month}-${day}T${hour}:${minute}`
}

// 將 eventId 的資料放到 from 上面
const editEvent = eventId => {

  const event = eventList.value[eventId];
  const diff = event.end - event.start;

  const newEvent = {
    id: event.id,
    summary: event.summary,
    description: event.description,
    duration: (diff / oneHour).toString(),
    location: event.location,
    start: toDatetimeLocalString(event.start),
  };

  formData.value = newEvent;
  formMode.value = 'edit';
};

const deleteEvent = eventId => deleteEventInList(eventId);
</script>


<style scoped>

</style>
