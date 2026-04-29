/**
 * Demo catalog — replace with WooCommerce REST API or imported JSON in production.
 * Prices in GBP for illustration only.
 */
window.DECKING_CATALOG = {
  currency: "GBP",
  currencySymbol: "£",
  boards: [
    {
      id: "comp-21-3600",
      type: "composite",
      label: "Composite — 21 × 3600 mm",
      widthMm: 21,
      lengthMm: 3600,
      /** Effective coverage per board (m²) after typical gapping */
      coverageM2: 0.058,
      pricePerBoard: 24.99,
    },
    {
      id: "comp-25-3600",
      type: "composite",
      label: "Composite — 25 × 3600 mm",
      widthMm: 25,
      lengthMm: 3600,
      coverageM2: 0.068,
      pricePerBoard: 29.5,
    },
    {
      id: "hw-19-2400",
      type: "hardwood",
      label: "Hardwood — 19 × 2400 mm",
      widthMm: 19,
      lengthMm: 2400,
      coverageM2: 0.036,
      pricePerBoard: 18.75,
    },
    {
      id: "hw-21-3000",
      type: "hardwood",
      label: "Hardwood — 21 × 3000 mm",
      widthMm: 21,
      lengthMm: 3000,
      coverageM2: 0.052,
      pricePerBoard: 26.0,
    },
    {
      id: "sw-32-3600",
      type: "softwood",
      label: "Softwood — 32 × 3600 mm",
      widthMm: 32,
      lengthMm: 3600,
      coverageM2: 0.095,
      pricePerBoard: 12.4,
    },
    {
      id: "sw-32-4800",
      type: "softwood",
      label: "Softwood — 32 × 4800 mm",
      widthMm: 32,
      lengthMm: 4800,
      coverageM2: 0.127,
      pricePerBoard: 15.9,
    },
  ],
  /** Joist packs: linear metres equivalent per pack, price */
  joists: {
    perPackLinearM: 12,
    pricePerPack: 42.0,
    label: "Sub-frame joists (per 12 m pack)",
  },
  /** Screws: estimated per m² deck surface */
  fixings: {
    screwsPerM2: 22,
    pricePer100: 8.5,
    label: "Decking screws (stainless)",
  },
  accessories: [
    { id: "edge-trim", label: "Edge trim kit", price: 34.0, unit: "kit" },
    { id: "drain", label: "Drainage membrane (10 m² roll)", price: 28.0, unit: "roll" },
    { id: "oil", label: "Wood oil / protector (2.5 L)", price: 39.99, unit: "tin" },
  ],
};
