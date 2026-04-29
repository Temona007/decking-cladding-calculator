(function () {
  const catalog = window.DECKING_CATALOG;
  if (!catalog) return;

  const els = {
    length: document.getElementById("length"),
    width: document.getElementById("width"),
    boardType: document.getElementById("board-type"),
    boardSize: document.getElementById("board-size"),
    waste: document.getElementById("waste"),
    accEdge: document.getElementById("acc-edge"),
    accDrain: document.getElementById("acc-drain"),
    accOil: document.getElementById("acc-oil"),
    outArea: document.getElementById("out-area"),
    outBoards: document.getElementById("out-boards"),
    outBoardCost: document.getElementById("out-board-cost"),
    outJoists: document.getElementById("out-joists"),
    outJoistCost: document.getElementById("out-joist-cost"),
    outScrews: document.getElementById("out-screws"),
    outScrewCost: document.getElementById("out-screw-cost"),
    outAccRow: document.getElementById("out-acc-row"),
    outAccCost: document.getElementById("out-acc-cost"),
    outTotal: document.getElementById("out-total"),
    resultsCard: document.getElementById("results-card"),
  };

  const fmt = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const fmtInt = new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0,
  });

  function money(n) {
    return catalog.currencySymbol + fmt.format(n);
  }

  function getSelectedBoard() {
    const id = els.boardSize.value;
    return catalog.boards.find((b) => b.id === id) || catalog.boards[0];
  }

  function populateBoardSizes() {
    const type = els.boardType.value;
    const prev = els.boardSize.value;
    els.boardSize.innerHTML = "";
    const filtered = catalog.boards.filter((b) => b.type === type);
    const list = filtered.length ? filtered : catalog.boards;
    list.forEach((b) => {
      const opt = document.createElement("option");
      opt.value = b.id;
      opt.textContent = b.label.replace(/^[^—]+—\s*/, "") || b.label;
      els.boardSize.appendChild(opt);
    });
    if (list.some((b) => b.id === prev)) els.boardSize.value = prev;
  }

  function joistPacksForArea(areaM2) {
    /** Rule of thumb: ~0.65 linear m joist per m² deck (400 mm centres, typical residential) */
    const linearM = areaM2 * 0.65;
    const packs = Math.ceil(linearM / catalog.joists.perPackLinearM);
    return { packs, linearM };
  }

  function screwBoxes(areaM2) {
    const count = Math.ceil(areaM2 * catalog.fixings.screwsPerM2);
    const boxes = Math.ceil(count / 100);
    return { count, boxes };
  }

  function recalc() {
    const L = parseFloat(els.length.value) || 0;
    const W = parseFloat(els.width.value) || 0;
    const wastePct = Math.min(50, Math.max(0, parseFloat(els.waste.value) || 0));
    const area = L * W;
    const board = getSelectedBoard();
    const factor = 1 + wastePct / 100;

    const boardsRaw = area > 0 && board.coverageM2 > 0 ? (area * factor) / board.coverageM2 : 0;
    const boardCount = Math.max(0, Math.ceil(boardsRaw));
    const boardCost = boardCount * board.pricePerBoard;

    const { packs } = joistPacksForArea(area);
    const joistCost = area > 0 ? packs * catalog.joists.pricePerPack : 0;

    const { count: screwCount, boxes: screwBoxes_ } = screwBoxes(area);
    const screwCost = area > 0 ? screwBoxes_ * catalog.fixings.pricePer100 : 0;

    let accTotal = 0;
    const accLines = [];
    if (els.accEdge.checked) {
      const a = catalog.accessories.find((x) => x.id === "edge-trim");
      if (a) {
        accTotal += a.price;
        accLines.push(a.label);
      }
    }
    if (els.accDrain.checked) {
      const a = catalog.accessories.find((x) => x.id === "drain");
      if (a) {
        accTotal += a.price;
        accLines.push(a.label);
      }
    }
    if (els.accOil.checked) {
      const a = catalog.accessories.find((x) => x.id === "oil");
      if (a) {
        accTotal += a.price;
        accLines.push(a.label);
      }
    }

    const total = boardCost + joistCost + screwCost + accTotal;

    els.outArea.textContent =
      area > 0 ? fmt.format(area) + " m²" : "—";
    els.outBoards.textContent = area > 0 ? fmtInt.format(boardCount) + " boards" : "—";
    els.outBoardCost.textContent = area > 0 ? money(boardCost) : "—";
    els.outJoists.textContent =
      area > 0 ? packs + " pack" + (packs !== 1 ? "s" : "") : "—";
    els.outJoistCost.textContent = area > 0 ? money(joistCost) : "—";
    els.outScrews.textContent =
      area > 0
        ? fmtInt.format(screwCount) + " screws (~" + screwBoxes_ + "×100)"
        : "—";
    els.outScrewCost.textContent = area > 0 ? money(screwCost) : "—";

    if (accLines.length) {
      els.outAccRow.hidden = false;
      els.outAccCost.textContent = money(accTotal);
      els.outAccCost.title = accLines.join(", ");
    } else {
      els.outAccRow.hidden = true;
      els.outAccCost.textContent = "—";
      els.outAccCost.title = "";
    }

    els.outTotal.textContent = area > 0 ? money(total) : "—";
    els.resultsCard.classList.toggle("results-card--empty", area <= 0);
  }

  function bind() {
    [
      els.length,
      els.width,
      els.boardType,
      els.boardSize,
      els.waste,
      els.accEdge,
      els.accDrain,
      els.accOil,
    ].forEach((el) => {
      if (!el) return;
      el.addEventListener("input", recalc);
      el.addEventListener("change", recalc);
    });
    els.boardType.addEventListener("change", () => {
      populateBoardSizes();
      recalc();
    });
  }

  populateBoardSizes();
  bind();
  recalc();
})();
