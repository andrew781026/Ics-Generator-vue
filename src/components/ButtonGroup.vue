<template>
    
    <div class="mt-3 d-flex gap-2 flex-wrap">
        <button class="btn btn-success" @click="generateICS()">
          📥 下載 .ics
        </button>
        <!-- 隱藏的檔案上傳欄位 -->
        <input
          type="file"
          accept=".ics"
          id="icsFileInput"
          class="d-none"
          @change="importICS($event)"
        />
        <button
          class="btn btn-warning"
          @click="targgerFileUpload('#icsFileInput')"
        >
          📤 從 .ics 匯回資料
        </button>
        <a
          class="btn btn-info"
          href="https://calendar.google.com/calendar/u/0/r/settings/export"
          target="_blank"
        >
          🗓️ 到 Google 日曆匯入
        </a>
      </div>
</template>

<script setup>


function parseICSDate(icsDateStr) {
        if (!icsDateStr) return "";
        // 支援格式：20250701T080000Z 或 20250701T080000
        const str = icsDateStr.replace("Z", "");
        const yyyy = str.slice(0, 4);
        const mm = str.slice(4, 6);
        const dd = str.slice(6, 8);
        const hh = str.slice(9, 11);
        const mi = str.slice(11, 13);
        const date = new Date(`${yyyy}-${mm}-${dd}T${hh}:${mi}Z`);
        return date.toLocaleString();
      }

      
      function parseICS(content) {
        const lines = content.split(/\r?\n/);
        const events = [];
        let currentEvent = null;

        lines.forEach((line) => {
          if (line.startsWith("BEGIN:VEVENT")) {
            currentEvent = {};
          } else if (line.startsWith("END:VEVENT")) {
            if (currentEvent) events.push(currentEvent);
            currentEvent = null;
          } else if (currentEvent) {
            if (line.startsWith("SUMMARY:")) {
              currentEvent.summary = line.replace("SUMMARY:", "").trim();
            } else if (line.startsWith("DESCRIPTION:")) {
              currentEvent.description = line
                .replace("DESCRIPTION:", "")
                .trim();
            } else if (line.startsWith("LOCATION:")) {
              const location = line.replace("LOCATION:", "").trim();
              currentEvent.location =
                location === "undefined" ? "N/A" : location;
            } else if (line.startsWith("DTSTART")) {
              currentEvent.start = parseICSDate(line.split(":")[1].trim());
            } else if (line.startsWith("DTEND")) {
              currentEvent.end = parseICSDate(line.split(":")[1].trim());
            }
          }
        });

        return events;
      }

    function importICS(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
          const content = e.target.result;
          const events = parseICS(content);

          events.forEach((e) => {
            eventList.push(e);
            appendToTable(e, eventList.length);
          });
        };
        reader.readAsText(file);
      }



</script>