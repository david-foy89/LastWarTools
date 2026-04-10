/**
 * Last War Tools — shared month/day calendar popover + MM/DD display.
 * - Add class lwst-cal-auto to input[type=date] to replace with LWST picker (keeps .value for existing code).
 * - Or call LwstCalendar.openAtAnchor(anchorEl, { getValue, setValue, afterPick }).
 */
(function () {
  var calViewYear = new Date().getFullYear();
  var calViewMonth = new Date().getMonth();
  /** @type {{ getValue: () => string, setValue: (iso: string) => void, afterPick?: () => void } | null} */
  var activeCtx = null;
  var popoverEl = null;
  var docListenersAttached = false;

  function normalizeCalendarDate(raw) {
    if (raw == null || raw === "") return "";
    var s = String(raw).trim();
    var ymd = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (ymd) {
      var y = Number(ymd[1]);
      var mo = Number(ymd[2]);
      var da = Number(ymd[3]);
      var dt = new Date(y, mo - 1, da);
      if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== da) {
        return "";
      }
      return ymd[1] + "-" + ymd[2].padStart(2, "0") + "-" + ymd[3].padStart(2, "0");
    }
    var md = s.match(/^(\d{1,2})-(\d{1,2})$/);
    if (md) {
      var y2 = new Date().getFullYear();
      var mo2 = Number(md[1]);
      var da2 = Number(md[2]);
      var dt2 = new Date(y2, mo2 - 1, da2);
      if (dt2.getFullYear() !== y2 || dt2.getMonth() !== mo2 - 1 || dt2.getDate() !== da2) {
        return "";
      }
      return String(y2) + "-" + md[1].padStart(2, "0") + "-" + md[2].padStart(2, "0");
    }
    return "";
  }

  function formatDateMdDisplay(iso) {
    if (!iso) return "—";
    var n = normalizeCalendarDate(iso);
    if (!n) return "—";
    var p = n.split("-");
    return p[1].padStart(2, "0") + "/" + p[2].padStart(2, "0");
  }

  function monthLongName(m0) {
    return new Date(2020, m0, 1).toLocaleDateString(undefined, { month: "long" });
  }

  function ensurePopover() {
    if (popoverEl) return popoverEl;
    var existing = document.getElementById("lwstCalPopover");
    if (existing) {
      popoverEl = existing;
      wirePopoverControls();
      return popoverEl;
    }
    var el = document.createElement("div");
    el.id = "lwstCalPopover";
    el.className = "lwst-cal-popover";
    el.setAttribute("hidden", "");
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Choose month and day");
    el.innerHTML =
      '<div class="lwst-cal-pop-nav">' +
      '<button type="button" class="lwst-cal-nav-btn" id="lwstCalPrevM" aria-label="Previous month">«</button>' +
      '<span class="lwst-cal-month-title" id="lwstCalMonthTitle"></span>' +
      '<button type="button" class="lwst-cal-nav-btn" id="lwstCalNextM" aria-label="Next month">»</button>' +
      "</div>" +
      '<div class="lwst-cal-week-row" aria-hidden="true">' +
      "<span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>" +
      "</div>" +
      '<div class="lwst-cal-grid" id="lwstCalGrid"></div>';
    document.body.appendChild(el);
    popoverEl = el;
    wirePopoverControls();
    return popoverEl;
  }

  function wirePopoverControls() {
    var prev = document.getElementById("lwstCalPrevM");
    var next = document.getElementById("lwstCalNextM");
    if (!prev || prev.dataset.lwstWired) return;
    prev.dataset.lwstWired = "1";
    next.dataset.lwstWired = "1";
    prev.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!activeCtx) return;
      calViewMonth -= 1;
      if (calViewMonth < 0) {
        calViewMonth = 11;
        calViewYear -= 1;
      }
      renderCalGrid();
    });
    next.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!activeCtx) return;
      calViewMonth += 1;
      if (calViewMonth > 11) {
        calViewMonth = 0;
        calViewYear += 1;
      }
      renderCalGrid();
    });
  }

  function renderCalGrid() {
    if (!activeCtx) return;
    var titleEl = document.getElementById("lwstCalMonthTitle");
    var grid = document.getElementById("lwstCalGrid");
    if (!titleEl || !grid) return;
    titleEl.textContent = monthLongName(calViewMonth);
    grid.innerHTML = "";
    var y = calViewYear;
    var m = calViewMonth;
    var firstDow = new Date(y, m, 1).getDay();
    var dim = new Date(y, m + 1, 0).getDate();
    var i;
    for (i = 0; i < firstDow; i++) {
      var cell = document.createElement("div");
      cell.className = "lwst-cal-cell--pad";
      grid.appendChild(cell);
    }
    var selectedIso = normalizeCalendarDate(activeCtx.getValue());
    for (var day = 1; day <= dim; day++) {
      (function (dayNum) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "lwst-cal-day";
        btn.textContent = String(dayNum);
        var iso =
          y +
          "-" +
          String(m + 1).padStart(2, "0") +
          "-" +
          String(dayNum).padStart(2, "0");
        if (selectedIso && selectedIso === iso) {
          btn.classList.add("lwst-cal-day--selected");
        }
        btn.addEventListener("click", function (ev) {
          ev.stopPropagation();
          var v = normalizeCalendarDate(iso);
          if (v && activeCtx) {
            activeCtx.setValue(v);
            if (typeof activeCtx.afterPick === "function") {
              activeCtx.afterPick();
            }
          }
          close();
        });
        grid.appendChild(btn);
      })(day);
    }
  }

  function close() {
    var pop = ensurePopover();
    pop.hidden = true;
    activeCtx = null;
  }

  function positionPopover(anchorEl) {
    var pop = ensurePopover();
    var r = anchorEl.getBoundingClientRect();
    var popH = 260;
    var top = r.bottom + 6;
    if (top + popH > window.innerHeight - 8) {
      top = Math.max(8, r.top - popH - 6);
    }
    pop.style.left = Math.max(8, Math.min(r.left, window.innerWidth - 228)) + "px";
    pop.style.top = top + "px";
  }

  /**
   * @param {HTMLElement} anchorEl
   * @param {{ getValue: () => string, setValue: (iso: string) => void, afterPick?: () => void }} ctx
   */
  function openPopoverAtAnchor(anchorEl, ctx) {
    attachDocListenersOnce();
    ensurePopover();
    activeCtx = ctx;
    var iso = ctx.getValue();
    var n = iso ? normalizeCalendarDate(iso) : "";
    if (n) {
      var p = n.split("-");
      calViewYear = Number(p[0]);
      calViewMonth = Number(p[1]) - 1;
    } else {
      var t = new Date();
      calViewYear = t.getFullYear();
      calViewMonth = t.getMonth();
    }
    var pop = ensurePopover();
    positionPopover(anchorEl);
    pop.hidden = false;
    renderCalGrid();
  }

  function bindDateInput(input) {
    if (!input || input.tagName !== "INPUT" || input.type !== "date") return;
    if (input.dataset.lwstCalBound === "1") return;
    input.dataset.lwstCalBound = "1";
    ensurePopover();

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lwst-cal-trigger";
    btn.setAttribute(
      "aria-label",
      input.getAttribute("aria-label") || input.id || "Choose date"
    );
    btn.textContent = formatDateMdDisplay(input.value);

    input.classList.add("lwst-cal-input-hidden");
    input.parentNode.insertBefore(btn, input.nextSibling);

    function syncButton() {
      btn.textContent = formatDateMdDisplay(input.value);
    }

    input.addEventListener("change", syncButton);
    input.addEventListener("input", syncButton);

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      openPopoverAtAnchor(btn, {
        getValue: function () {
          return input.value;
        },
        setValue: function (iso) {
          input.value = iso;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        },
        afterPick: syncButton,
      });
    });
  }

  function attachDocListenersOnce() {
    if (docListenersAttached) return;
    docListenersAttached = true;
    document.addEventListener("mousedown", function (e) {
      var pop = document.getElementById("lwstCalPopover");
      if (!pop || pop.hidden) return;
      if (pop.contains(e.target)) return;
      if (e.target.closest && e.target.closest(".lwst-cal-trigger")) return;
      close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  window.LwstCalendar = {
    normalizeCalendarDate: normalizeCalendarDate,
    formatDateMdDisplay: formatDateMdDisplay,
    openAtAnchor: openPopoverAtAnchor,
    close: close,
    bindDateInput: bindDateInput,
    initAuto: function () {
      attachDocListenersOnce();
      ensurePopover();
      document.querySelectorAll('input[type="date"].lwst-cal-auto').forEach(bindDateInput);
    },
  };
})();
