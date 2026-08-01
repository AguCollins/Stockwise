// src/utils/iconMap.js
import {
  Shirt, Footprints, ShoppingBag, HardHat,
  Wind, Crown, Package, Gem, Watch, Glasses,
  Wallet, Scissors, Box, Tag,
} from 'lucide-react';

// Map string name -> Lucide component
export const iconMap = {
  Shirt, Footprints, ShoppingBag, HardHat,
  Wind, Crown, Package, Gem, Watch, Glasses,
  Wallet, Scissors, Box, Tag,
};

// Picker options shown in the Add/Edit modal
export const iconOptions = [
  { name: 'Shirt',       label: 'Clothing'    },
  { name: 'Footprints',  label: 'Footwear'    },
  { name: 'ShoppingBag', label: 'Bag'         },
  { name: 'HardHat',     label: 'Hat'         },
  { name: 'Wind',        label: 'Scarf'       },
  { name: 'Crown',       label: 'Cap'         },
  { name: 'Gem',         label: 'Jewellery'   },
  { name: 'Watch',       label: 'Watch'       },
  { name: 'Glasses',     label: 'Eyewear'     },
  { name: 'Wallet',      label: 'Wallet'      },
  { name: 'Scissors',    label: 'Other'       },
  { name: 'Package',     label: 'Generic'     },
];