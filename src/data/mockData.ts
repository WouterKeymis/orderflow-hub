// Mock data for Order Allocation Management System

export interface SKU {
  skuCode: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  country: string;
  allocatedWarehouse: string;
  totalItems: number;
  status: "Processed" | "On Hold" | "Pending";
  skus: SKU[];
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  maxDailyOrders: number;
  currentLoad: number;
  priorityScore: number;
  operatingHours: string;
  enabled: boolean;
}

export interface CountryCutoff {
  id: string;
  country: string;
  countryCode: string;
  cutoffTime: string;
  timezone: string;
  priority: number;
  enabled: boolean;
}

export interface AllocationRule {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface ShippingPreference {
  id: string;
  country: string;
  carrier: string;
  costTier: "Economy" | "Standard" | "Express" | "Premium";
  enabled: boolean;
}

export interface HolidayDate {
  id: string;
  date: string;
  warehouse: string;
  type: "Closed" | "Reduced";
  description: string;
}

// Sample SKUs for sport shoes (ON)
const sampleSKUs: SKU[] = [
  {
    skuCode: "ON-001",
    productName: "ON Cloud X 3",
    quantity: 2,
    unitPrice: 149.99,
  },
  {
    skuCode: "ON-002",
    productName: "ON Cloudmonster",
    quantity: 1,
    unitPrice: 169.99,
  },
  {
    skuCode: "ON-003",
    productName: "ON Cloudrunner",
    quantity: 3,
    unitPrice: 139.99,
  },
  {
    skuCode: "ON-004",
    productName: "ON Cloudswift",
    quantity: 1,
    unitPrice: 159.99,
  },
  {
    skuCode: "ON-005",
    productName: "ON Cloudflow",
    quantity: 2,
    unitPrice: 139.99,
  },
  {
    skuCode: "ON-006",
    productName: "ON Cloudventure",
    quantity: 1,
    unitPrice: 169.99,
  },
  {
    skuCode: "ON-007",
    productName: "ON Cloudsurfer",
    quantity: 2,
    unitPrice: 149.99,
  },
  {
    skuCode: "ON-008",
    productName: "ON Cloud 5",
    quantity: 1,
    unitPrice: 129.99,
  },
  {
    skuCode: "ON-009",
    productName: "ON Cloudace",
    quantity: 1,
    unitPrice: 179.99,
  },
  {
    skuCode: "ON-010",
    productName: "ON Cloudflyer",
    quantity: 2,
    unitPrice: 159.99,
  },
  {
    skuCode: "ON-011",
    productName: "ON Cloudtrax",
    quantity: 1,
    unitPrice: 159.99,
  },
  {
    skuCode: "ON-012",
    productName: "ON Cloudultra",
    quantity: 1,
    unitPrice: 179.99,
  },
  {
    skuCode: "ON-013",
    productName: "ON Cloudnova",
    quantity: 2,
    unitPrice: 149.99,
  },
  {
    skuCode: "ON-014",
    productName: "ON Cloud Terry",
    quantity: 1,
    unitPrice: 139.99,
  },
  {
    skuCode: "ON-015",
    productName: "ON Cloud Dip",
    quantity: 1,
    unitPrice: 139.99,
  },
  {
    skuCode: "ON-016",
    productName: "ON Cloud Waterproof",
    quantity: 1,
    unitPrice: 149.99,
  },
  {
    skuCode: "ON-017",
    productName: "ON Cloud Hi",
    quantity: 1,
    unitPrice: 159.99,
  },
  {
    skuCode: "ON-018",
    productName: "ON Cloudrock",
    quantity: 1,
    unitPrice: 199.99,
  },
  {
    skuCode: "ON-019",
    productName: "ON Cloudventure Peak",
    quantity: 1,
    unitPrice: 179.99,
  },
  {
    skuCode: "ON-020",
    productName: "ON Cloud Edge",
    quantity: 1,
    unitPrice: 149.99,
  },
];

const countries = ["Belgium", "Netherlands", "France", "Germany", "Luxembourg"];
const warehouses = ["Luxembourg", "Beringen", "Tessenderlo"];
const statuses: Array<"Processed" | "On Hold" | "Pending"> = [
  "Processed",
  "On Hold",
  "Pending",
];
const customerFirstNames = [
  "John",
  "Emma",
  "Michael",
  "Sarah",
  "David",
  "Lisa",
  "James",
  "Maria",
  "Robert",
  "Jennifer",
  "William",
  "Amanda",
  "Christopher",
  "Ashley",
  "Matthew",
  "Stephanie",
  "Daniel",
  "Nicole",
  "Andrew",
  "Jessica",
];
const customerLastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Wilson",
  "Anderson",
  "Taylor",
  "Thomas",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Thompson",
  "White",
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSKUs(): SKU[] {
  const count = Math.floor(Math.random() * 4) + 1;
  const shuffled = [...sampleSKUs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((sku) => ({
    ...sku,
    quantity: Math.floor(Math.random() * 5) + 1,
  }));
}

function generateOrderNumber(index: number): string {
  return `ORD-${String(index + 1000).padStart(6, "0")}`;
}

function generateRandomDate(): string {
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
}

// Generate 25 sample orders
export const orders: Order[] = Array.from({ length: 25 }, (_, i) => {
  const skus = getRandomSKUs();
  const status = getRandomElement(statuses);
  return {
    id: `order-${i + 1}`,
    orderNumber: generateOrderNumber(i),
    customerName: `${getRandomElement(customerFirstNames)} ${getRandomElement(customerLastNames)}`,
    orderDate: generateRandomDate(),
    country: getRandomElement(countries),
    allocatedWarehouse:
      status === "Processed" ? getRandomElement(warehouses) : "",
    totalItems: skus.reduce((sum, sku) => sum + sku.quantity, 0),
    status,
    skus,
  };
});

// Warehouse data
export const warehouseData: Warehouse[] = [
  {
    id: "wh-1",
    name: "Luxembourg",
    code: "LUX",
    maxDailyOrders: 300,
    currentLoad: 72,
    priorityScore: 9,
    operatingHours: "07:00 - 21:00 CET",
    enabled: true,
  },
  {
    id: "wh-2",
    name: "Beringen",
    code: "BER",
    maxDailyOrders: 250,
    currentLoad: 58,
    priorityScore: 8,
    operatingHours: "07:00 - 21:00 CET",
    enabled: true,
  },
  {
    id: "wh-3",
    name: "Tessenderlo",
    code: "TES",
    maxDailyOrders: 200,
    currentLoad: 45,
    priorityScore: 7,
    operatingHours: "07:00 - 21:00 CET",
    enabled: true,
  },
];

// Country cutoff times
export const countryCutoffs: CountryCutoff[] = [
  {
    id: "cc-1",
    country: "Belgium",
    countryCode: "BE",
    cutoffTime: "17:00",
    timezone: "CET",
    priority: 1,
    enabled: true,
  },
  {
    id: "cc-2",
    country: "Netherlands",
    countryCode: "NL",
    cutoffTime: "17:00",
    timezone: "CET",
    priority: 2,
    enabled: true,
  },
  {
    id: "cc-3",
    country: "France",
    countryCode: "FR",
    cutoffTime: "16:00",
    timezone: "CET",
    priority: 3,
    enabled: true,
  },
  {
    id: "cc-4",
    country: "Germany",
    countryCode: "DE",
    cutoffTime: "16:00",
    timezone: "CET",
    priority: 4,
    enabled: true,
  },
  {
    id: "cc-5",
    country: "Luxembourg",
    countryCode: "LU",
    cutoffTime: "17:00",
    timezone: "CET",
    priority: 5,
    enabled: true,
  },
];

// Allocation rules
export const allocationRules: AllocationRule[] = [
  {
    id: "ar-1",
    name: "Geographic Proximity",
    description: "Prioritize warehouses closest to delivery address",
    order: 1,
  },
  {
    id: "ar-2",
    name: "Stock Availability",
    description: "Ensure all items are in stock at selected warehouse",
    order: 2,
  },
  {
    id: "ar-3",
    name: "Cost Efficiency",
    description: "Minimize shipping and handling costs",
    order: 3,
  },
  {
    id: "ar-4",
    name: "Delivery Speed",
    description: "Optimize for fastest possible delivery",
    order: 4,
  },
  {
    id: "ar-5",
    name: "Customer Priority Level",
    description: "Give preference based on customer tier",
    order: 5,
  },
];

// Shipping preferences
export const shippingPreferences: ShippingPreference[] = [
  {
    id: "sp-1",
    country: "Belgium",
    carrier: "bpost",
    costTier: "Standard",
    enabled: true,
  },
  {
    id: "sp-2",
    country: "Netherlands",
    carrier: "PostNL",
    costTier: "Standard",
    enabled: true,
  },
  {
    id: "sp-3",
    country: "France",
    carrier: "La Poste",
    costTier: "Standard",
    enabled: true,
  },
  {
    id: "sp-4",
    country: "Germany",
    carrier: "DHL",
    costTier: "Standard",
    enabled: true,
  },
  {
    id: "sp-5",
    country: "Luxembourg",
    carrier: "Post Luxembourg",
    costTier: "Standard",
    enabled: true,
  },
];

// Holiday dates
export const holidayDates: HolidayDate[] = [
  {
    id: "hd-1",
    date: "2025-12-25",
    warehouse: "All",
    type: "Closed",
    description: "Christmas Day",
  },
  {
    id: "hd-2",
    date: "2025-01-01",
    warehouse: "All",
    type: "Closed",
    description: "New Year's Day",
  },
  {
    id: "hd-3",
    date: "2025-05-01",
    warehouse: "All",
    type: "Closed",
    description: "Labour Day",
  },
  {
    id: "hd-4",
    date: "2025-07-21",
    warehouse: "Beringen",
    type: "Closed",
    description: "Belgian National Day",
  },
  {
    id: "hd-5",
    date: "2025-06-23",
    warehouse: "Luxembourg",
    type: "Closed",
    description: "Luxembourg National Day",
  },
];

// Stock threshold settings
export const stockThresholds = {
  minimumStockLevel: 50,
  reorderPoint: 100,
  safetyStockPercentage: 15,
  bufferDays: 7,
};

// Helper to generate processing events
export function generateProcessingEvent() {
  const eventTypes = ["Validated", "Processing", "Allocated", "Complete"];
  const order = getRandomElement(orders);
  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    orderNumber: order.orderNumber,
    status: getRandomElement(eventTypes),
    timestamp: new Date().toISOString(),
    warehouse: order.allocatedWarehouse,
  };
}

// Helper to generate stock movement events
export function generateStockMovement() {
  const movementTypes = ["Inbound", "Outbound", "Transfer"];
  const sku = getRandomElement(sampleSKUs);
  const fromLocations = [
    "Receiving",
    "Luxembourg",
    "Beringen",
    "Tessenderlo",
    "Vendor",
  ];
  const toLocations = [
    "Luxembourg",
    "Beringen",
    "Tessenderlo",
    "Shipping",
    "Returns",
  ];

  return {
    id: `stk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    sku: sku.skuCode,
    productName: sku.productName,
    movementType: getRandomElement(movementTypes),
    quantity: Math.floor(Math.random() * 50) + 1,
    from: getRandomElement(fromLocations),
    to: getRandomElement(toLocations),
    timestamp: new Date().toISOString(),
  };
}
