/**
 * Alliance Hive Builder — member roster, import, drag-to-place (Phase 1).
 * Requires window.__hiveBuilder from alliance-hive.html.
 */
(function () {
  var RANK_ORDER = ["r5", "r4", "r3", "r2", "r1"];
  var RANK_LABEL = { r5: "R5", r4: "R4", r3: "R3", r2: "R2", r1: "R1" };
  var MAX_MEMBERS = 200;
  var api = null;
  var memberDrag = null;

  function $(id) {
    return document.getElementById(id);
  }

  function normalizeName(value) {
    return String(value == null ? "" : value)
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseRankToken(token) {
    var m = String(token || "").match(/^R([1-5])$/i);
    return m ? "r" + m[1] : "";
  }

  function parseMemberLine(line) {
    var raw = normalizeName(line);
    if (!raw) return null;
    var rank = "";
    var name = raw;

    var tabParts = raw.split(/\t+/);
    if (tabParts.length >= 2) {
      rank = parseRankToken(tabParts[0]) || parseRankToken(tabParts[1]);
      name = normalizeName(
        parseRankToken(tabParts[0]) ? tabParts.slice(1).join(" ") : tabParts[0]
      );
      if (!name && tabParts[1]) name = normalizeName(tabParts[1]);
    }

    if (!rank) {
      var lead = raw.match(/^(R[1-5])\s+(.+)$/i);
      if (lead) {
        rank = parseRankToken(lead[1]);
        name = normalizeName(lead[2]);
      }
    }
    if (!rank) {
      var trail = raw.match(/^(.+?)\s+(R[1-5])$/i);
      if (trail) {
        name = normalizeName(trail[1]);
        rank = parseRankToken(trail[2]);
      }
    }
    if (!rank) {
      var colon = raw.match(/^(R[1-5])\s*:\s*(.+)$/i);
      if (colon) {
        rank = parseRankToken(colon[1]);
        name = normalizeName(colon[2]);
      }
    }

    name = normalizeName(name);
    if (!name) return null;
    return { name: name, rank: rank || "r1" };
  }

  function parseMemberText(text) {
    var lines = String(text || "").split(/\r?\n/);
    var out = [];
    var seen = {};
    var i;
    for (i = 0; i < lines.length; i++) {
      var parsed = parseMemberLine(lines[i]);
      if (!parsed) continue;
      var key = parsed.name.toLowerCase();
      if (seen[key]) continue;
      seen[key] = true;
      out.push(parsed);
    }
    return out;
  }

  function newMemberId() {
    return "m_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  function ensureMembersHaveIds(list) {
    return (list || []).map(function (m) {
      return {
        id: typeof m.id === "string" && m.id ? m.id : newMemberId(),
        name: normalizeName(m.name),
        rank: parseRankToken(m.rank) || m.rank || "r1",
      };
    }).filter(function (m) {
      return m.name;
    });
  }

  function mergeImportedMembers(existing, imported) {
    var merged = ensureMembersHaveIds(existing).slice();
    var seen = {};
    merged.forEach(function (m) {
      seen[m.name.toLowerCase()] = true;
    });
    var added = 0;
    imported.forEach(function (row) {
      if (merged.length >= MAX_MEMBERS) return;
      var key = row.name.toLowerCase();
      if (seen[key]) return;
      seen[key] = true;
      merged.push({
        id: newMemberId(),
        name: row.name,
        rank: row.rank || "r1",
      });
      added++;
    });
    return { members: merged, added: added };
  }

  function rankClass(rank) {
    return "hive-member-rank hive-member-rank--" + String(rank || "r1").toLowerCase();
  }

  function renderMemberList() {
    if (!api) return;
    var listEl = $("hiveMembersList");
    var countEl = $("hiveMembersCount");
    var unplacedEl = $("hiveUnplacedCount");
    if (!listEl) return;

    var members = ensureMembersHaveIds(api.getMembers());
    var placed = api.getPlacedMemberIds();
    var unplaced = 0;
    var html = "";
    var sorted = members.slice().sort(function (a, b) {
      var ra = RANK_ORDER.indexOf(a.rank);
      var rb = RANK_ORDER.indexOf(b.rank);
      if (ra !== rb) return ra - rb;
      return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });

    sorted.forEach(function (m) {
      var isPlaced = placed.has(m.id);
      if (!isPlaced) unplaced++;
      html +=
        '<div class="hive-member-item' +
        (isPlaced ? " hive-member-item--placed" : " hive-member-item--unplaced") +
        '" draggable="true" data-member-id="' +
        escapeAttr(m.id) +
        '">' +
        '<span class="' +
        rankClass(m.rank) +
        '">' +
        escapeHtml(RANK_LABEL[m.rank] || "R1") +
        "</span>" +
        '<span class="hive-member-name" title="' +
        escapeAttr(m.name) +
        '">' +
        escapeHtml(m.name) +
        "</span>" +
        '<button type="button" class="hive-member-remove" data-remove-member="' +
        escapeAttr(m.id) +
        '" title="Remove member" aria-label="Remove ' +
        escapeAttr(m.name) +
        '">&times;</button>' +
        "</div>";
    });

    if (!sorted.length) {
      html = '<p class="hive-members-empty">Import or paste alliance members to begin.</p>';
    }
    listEl.innerHTML = html;
    if (countEl) {
      countEl.textContent = members.length + " member" + (members.length === 1 ? "" : "s");
    }
    if (unplacedEl) {
      unplacedEl.textContent =
        unplaced === 0 && members.length
          ? "All placed"
          : unplaced + " unplaced";
      unplacedEl.classList.toggle("hive-unplaced-count--warn", unplaced > 0);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(s);
  }

  function setStatus(msg, isError) {
    var el = $("hiveMembersStatus");
    if (!el) return;
    el.textContent = msg || "";
    el.classList.toggle("hive-members-status--error", !!isError);
  }

  function applyMembers(members) {
    if (!api) return;
    api.setMembers(ensureMembersHaveIds(members));
    renderMemberList();
    api.persist();
  }

  function importFromTextarea() {
    var ta = $("hiveMembersPaste");
    if (!ta) return;
    var parsed = parseMemberText(ta.value);
    if (!parsed.length) {
      setStatus("No members found. Use one name per line, optionally with R1–R5.", true);
      return;
    }
    var result = mergeImportedMembers(api.getMembers(), parsed);
    applyMembers(result.members);
    setStatus("Added " + result.added + " member(s).");
    ta.value = "";
  }

  function parseSheetRows(rows) {
    var out = [];
    var r;
    for (r = 0; r < rows.length; r++) {
      var row = rows[r];
      if (!row || !row.length) continue;
      var a = normalizeName(row[0]);
      var b = row.length > 1 ? normalizeName(row[1]) : "";
      if (!a && !b) continue;
      if (parseRankToken(a) && b) {
        out.push({ name: b, rank: parseRankToken(a) });
      } else if (parseRankToken(b) && a) {
        out.push({ name: a, rank: parseRankToken(b) });
      } else {
        var parsed = parseMemberLine(a || b);
        if (parsed) out.push(parsed);
      }
    }
    return out.filter(Boolean);
  }

  function importFromFile(file) {
    if (!file || !api) return;
    var name = file.name || "";
    var lower = name.toLowerCase();

    function finish(rows) {
      var parsed = [];
      rows.forEach(function (row) {
        if (row) parsed.push(row);
      });
      if (!parsed.length) {
        setStatus("No members found in file.", true);
        return;
      }
      var result = mergeImportedMembers(api.getMembers(), parsed);
      applyMembers(result.members);
      setStatus("Imported " + result.added + " member(s) from " + name + ".");
    }

    if (lower.endsWith(".csv") || lower.endsWith(".txt")) {
      var reader = new FileReader();
      reader.onload = function () {
        finish(parseMemberText(String(reader.result || "")));
      };
      reader.readAsText(file);
      return;
    }

    if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) {
      var XLSX = window.XLSX;
      if (!XLSX) {
        setStatus("Spreadsheet library not loaded.", true);
        return;
      }
      var readerX = new FileReader();
      readerX.onload = function () {
        try {
          var wb = XLSX.read(readerX.result, { type: "array" });
          var sheet = wb.Sheets[wb.SheetNames[0]];
          var rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
          finish(parseSheetRows(rows));
        } catch (err) {
          setStatus("Could not read spreadsheet.", true);
        }
      };
      readerX.readAsArrayBuffer(file);
      return;
    }

    setStatus("Unsupported file type. Use .txt, .csv, or .xlsx.", true);
  }

  function removeMember(memberId) {
    if (!api || !memberId) return;
    var members = ensureMembersHaveIds(api.getMembers()).filter(function (m) {
      return m.id !== memberId;
    });
    api.removeMemberFromMap(memberId);
    applyMembers(members);
    setStatus("Member removed.");
  }

  function bindMemberDrag() {
    var listEl = $("hiveMembersList");
    var canvas = api && api.canvas;
    if (!listEl || !canvas) return;

    listEl.addEventListener("dragstart", function (ev) {
      var item = ev.target.closest("[data-member-id]");
      if (!item) return;
      var id = item.getAttribute("data-member-id");
      if (!id) return;
      memberDrag = { memberId: id };
      ev.dataTransfer.setData("text/plain", id);
      ev.dataTransfer.effectAllowed = "move";
      item.classList.add("hive-member-item--dragging");
    });

    listEl.addEventListener("dragend", function () {
      memberDrag = null;
      listEl.querySelectorAll(".hive-member-item--dragging").forEach(function (el) {
        el.classList.remove("hive-member-item--dragging");
      });
    });

    canvas.addEventListener("dragover", function (ev) {
      if (!memberDrag) return;
      ev.preventDefault();
      ev.dataTransfer.dropEffect = "move";
    });

    canvas.addEventListener("drop", function (ev) {
      if (!memberDrag || !api) return;
      ev.preventDefault();
      var cell = api.eventToCell(ev);
      if (!cell) return;
      var members = ensureMembersHaveIds(api.getMembers());
      var member = members.find(function (m) {
        return m.id === memberDrag.memberId;
      });
      memberDrag = null;
      if (!member) return;
      if (api.placeMember(member, cell)) {
        renderMemberList();
        api.persist();
        setStatus("Placed " + member.name + ".");
      } else {
        setStatus("Could not place " + member.name + " there.", true);
      }
    });

    // Pointer-based drag for touch (HTML5 drag is flaky on mobile)
    listEl.addEventListener("pointerdown", function (ev) {
      var item = ev.target.closest("[data-member-id]");
      if (!item || ev.target.closest("[data-remove-member]")) return;
      var id = item.getAttribute("data-member-id");
      if (!id) return;
      memberDrag = {
        memberId: id,
        pointerId: ev.pointerId,
        startX: ev.clientX,
        startY: ev.clientY,
        active: false,
      };
      try {
        item.setPointerCapture(ev.pointerId);
      } catch (_) {
        /* ignore */
      }
    });

    listEl.addEventListener("pointermove", function (ev) {
      if (!memberDrag || ev.pointerId !== memberDrag.pointerId) return;
      if (!memberDrag.active && Math.hypot(ev.clientX - memberDrag.startX, ev.clientY - memberDrag.startY) > 8) {
        memberDrag.active = true;
      }
    });

    function finishPointerDrop(ev) {
      if (!memberDrag || ev.pointerId !== memberDrag.pointerId) return;
      var id = memberDrag.memberId;
      var wasActive = memberDrag.active;
      memberDrag = null;
      if (!wasActive || !api) return;
      var cell = api.eventToCell(ev);
      if (!cell) return;
      var members = ensureMembersHaveIds(api.getMembers());
      var member = members.find(function (m) {
        return m.id === id;
      });
      if (!member) return;
      if (api.placeMember(member, cell)) {
        renderMemberList();
        api.persist();
        setStatus("Placed " + member.name + ".");
      }
    }

    listEl.addEventListener("pointerup", finishPointerDrop);
    listEl.addEventListener("pointercancel", function (ev) {
      if (memberDrag && ev.pointerId === memberDrag.pointerId) memberDrag = null;
    });

    document.addEventListener(
      "pointerup",
      function (ev) {
        if (!memberDrag || ev.pointerId !== memberDrag.pointerId || !memberDrag.active) return;
        if (ev.target === canvas || canvas.contains(ev.target)) {
          finishPointerDrop(ev);
        } else {
          memberDrag = null;
        }
      },
      true
    );
  }

  function bindSettings() {
    var gapEl = $("hiveBaseGap");
    var hubEl = $("hiveHubSelect");
    var eliteEl = $("hiveElitePlacement");
    var r4El = $("hiveGenR4");
    var r3El = $("hiveGenR3");
    var r2El = $("hiveGenR2");
    var r1El = $("hiveGenR1");
    var totalEl = $("hiveGenTotal");

    function clampInt(el, min, max, fallback) {
      if (!el) return fallback;
      var n = parseInt(el.value, 10);
      if (!Number.isFinite(n)) return fallback;
      return Math.max(min, Math.min(max, n));
    }

    function normalizeCounts(r4, r3, r2, r1) {
      r4 = Math.max(0, Math.min(10, r4 | 0));
      r3 = Math.max(0, Math.min(99, r3 | 0));
      r2 = Math.max(0, Math.min(99, r2 | 0));
      r1 = Math.max(0, Math.min(99, r1 | 0));
      var overflow = 1 + r4 + r3 + r2 + r1 - 100;
      if (overflow > 0) {
        var cut = Math.min(r1, overflow);
        r1 -= cut;
        overflow -= cut;
      }
      if (overflow > 0) {
        var cut2 = Math.min(r2, overflow);
        r2 -= cut2;
        overflow -= cut2;
      }
      if (overflow > 0) {
        var cut3 = Math.min(r3, overflow);
        r3 -= cut3;
        overflow -= cut3;
      }
      if (overflow > 0) r4 = Math.max(0, r4 - overflow);
      return { r5Count: 1, r4Count: r4, r3Count: r3, r2Count: r2, r1Count: r1 };
    }

    function updateTotalLabel(ranks) {
      if (!totalEl) return;
      var total =
        ranks.r5Count + ranks.r4Count + ranks.r3Count + ranks.r2Count + ranks.r1Count;
      totalEl.textContent = "Total: " + total + " / 100";
      totalEl.classList.toggle("hive-rank-counts__total--over", total > 100);
    }

    function readSettingsFromUi() {
      if (!api) return;
      var s = api.getSettings();
      if (gapEl) {
        var g = parseInt(gapEl.value, 10);
        s.baseGap = Number.isFinite(g) ? Math.max(0, Math.min(10, g)) : 1;
      }
      if (hubEl) {
        s.hubPreference = hubEl.value || "auto";
      }
      if (eliteEl) {
        s.elitePlacement = eliteEl.value === "outside" ? "outside" : "inside";
      }
      var ranks = normalizeCounts(
        clampInt(r4El, 0, 10, 10),
        clampInt(r3El, 0, 99, 20),
        clampInt(r2El, 0, 99, 30),
        clampInt(r1El, 0, 99, 39)
      );
      s.r5Count = ranks.r5Count;
      s.r4Count = ranks.r4Count;
      s.r3Count = ranks.r3Count;
      s.r2Count = ranks.r2Count;
      s.r1Count = ranks.r1Count;
      if (r4El) r4El.value = String(s.r4Count);
      if (r3El) r3El.value = String(s.r3Count);
      if (r2El) r2El.value = String(s.r2Count);
      if (r1El) r1El.value = String(s.r1Count);
      updateTotalLabel(ranks);
      api.setSettings(s);
      api.persist();
    }

    [gapEl, hubEl, eliteEl, r4El, r3El, r2El, r1El].forEach(function (el) {
      if (!el) return;
      el.addEventListener("change", readSettingsFromUi);
      if (el.tagName === "INPUT") el.addEventListener("input", readSettingsFromUi);
    });
  }

  function syncHubSelectOptions(hubs) {
    var hubEl = $("hiveHubSelect");
    if (!hubEl) return;
    var present = { ae: false, furnace: false, acenter: false };
    (hubs || []).forEach(function (h) {
      if (h && h.type) present[h.type] = true;
    });
    var opts = hubEl.options;
    var i;
    for (i = 0; i < opts.length; i++) {
      var val = opts[i].value;
      if (val === "auto") {
        opts[i].disabled = false;
        continue;
      }
      opts[i].disabled = !present[val];
    }
    if (hubEl.value !== "auto" && hubEl.selectedOptions[0] && hubEl.selectedOptions[0].disabled) {
      hubEl.value = "auto";
      if (api) {
        var s = api.getSettings();
        s.hubPreference = "auto";
        api.setSettings(s);
        api.persist();
      }
    }
  }

  function syncSettingsToUi() {
    if (!api) return;
    var s = api.getSettings();
    var gapEl = $("hiveBaseGap");
    var hubEl = $("hiveHubSelect");
    var eliteEl = $("hiveElitePlacement");
    var r5El = $("hiveGenR5");
    var r4El = $("hiveGenR4");
    var r3El = $("hiveGenR3");
    var r2El = $("hiveGenR2");
    var r1El = $("hiveGenR1");
    var totalEl = $("hiveGenTotal");
    if (gapEl && s.baseGap != null) gapEl.value = String(s.baseGap);
    if (hubEl && s.hubPreference) hubEl.value = s.hubPreference;
    if (eliteEl) {
      eliteEl.value = s.elitePlacement === "outside" ? "outside" : "inside";
    }
    if (r5El) r5El.value = "1";
    if (r4El && s.r4Count != null) r4El.value = String(s.r4Count);
    if (r3El && s.r3Count != null) r3El.value = String(s.r3Count);
    if (r2El && s.r2Count != null) r2El.value = String(s.r2Count);
    if (r1El && s.r1Count != null) r1El.value = String(s.r1Count);
    if (totalEl) {
      var total =
        (s.r5Count | 0) +
        (s.r4Count | 0) +
        (s.r3Count | 0) +
        (s.r2Count | 0) +
        (s.r1Count | 0);
      totalEl.textContent = "Total: " + total + " / 100";
      totalEl.classList.toggle("hive-rank-counts__total--over", total > 100);
    }
    if (api.listAvailableHubs) syncHubSelectOptions(api.listAvailableHubs());
  }

  function bindGenerate() {
    var btn = $("hiveGenerateBtn");
    if (!btn || !api || !api.generateAutoHive) return;
    btn.addEventListener("click", function () {
      var gapEl = $("hiveBaseGap");
      var hubEl = $("hiveHubSelect");
      var eliteEl = $("hiveElitePlacement");
      var r4El = $("hiveGenR4");
      var r3El = $("hiveGenR3");
      var r2El = $("hiveGenR2");
      var r1El = $("hiveGenR1");
      function clampInt(el, min, max, fallback) {
        if (!el) return fallback;
        var n = parseInt(el.value, 10);
        if (!Number.isFinite(n)) return fallback;
        return Math.max(min, Math.min(max, n));
      }
      function normalizeCounts(r4, r3, r2, r1) {
        r4 = Math.max(0, Math.min(10, r4 | 0));
        r3 = Math.max(0, Math.min(99, r3 | 0));
        r2 = Math.max(0, Math.min(99, r2 | 0));
        r1 = Math.max(0, Math.min(99, r1 | 0));
        var overflow = 1 + r4 + r3 + r2 + r1 - 100;
        if (overflow > 0) {
          var cut = Math.min(r1, overflow);
          r1 -= cut;
          overflow -= cut;
        }
        if (overflow > 0) {
          var cut2 = Math.min(r2, overflow);
          r2 -= cut2;
          overflow -= cut2;
        }
        if (overflow > 0) {
          var cut3 = Math.min(r3, overflow);
          r3 -= cut3;
          overflow -= cut3;
        }
        if (overflow > 0) r4 = Math.max(0, r4 - overflow);
        return { r5Count: 1, r4Count: r4, r3Count: r3, r2Count: r2, r1Count: r1 };
      }
      var ranks = normalizeCounts(
        clampInt(r4El, 0, 10, 10),
        clampInt(r3El, 0, 99, 20),
        clampInt(r2El, 0, 99, 30),
        clampInt(r1El, 0, 99, 39)
      );
      var elitePlacement =
        eliteEl && eliteEl.value === "outside" ? "outside" : "inside";
      /* Always pull Generate settings from the live form (gap included). */
      if (api.getSettings && api.setSettings) {
        var s = api.getSettings();
        if (gapEl) {
          var g = parseInt(gapEl.value, 10);
          s.baseGap = Number.isFinite(g) ? Math.max(0, Math.min(10, g)) : 1;
        }
        if (hubEl) s.hubPreference = hubEl.value || "auto";
        s.elitePlacement = elitePlacement;
        s.r5Count = ranks.r5Count;
        s.r4Count = ranks.r4Count;
        s.r3Count = ranks.r3Count;
        s.r2Count = ranks.r2Count;
        s.r1Count = ranks.r1Count;
        api.setSettings(s);
        if (api.persist) api.persist();
      }
      if (r4El) r4El.value = String(ranks.r4Count);
      if (r3El) r3El.value = String(ranks.r3Count);
      if (r2El) r2El.value = String(ranks.r2Count);
      if (r1El) r1El.value = String(ranks.r1Count);
      var opts = {
        r5Count: ranks.r5Count,
        r4Count: ranks.r4Count,
        r3Count: ranks.r3Count,
        r2Count: ranks.r2Count,
        r1Count: ranks.r1Count,
        elitePlacement: elitePlacement,
      };
      if (gapEl) {
        var gapVal = parseInt(gapEl.value, 10);
        opts.baseGap = Number.isFinite(gapVal) ? Math.max(0, Math.min(10, gapVal)) : 1;
      }
      if (hubEl) opts.hubPreference = hubEl.value || "auto";
      var result = api.generateAutoHive(opts);
      if (!result) return;
      if (result.message && result.placed === 0 && result.skipped === 0) {
        setStatus(result.message);
      } else if (result.placed > 0 || result.skipped > 0) {
        var msg = "Placed " + result.placed + " base" + (result.placed === 1 ? "" : "s");
        if (result.hub) msg += " around " + result.hub;
        if (result.skipped > 0) {
          msg +=
            ". " +
            result.skipped +
            " could not fit — try a smaller gap or fewer bases.";
        }
        setStatus(msg + ".");
      }
      renderMemberList();
    });
  }

  function bindUi() {
    var pasteBtn = $("hiveMembersImportBtn");
    var fileInput = $("hiveMembersFileInput");
    var listEl = $("hiveMembersList");

    if (pasteBtn) {
      pasteBtn.addEventListener("click", importFromTextarea);
    }
    if (fileInput) {
      fileInput.addEventListener("change", function () {
        var f = fileInput.files && fileInput.files[0];
        if (f) importFromFile(f);
        fileInput.value = "";
      });
    }
    if (listEl) {
      listEl.addEventListener("click", function (ev) {
        var btn = ev.target.closest("[data-remove-member]");
        if (!btn) return;
        ev.stopPropagation();
        var id = btn.getAttribute("data-remove-member");
        if (window.confirm("Remove this member from the roster?" + (id ? "" : ""))) {
          removeMember(id);
        }
      });
    }

    bindMemberDrag();
    bindSettings();
    bindGenerate();
  }

  function initHiveMembers(hiveApi) {
    api = hiveApi;
    api.onMembersChange = function () {
      syncSettingsToUi();
      renderMemberList();
    };
    api.onHubsChange = function (hubs) {
      syncHubSelectOptions(hubs || []);
    };
    syncSettingsToUi();
    bindUi();
    renderMemberList();
    if (api.listAvailableHubs) syncHubSelectOptions(api.listAvailableHubs());
  }

  function waitForApi() {
    if (window.__hiveBuilder) {
      initHiveMembers(window.__hiveBuilder);
      return;
    }
    setTimeout(waitForApi, 30);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForApi);
  } else {
    waitForApi();
  }
})();
