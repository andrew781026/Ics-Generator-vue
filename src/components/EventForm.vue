<template>
  <div id="formContainer" class="card mb-4">
    <div class="card-body">
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <label class="form-label">活動標題</label>
          <input
              v-model="formData.summary"
              type="text"
              class="form-control"
              placeholder="例如：團隊會議"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">活動地點</label>
          <input
              v-model="formData.location"
              type="text"
              class="form-control"
              placeholder="例如：Zoom / 會議室 A"
          />
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">活動說明</label>
        <textarea
            v-model="formData.description"
            class="form-control"
            rows="2"
            placeholder="討論內容..."
        />
      </div>
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">開始時間</label>
          <input v-model="formData.start" type="datetime-local" class="form-control"/>
        </div>
        <div class="col-md-6">
          <label class="form-label">會議時長（小時）</label>
          <select class="form-select" v-model="formData.duration">
            <option value="0.5">0.5 小時</option>
            <option value="1" selected>1 小時</option>
            <option value="1.5">1.5 小時</option>
            <option value="2">2 小時</option>
            <option value="3">3 小時</option>
          </select>
        </div>
      </div>
      <div class="mt-4 d-flex justify-content-end">
        <button v-if="formMode === 'add'" class="btn btn-outline-primary" @click="addEvent()">
          ➕ 新增活動
        </button>
        <button v-if="formMode === 'edit'" class="btn btn-warning" @click="saveEdit()">
          💾 儲存修改
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {formMode, formData} from "../composables/useFormData.js";
import {addEventToList, updateEventInList} from "../composables/useEventList.js";
import {_uuid} from "../utils/uuidv4.js";

const oneHour = 60 * 60 * 1000;

const addEvent = () => {
  const summary = formData.value.summary;
  const description = formData.value.description;
  const location = formData.value.location;
  const startStr = formData.value.start;
  const durationHours = parseFloat(formData.value.duration);

  if (!summary || !startStr || isNaN(durationHours)) {
    alert("請填寫活動標題、開始時間與時長");
    return;
  }

  const startDate = new Date(startStr);
  const endDate = new Date(startDate.getTime() + durationHours * oneHour);

  const newEvent = {
    id: _uuid(),
    summary,
    description,
    location,
    start: startDate,
    end: endDate,
  };

  addEventToList(newEvent);
  formData.value = {};
}

const saveEdit = () => {
  const summary = formData.value.summary;
  const description = formData.value.description;
  const location = formData.value.location;
  const startStr = formData.value.start;
  const durationHours = parseFloat(formData.value.duration);

  if (!summary || !startStr || isNaN(durationHours)) {
    alert("請填寫活動標題、開始時間與時長");
    return;
  }

  const startDate = new Date(startStr);
  const endDate = new Date(startDate.getTime() + durationHours * oneHour);

  const event = {
    id: formData.value.id || _uuid(),
    summary,
    description,
    location,
    start: startDate,
    end: endDate,
  };

  updateEventInList(formData.value.id, event);
  formData.value = {};
  formMode.value = 'add';
}
</script>

<style scoped>

</style>
