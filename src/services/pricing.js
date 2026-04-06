// CEMS Pricing Engine

const PRICE_MATRIX = {
  Phone: { Working: 500, Damaged: 250, 'Non-functional': 100, 'Parts-only': 50 },
  Laptop: { Working: 1200, Damaged: 600, 'Non-functional': 300, 'Parts-only': 150 },
  Tablet: { Working: 800, Damaged: 400, 'Non-functional': 200, 'Parts-only': 80 },
  TV: { Working: 1000, Damaged: 500, 'Non-functional': 250, 'Parts-only': 100 },
  Appliance: { Working: 700, Damaged: 350, 'Non-functional': 150, 'Parts-only': 60 },
  Battery: { Working: 200, Damaged: 100, 'Non-functional': 50, 'Parts-only': 20 },
  Cable: { Working: 50, Damaged: 30, 'Non-functional': 15, 'Parts-only': 10 },
  Other: { Working: 300, Damaged: 150, 'Non-functional': 80, 'Parts-only': 30 },
};

export const calculatePrice = (deviceType, condition) => {
  return PRICE_MATRIX[deviceType]?.[condition] || 100;
};

export const getPriceMatrix = () => PRICE_MATRIX;

export const formatPrice = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};
