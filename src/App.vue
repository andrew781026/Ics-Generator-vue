<script setup>
import ButtonGroup from "./components/ButtonGroup.vue";
</script>

<template>

    <div class="container">
      <h2 class="mb-4">📅 活動產生器</h2>

      <div id="formContainer" class="card mb-4">
        <div class="card-body">
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <label class="form-label">活動標題</label>
              <input
                type="text"
                class="form-control"
                id="summary"
                placeholder="例如：團隊會議"
              />
            </div>
            <div class="col-md-6">
              <label class="form-label">活動地點</label>
              <input
                type="text"
                class="form-control"
                id="location"
                placeholder="例如：Zoom / 會議室 A"
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">活動說明</label>
            <textarea
              class="form-control"
              id="description"
              rows="2"
              placeholder="討論內容..."
            ></textarea>
          </div>
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">開始時間</label>
              <input type="datetime-local" class="form-control" id="start" />
            </div>
            <div class="col-md-6">
              <label class="form-label">會議時長（小時）</label>
              <select class="form-select" id="duration">
                <option value="0.5">0.5 小時</option>
                <option value="1" selected>1 小時</option>
                <option value="1.5">1.5 小時</option>
                <option value="2">2 小時</option>
                <option value="3">3 小時</option>
              </select>
            </div>
          </div>
          <div class="mt-4 d-flex justify-content-end">
            <button class="btn btn-outline-primary" onclick="addEvent()">
              ➕ 新增活動
            </button>
          </div>
        </div>
      </div>

      <h4>🗂 活動清單</h4>
      <table class="table table-striped table-bordered" id="eventsTable">
        <thead>
          <tr>
            <th>#</th>
            <th>標題</th>
            <th>說明</th>
            <th>地點</th>
            <th>開始</th>
            <th>結束</th>
            <th>動作</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <ButtonGroup />
    </div>

  
</template>

<style scoped>

</style>
