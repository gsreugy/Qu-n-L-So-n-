(function () {
  "use strict";

  var GROUPS = [
    { key: "15phut", label: "Kiểm tra 15 phút" },
    { key: "luyenthi", label: "Luyện thi" }
  ];

  var exams = (window.EXAMS || []).slice().sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date));
  });

  var listEl = document.getElementById("list");
  var emptyEl = document.getElementById("empty");
  var countEl = document.getElementById("count");
  var qEl = document.getElementById("q");
  var openIds = {}; /* nhớ bài nào đang mở khi gõ tìm kiếm */

  /* Bỏ dấu tiếng Việt để tìm "tu truong" ra "Từ trường" */
  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/đ/g, "d")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function safeUrl(u) {
    return /^https?:\/\//i.test(u) ? u : "#";
  }

  function render() {
    var term = norm(qEl.value.trim());
    var shown = exams.filter(function (e) {
      return !term || norm(e.title).indexOf(term) !== -1;
    });

    var html = "";
    GROUPS.forEach(function (g) {
      var items = shown.filter(function (e) { return e.group === g.key; });
      if (!items.length) return;
      html += '<section class="group"><h2 class="group-title">' + esc(g.label) + "</h2>";
      items.forEach(function (e) {
        var id = esc(e.id);
        var chips = e.maDe.map(function (m) {
          return '<span class="chip">Mã đề ' + esc(m) + "</span>";
        }).join("");
        var maDeText = e.maDe.length + " mã đề";
        var isOpen = !!openIds[e.id];
        html +=
          '<article class="exam" data-id="' + id + '" data-open="' + isOpen + '">' +
            '<button class="exam-head" type="button" aria-expanded="' + isOpen + '" aria-controls="body-' + id + '">' +
              '<span class="badge">' + (g.key === "15phut" ? "15’" : "LT") + "</span>" +
              '<span class="exam-title"><strong>' + esc(e.title) + "</strong>" +
              "<small>" + maDeText + " · đăng " + esc(fmtDate(e.date)) + "</small></span>" +
              '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            "</button>" +
            '<div class="exam-body" id="body-' + id + '"' + (isOpen ? "" : " hidden") + ">" +
              '<div class="col">' +
                "<h3>Đề để in</h3>" +
                '<div class="chips">' + chips + "</div>" +
                '<a class="btn btn-primary" href="' + esc(safeUrl(e.driveUrl)) + '" target="_blank" rel="noopener">Mở thư mục đề trên Google Drive</a>' +
                '<p class="hint">Trong thư mục, chọn đúng mã đề cần in.</p>' +
              "</div>" +
              '<div class="col">' +
                "<h3>Đáp án cho TN Marker</h3>" +
                '<div class="qr-card">' +
                  '<button type="button" data-zoom="' + id + '" aria-label="Phóng to mã QR đáp án">' +
                    '<img src="' + esc(e.qr) + '" alt="Mã QR đáp án, mã đề ' + esc(e.maDe.join(", ")) + '">' +
                  "</button>" +
                  '<p class="qr-cap">Một mã QR cho tất cả mã đề</p>' +
                "</div>" +
                '<button class="btn btn-outline" type="button" data-zoom="' + id + '">Phóng to QR</button>' +
              "</div>" +
            "</div>" +
          "</article>";
      });
      html += "</section>";
    });

    listEl.innerHTML = html;
    emptyEl.hidden = shown.length > 0;
    countEl.textContent = shown.length + " / " + exams.length + " bài";
  }

  function fmtDate(d) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d || "");
    return m ? m[3] + "/" + m[2] + "/" + m[1] : d;
  }

  /* Mở / đóng một bài */
  listEl.addEventListener("click", function (ev) {
    var head = ev.target.closest(".exam-head");
    if (head) {
      var card = head.closest(".exam");
      var open = card.getAttribute("data-open") === "true";
      openIds[card.getAttribute("data-id")] = !open;
      card.setAttribute("data-open", open ? "false" : "true");
      head.setAttribute("aria-expanded", open ? "false" : "true");
      card.querySelector(".exam-body").hidden = open;
      return;
    }
    var zoom = ev.target.closest("[data-zoom]");
    if (zoom) openQr(zoom.getAttribute("data-zoom"));
  });

  qEl.addEventListener("input", render);

  /* Phóng to QR */
  var qrOverlay = document.getElementById("qrOverlay");
  function openQr(id) {
    var e = exams.filter(function (x) { return x.id === id; })[0];
    if (!e) return;
    document.getElementById("qrBig").src = e.qr;
    document.getElementById("qrSub").textContent = e.title + " · Mã đề " + e.maDe.join(", ");
    qrOverlay.hidden = false;
  }

  /* Hướng dẫn */
  var helpOverlay = document.getElementById("helpOverlay");
  document.getElementById("helpBtn").addEventListener("click", function () {
    helpOverlay.hidden = false;
  });

  /* Đóng hộp thoại: nút ×, bấm nền, phím Esc */
  [qrOverlay, helpOverlay].forEach(function (ov) {
    ov.addEventListener("click", function (ev) {
      if (ev.target === ov || ev.target.hasAttribute("data-close")) ov.hidden = true;
    });
  });
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") { qrOverlay.hidden = true; helpOverlay.hidden = true; }
  });

  /* Nếu chỉ có một bài, mở sẵn cho tiện */
  if (exams.length === 1) openIds[exams[0].id] = true;
  render();
})();
