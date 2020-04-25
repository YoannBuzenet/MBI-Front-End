const allConditions = {
  1: {
    id: 1,
    nameEU: "Mint",
    nameUS: null,
    isEU: true,
    isUS: false,
    shortname: { EU: "Mint", US: "Mint" },
  },
  2: {
    id: 2,
    nameEU: "Near-Mint",
    nameUS: "Near-Mint",
    isEU: true,
    isUS: true,
    shortname: { EU: "NM", US: "NM" },
  },
  3: {
    id: 3,
    nameEU: "Excellent",
    nameUS: "Slightly Played",
    isEU: true,
    isUS: false,
    shortname: { EU: "EXC", US: "LP" },
  },
  4: {
    id: 4,
    nameEU: "Good",
    nameUS: "Moderately Played",
    isEU: true,
    isUS: true,
    shortname: { EU: "GD", US: "MP" },
  },
  5: {
    id: 5,
    nameEU: "Light-Played",
    nameUS: null,
    isEU: true,
    isUS: false,
    shortname: { EU: "LP", US: null },
  },
  6: {
    id: 6,
    nameEU: "Played",
    nameUS: "Heavily Played",
    isEU: true,
    isUS: true,
    shortname: { EU: "PL", US: "HP" },
  },
  7: {
    id: 7,
    nameEU: "Poor",
    nameUS: "Damaged",
    isEU: true,
    isUS: true,
    shortname: { EU: "PO", US: "D" },
  },
};

export default {
  allConditions,
};
