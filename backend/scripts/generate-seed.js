const fs = require('fs');
const path = require('path');

const brands = ['OLLY', 'Nature\'s Bounty', 'Garden of Life', 'SmartyPants', 'Ritual', 'HUM Nutrition', 'Vital Proteins', 'Liquid I.V.', 'Athletic Greens', 'Thorne', 'Care/of', 'NOW Foods', 'New Chapter', 'MegaFood', 'Goli Nutrition'];

const categories = [
  {
    name: 'Sleep',
    productNames: ['Sleep Gummies', 'Deep Sleep Formula', 'Rest & Relax', 'Nighttime Recovery', 'Sleep Support'],
    ingredients: ['Melatonin', 'L-Theanine', 'Magnesium', 'Chamomile', 'Valerian Root', 'Ashwagandha', 'GABA'],
    claims: ['Promotes restful sleep', 'Wake up refreshed', 'Non-habit forming', 'Supports relaxation', 'Reduces stress']
  },
  {
    name: 'Immunity',
    productNames: ['Immune Defense', 'Daily Immunity', 'Immune Support', 'Vitamin C Complex', 'Elderberry Gummies'],
    ingredients: ['Vitamin C', 'Zinc', 'Elderberry', 'Echinacea', 'Vitamin D3', 'Ginger', 'Turmeric'],
    claims: ['Boosts immune system', 'Antioxidant support', 'Year-round protection', 'High potency', 'Supports overall health']
  },
  {
    name: 'Energy',
    productNames: ['Energy Boost', 'Daily Energy', 'B12 Complex', 'Focus & Energy', 'Pre-Workout Energizer'],
    ingredients: ['Vitamin B12', 'Caffeine', 'Green Tea Extract', 'Maca Root', 'Ginseng', 'Rhodiola', 'CoQ10'],
    claims: ['Enhances energy levels', 'Sustained energy without crash', 'Supports focus', 'Metabolism boost', 'Cellular energy support']
  },
  {
    name: 'Digestive Health',
    productNames: ['Daily Probiotic', 'Gut Health', 'Pre & Probiotic', 'Digestive Enzymes', 'Fiber Gummies'],
    ingredients: ['Probiotics', 'Prebiotics', 'Digestive Enzymes', 'Ginger', 'Peppermint', 'Inulin', 'Psyllium Husk'],
    claims: ['Promotes gut health', 'Supports healthy digestion', 'Reduces bloating', 'Balances microflora', 'Dairy-free']
  },
  {
    name: 'Beauty',
    productNames: ['Hair, Skin & Nails', 'Collagen Peptides', 'Glow Gummies', 'Beauty Boost', 'Clear Skin'],
    ingredients: ['Collagen', 'Biotin', 'Hyaluronic Acid', 'Vitamin E', 'Keratin', 'Vitamin A', 'Zinc'],
    claims: ['Improves skin elasticity', 'Strengthens hair and nails', 'Anti-aging support', 'Promotes a healthy glow', 'Hydrates skin']
  },
  {
    name: 'Cognitive Health',
    productNames: ['Brain Focus', 'Memory Support', 'Nootropic Blend', 'Clarity & Focus', 'Neuro Health'],
    ingredients: ['Omega-3', 'Lion\'s Mane', 'Bacopa Monnieri', 'Ginkgo Biloba', 'L-Theanine', 'Phosphatidylserine'],
    claims: ['Supports brain function', 'Enhances memory', 'Improves focus and clarity', 'Neuroprotective', 'Reduces mental fatigue']
  },
  {
    name: 'Weight Management',
    productNames: ['Metabolism Boost', 'Fat Burner', 'Apple Cider Vinegar Gummies', 'Lean Muscle', 'Appetite Control'],
    ingredients: ['Apple Cider Vinegar', 'Green Coffee Bean', 'Garcinia Cambogia', 'CLA', 'MCT Oil', 'Chromium'],
    claims: ['Supports weight management', 'Boosts metabolism', 'Controls appetite', 'Promotes fat burning', 'Keto-friendly']
  }
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomItems = (arr, min, max) => {
  const count = randomInt(min, max);
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const generateProducts = (count) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    const categoryObj = randomItem(categories);
    const brand = randomItem(brands);
    const productName = randomItem(categoryObj.productNames);
    
    const revenue = randomInt(50000, 5000000);

    products.push({
      brand,
      productName: `${brand} ${productName}`,
      category: categoryObj.name,
      ingredients: randomItems(categoryObj.ingredients, 2, 4),
      claims: randomItems(categoryObj.claims, 2, 4),
      revenue
    });
  }
  return products;
};

const seedData = generateProducts(100);

const outputPath = path.join(__dirname, '../seed-data.json');
fs.writeFileSync(outputPath, JSON.stringify(seedData, null, 2));

console.log(`Successfully generated 100 realistic products at ${outputPath}`);
