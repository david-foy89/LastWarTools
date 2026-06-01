/**
 * Screenshot / link import (Tesseract) for interactive maps.
 */
(function (global) {
  "use strict";

  function initMapMediaImport() {
// --- Drag-and-drop support for detected tags/numbers ---
let dragState = null;
// Import from link handler
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("importLinkBtn");
  if (btn) {
    btn.onclick = async function () {
      const url = document.getElementById("importLinkInput").value.trim();
      const statusDiv =
        document.getElementById("screenshotOcrStatus") ||
        document.getElementById("importStatus") ||
        btn.parentNode;
      if (!url) {
        statusDiv.textContent = "Please enter a link.";
        return;
      }
      statusDiv.textContent = "Fetching file...";
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Failed to fetch: " + resp.status);
        const contentType = resp.headers.get("content-type") || "";
        if (
          contentType.includes("application/json") ||
          url.match(/\.json($|\?)/i)
        ) {
          const json = await resp.json();
          // Import as JSON plan
          document.getElementById("importText").value = JSON.stringify(
            json,
            null,
            2,
          );
          statusDiv.textContent = "JSON loaded. Click Import to apply.";
        } else if (
          contentType.includes("sheet") ||
          url.match(/\.(xlsx|xls|csv)($|\?)/i)
        ) {
          // Excel file
          const blob = await resp.blob();
          const file = new File([blob], "import.xlsx");
          // Simulate file input for Excel
          const fakeEvent = { target: { files: [file] } };
          handleExcelImport(fakeEvent);
          statusDiv.textContent = "Excel file loaded.";
        } else if (
          contentType.startsWith("image/") ||
          url.match(/\.(png|jpg|jpeg)($|\?)/i)
        ) {
          // Image file
          const blob = await resp.blob();
          const file = new File([blob], "import.png");
          // Simulate file input for screenshot
          const fakeEvent = { target: { files: [file] } };
          handleScreenshotImport(fakeEvent);
          statusDiv.textContent = "Image loaded.";
        } else {
          statusDiv.textContent = "Unsupported file type.";
        }
      } catch (err) {
        statusDiv.textContent = "Import failed: " + err.message;
      }
    };
  }
});
// Excel import handler for Import Plan modal
function handleExcelImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  if (!window.XLSX) {
    alert("Excel library is still loading. Please wait and try again.");
    return;
  }
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      let alliances = [];
      let territories = {};
      if (workbook.SheetNames.includes("Alliances")) {
        const alliancesSheet = XLSX.utils.sheet_to_json(
          workbook.Sheets["Alliances"],
        );
        alliances = alliancesSheet
          .map((row, i) => ({
            tag: String(row.Alliance || "").toUpperCase(),
            color: row.Color || undefined,
          }))
          .filter((a) => a.tag);
      }
      if (workbook.SheetNames.includes("Territories")) {
        const territoriesSheet = XLSX.utils.sheet_to_json(
          workbook.Sheets["Territories"],
        );
        territoriesSheet.forEach((row) => {
          if (row.AreaIndex && row.Alliance) {
            territories[String(row.AreaIndex)] = String(
              row.Alliance,
            ).toUpperCase();
          }
        });
      }
      if (!alliances.length || !Object.keys(territories).length) {
        alert(
          'Excel file must have "Alliances" and "Territories" sheets with proper columns.',
        );
        return;
      }
      state.alliances = alliances;
      state.territories = territories;
      state.selectedAlliance = null;
      state.strategyPins = [];
      state.selectedPinId = null;
      if (typeof syncSharedAllianceTagsFromState === "function")
        syncSharedAllianceTagsFromState();
      if (typeof closeImportModal === "function") closeImportModal();
      if (typeof updateUI === "function") updateUI();
      if (typeof renderMap === "function") renderMap();
      if (
        window.LWStrategyPins &&
        typeof window.LWStrategyPins.updatePinsList === "function"
      ) {
        window.LWStrategyPins.updatePinsList();
      }
      if (typeof saveInteractiveMapTabs === "function") {
        saveInteractiveMapTabs();
      }
    } catch (err) {
      alert("Failed to import Excel: " + err.message);
    }
  };
  reader.readAsArrayBuffer(file);
}
// Screenshot import handler for Import Plan modal (advanced OCR groundwork)
function handleScreenshotImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const statusDiv = document.getElementById("screenshotOcrStatus");
  const canvas = document.getElementById("screenshotPreviewCanvas");
  const enhance = document.getElementById(
    "screenshotPreprocessToggle",
  )?.checked;
  statusDiv.textContent = "Loading image...";
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new window.Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      if (enhance) {
        let imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );
        let d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          let avg = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
          d[i] = d[i + 1] = d[i + 2] = avg;
        }
        let contrast = 1.5;
        let intercept = 128 * (1 - contrast);
        for (let i = 0; i < d.length; i += 4) {
          d[i] = Math.min(255, Math.max(0, contrast * d[i] + intercept));
          d[i + 1] = Math.min(
            255,
            Math.max(0, contrast * d[i + 1] + intercept),
          );
          d[i + 2] = Math.min(
            255,
            Math.max(0, contrast * d[i + 2] + intercept),
          );
        }
        ctx.putImageData(imageData, 0, 0);
      }
      canvas.style.display = "block";
      statusDiv.textContent = "Running OCR (extracting text)...";
      Tesseract.recognize(canvas, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            statusDiv.textContent =
              "OCR: " + Math.round(m.progress * 100) + "%";
          }
        },
      })
        .then(({ data }) => {
          statusDiv.textContent =
            "OCR complete. Attempting to map detected text to map data...";
          ctx.save();
          ctx.strokeStyle = "#00e0ff";
          ctx.lineWidth = 2;
          let detectedNumbers = [];
          let detectedAlliances = [];
          let dragBoxes = [];
          (data.words || []).forEach((word, idx) => {
            if (word.bbox) {
              ctx.strokeRect(
                word.bbox.x0,
                word.bbox.y0,
                word.bbox.x1 - word.bbox.x0,
                word.bbox.y1 - word.bbox.y0,
              );
              dragBoxes.push({
                idx,
                text: word.text,
                bbox: { ...word.bbox },
                type: /^\d{1,3}$/.test(word.text || "")
                  ? "number"
                  : /^[A-Z]{2,5}$/.test(word.text || "")
                    ? "alliance"
                    : "other",
              });
            }
            const w = (word.text || "").trim();
            if (/^\d{1,3}$/.test(w)) {
              detectedNumbers.push({ text: w, bbox: word.bbox });
            } else if (/^[A-Z]{2,5}$/.test(w)) {
              detectedAlliances.push({ text: w, bbox: word.bbox });
            }
          });
          ctx.restore();
          canvas.onmousedown = function (e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            for (let i = 0; i < dragBoxes.length; ++i) {
              const b = dragBoxes[i].bbox;
              if (x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1) {
                dragState = {
                  boxIdx: i,
                  offsetX: x - b.x0,
                  offsetY: y - b.y0,
                };
                return;
              }
            }
            dragState = null;
          };
          canvas.onmousemove = function (e) {
            if (!dragState) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const box = dragBoxes[dragState.boxIdx];
            const w = box.bbox.x1 - box.bbox.x0;
            const h = box.bbox.y1 - box.bbox.y0;
            box.bbox.x0 = x - dragState.offsetX;
            box.bbox.y0 = y - dragState.offsetY;
            box.bbox.x1 = box.bbox.x0 + w;
            box.bbox.y1 = box.bbox.y0 + h;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            ctx.save();
            ctx.strokeStyle = "#00e0ff";
            ctx.lineWidth = 2;
            dragBoxes.forEach((b) => {
              ctx.strokeRect(
                b.bbox.x0,
                b.bbox.y0,
                b.bbox.x1 - b.bbox.x0,
                b.bbox.y1 - b.bbox.y0,
              );
            });
            ctx.restore();
          };
          canvas.onmouseup = function (e) {
            dragState = null;
          };
          canvas.onmouseleave = function (e) {
            dragState = null;
          };
          detectedNumbers = dragBoxes.filter((b) => b.type === "number");
          detectedAlliances = dragBoxes.filter(
            (b) => b.type === "alliance",
          );
          let mappingSummary = "";
          if (detectedNumbers.length) {
            mappingSummary +=
              "Detected territory numbers: " +
              detectedNumbers.map((n) => n.text).join(", ") +
              "\n";
          }
          if (detectedAlliances.length) {
            mappingSummary +=
              "Detected alliance tags: " +
              detectedAlliances.map((a) => a.text).join(", ") +
              "\n";
          }
          let autoMappings = [];
          detectedNumbers.forEach((num) => {
            let minDist = Infinity,
              closest = null;
            detectedAlliances.forEach((a) => {
              const dx =
                (num.bbox.x0 + num.bbox.x1) / 2 -
                (a.bbox.x0 + a.bbox.x1) / 2;
              const dy =
                (num.bbox.y0 + num.bbox.y1) / 2 -
                (a.bbox.y0 + a.bbox.y1) / 2;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < minDist) {
                minDist = dist;
                closest = a;
              }
            });
            if (closest && minDist < 100) {
              autoMappings.push({
                area: num.text,
                alliance: closest.text,
              });
            }
          });
          window._lastScreenshotAutoMappings = autoMappings;
          const prevTable =
            statusDiv.parentNode.querySelector("#mappingsEditTable");
          if (prevTable) prevTable.remove();
          const prevBtn = statusDiv.parentNode.querySelector(
            "#applyScreenshotMappingsBtn",
          );
          if (prevBtn) prevBtn.remove();
          if (autoMappings.length) {
            const table = document.createElement("table");
            table.id = "mappingsEditTable";
            table.style.background = "#181c24";
            table.style.color = "#b0e0ff";
            table.style.marginTop = "8px";
            table.style.borderCollapse = "collapse";
            table.style.width = "100%";
            table.innerHTML =
              '<tr><th style="border-bottom:1px solid #00e0ff;padding:4px 8px;">Territory</th><th style="border-bottom:1px solid #00e0ff;padding:4px 8px;">Alliance</th></tr>';
            autoMappings.forEach((m, i) => {
              const row = document.createElement("tr");
              row.innerHTML = `<td style="padding:4px 8px;"><input type="text" value="${m.area}" style="width:60px;background:#222;color:#b0e0ff;border:1px solid #333;padding:2px 4px;"></td><td style="padding:4px 8px;"><input type="text" value="${m.alliance}" style="width:80px;background:#222;color:#b0e0ff;border:1px solid #333;padding:2px 4px;"></td>`;
              table.appendChild(row);
            });
            statusDiv.parentNode.appendChild(table);
            const btn = document.createElement("button");
            btn.id = "applyScreenshotMappingsBtn";
            btn.textContent = "Apply Mappings to Map";
            btn.style.marginTop = "8px";
            btn.style.background = "#1e2a38";
            btn.style.color = "#b0e0ff";
            btn.style.border = "1px solid #00e0ff";
            btn.style.padding = "6px 14px";
            btn.style.borderRadius = "5px";
            btn.style.cursor = "pointer";
            btn.onclick = function () {
              const rows = table.querySelectorAll("tr");
              let applied = 0;
              for (let i = 1; i < rows.length; ++i) {
                const tInput = rows[i].children[0].querySelector("input");
                const aInput = rows[i].children[1].querySelector("input");
                const terr = tInput.value.trim();
                const alli = aInput.value.trim().toUpperCase();
                if (terr && alli) {
                  state.territories[terr] = alli;
                  applied++;
                }
              }
              if (typeof updateUI === "function") updateUI();
              if (typeof renderMap === "function") renderMap();
              statusDiv.textContent =
                applied + " mappings applied to map!";
              table.remove();
              btn.remove();
            };
            statusDiv.parentNode.appendChild(btn);
          } else {
            const pre = document.createElement("pre");
            pre.textContent =
              mappingSummary ||
              "No territory numbers or alliance tags detected.";
            pre.style.background = "#181c24";
            pre.style.color = "#b0e0ff";
            pre.style.padding = "6px";
            pre.style.marginTop = "6px";
            pre.style.maxHeight = "120px";
            pre.style.overflowY = "auto";
            const prev = statusDiv.parentNode.querySelector("pre");
            if (prev) prev.remove();
            statusDiv.parentNode.appendChild(pre);
          }
        })
        .catch((err) => {
          statusDiv.textContent = "OCR failed: " + err.message;
        });
    };
    img.onerror = function () {
      statusDiv.textContent = "Failed to load image.";
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
  }

  global.initMapMediaImport = initMapMediaImport;
})(typeof window !== "undefined" ? window : globalThis);
