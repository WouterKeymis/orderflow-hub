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
  status: 'Processed' | 'On Hold' | 'Pending';
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
  costTier: 'Economy' | 'Standard' | 'Express' | 'Premium';
  enabled: boolean;
}

export interface HolidayDate {
  id: string;
  date: string;
  warehouse: string;
  type: 'Closed' | 'Reduced';
  description: string;
}

// Sample SKUs
const sampleSKUs: SKU[] = [
  { skuCode: 'SKU-001', productName: 'Wireless Bluetooth Headphones', quantity: 2, unitPrice: 79.99 },
  { skuCode: 'SKU-002', productName: 'USB-C Charging Cable 6ft', quantity: 5, unitPrice: 12.99 },
  { skuCode: 'SKU-003', productName: 'Laptop Stand Adjustable', quantity: 1, unitPrice: 45.99 },
  { skuCode: 'SKU-004', productName: 'Mechanical Keyboard RGB', quantity: 1, unitPrice: 129.99 },
  { skuCode: 'SKU-005', productName: 'Mouse Pad XL Gaming', quantity: 1, unitPrice: 24.99 },
  { skuCode: 'SKU-006', productName: 'Webcam 1080p HD', quantity: 1, unitPrice: 69.99 },
  { skuCode: 'SKU-007', productName: 'Monitor Arm Dual', quantity: 1, unitPrice: 89.99 },
  { skuCode: 'SKU-008', productName: 'External SSD 1TB', quantity: 2, unitPrice: 109.99 },
  { skuCode: 'SKU-009', productName: 'Desk Organizer Set', quantity: 1, unitPrice: 34.99 },
  { skuCode: 'SKU-010', productName: 'LED Desk Lamp', quantity: 1, unitPrice: 42.99 },
  { skuCode: 'SKU-011', productName: 'Noise Cancelling Earbuds', quantity: 1, unitPrice: 149.99 },
  { skuCode: 'SKU-012', productName: 'Portable Power Bank 20000mAh', quantity: 3, unitPrice: 39.99 },
  { skuCode: 'SKU-013', productName: 'Wireless Mouse Ergonomic', quantity: 2, unitPrice: 59.99 },
  { skuCode: 'SKU-014', productName: 'HDMI Cable 4K 10ft', quantity: 4, unitPrice: 18.99 },
  { skuCode: 'SKU-015', productName: 'USB Hub 7-Port', quantity: 1, unitPrice: 29.99 },
  { skuCode: 'SKU-016', productName: 'Laptop Sleeve 15 inch', quantity: 2, unitPrice: 24.99 },
  { skuCode: 'SKU-017', productName: 'Cable Management Kit', quantity: 1, unitPrice: 15.99 },
  { skuCode: 'SKU-018', productName: 'Smart Plug WiFi 4-Pack', quantity: 1, unitPrice: 49.99 },
  { skuCode: 'SKU-019', productName: 'Bluetooth Speaker Portable', quantity: 1, unitPrice: 79.99 },
  { skuCode: 'SKU-020', productName: 'Wireless Charging Pad', quantity: 2, unitPrice: 29.99 },
  { skuCode: 'SKU-021', productName: 'Phone Stand Aluminum', quantity: 1, unitPrice: 19.99 },
  { skuCode: 'SKU-022', productName: 'Screen Protector 3-Pack', quantity: 1, unitPrice: 12.99 },
  { skuCode: 'SKU-023', productName: 'Tablet Stylus Pen', quantity: 1, unitPrice: 34.99 },
  { skuCode: 'SKU-024', productName: 'Memory Card 256GB', quantity: 2, unitPrice: 44.99 },
  { skuCode: 'SKU-025', productName: 'USB Flash Drive 128GB', quantity: 3, unitPrice: 19.99 },
  { skuCode: 'SKU-026', productName: 'Ethernet Cable Cat6 50ft', quantity: 2, unitPrice: 22.99 },
  { skuCode: 'SKU-027', productName: 'Smart Watch Band', quantity: 1, unitPrice: 14.99 },
  { skuCode: 'SKU-028', productName: 'Air Quality Monitor', quantity: 1, unitPrice: 89.99 },
  { skuCode: 'SKU-029', productName: 'Document Scanner Portable', quantity: 1, unitPrice: 159.99 },
  { skuCode: 'SKU-030', productName: 'Printer Paper Ream 500', quantity: 2, unitPrice: 9.99 },
  { skuCode: 'SKU-031', productName: 'Ink Cartridge Set', quantity: 1, unitPrice: 54.99 },
  { skuCode: 'SKU-032', productName: 'Label Maker', quantity: 1, unitPrice: 39.99 },
  { skuCode: 'SKU-033', productName: 'Surge Protector 8-Outlet', quantity: 1, unitPrice: 34.99 },
  { skuCode: 'SKU-034', productName: 'UPS Battery Backup', quantity: 1, unitPrice: 149.99 },
  { skuCode: 'SKU-035', productName: 'Network Switch 8-Port', quantity: 1, unitPrice: 69.99 },
  { skuCode: 'SKU-036', productName: 'WiFi Range Extender', quantity: 1, unitPrice: 49.99 },
  { skuCode: 'SKU-037', productName: 'Desk Mat Leather', quantity: 1, unitPrice: 39.99 },
  { skuCode: 'SKU-038', productName: 'Blue Light Glasses', quantity: 1, unitPrice: 29.99 },
  { skuCode: 'SKU-039', productName: 'Wrist Rest Gel', quantity: 1, unitPrice: 16.99 },
  { skuCode: 'SKU-040', productName: 'Footrest Ergonomic', quantity: 1, unitPrice: 44.99 },
  { skuCode: 'SKU-041', productName: 'Microphone USB Condenser', quantity: 1, unitPrice: 99.99 },
  { skuCode: 'SKU-042', productName: 'Pop Filter Microphone', quantity: 1, unitPrice: 14.99 },
  { skuCode: 'SKU-043', productName: 'Boom Arm Microphone', quantity: 1, unitPrice: 49.99 },
  { skuCode: 'SKU-044', productName: 'Green Screen Collapsible', quantity: 1, unitPrice: 79.99 },
  { skuCode: 'SKU-045', productName: 'Ring Light 12 inch', quantity: 1, unitPrice: 39.99 },
  { skuCode: 'SKU-046', productName: 'Tripod Phone Mount', quantity: 1, unitPrice: 24.99 },
  { skuCode: 'SKU-047', productName: 'SD Card Reader USB 3.0', quantity: 2, unitPrice: 14.99 },
  { skuCode: 'SKU-048', productName: 'Cleaning Kit Electronics', quantity: 1, unitPrice: 12.99 },
  { skuCode: 'SKU-049', productName: 'Anti-Static Wrist Strap', quantity: 2, unitPrice: 6.99 },
  { skuCode: 'SKU-050', productName: 'Thermal Paste Tube', quantity: 3, unitPrice: 8.99 },
];

const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Canada', 'Australia', 'Japan', 'Netherlands', 'Spain', 'Italy'];
const warehouses = ['US East', 'US West', 'EU Central', 'APAC', 'UK'];
const statuses: Array<'Processed' | 'On Hold' | 'Pending'> = ['Processed', 'On Hold', 'Pending'];
const customerFirstNames = ['John', 'Emma', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Maria', 'Robert', 'Jennifer', 'William', 'Amanda', 'Christopher', 'Ashley', 'Matthew', 'Stephanie', 'Daniel', 'Nicole', 'Andrew', 'Jessica'];
const customerLastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White'];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSKUs(): SKU[] {
  const count = Math.floor(Math.random() * 4) + 1;
  const shuffled = [...sampleSKUs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(sku => ({
    ...sku,
    quantity: Math.floor(Math.random() * 5) + 1
  }));
}

function generateOrderNumber(index: number): string {
  return `ORD-${String(index + 1000).padStart(6, '0')}`;
}

function generateRandomDate(): string {
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

// Generate 25 sample orders
export const orders: Order[] = Array.from({ length: 25 }, (_, i) => {
  const skus = getRandomSKUs();
  return {
    id: `order-${i + 1}`,
    orderNumber: generateOrderNumber(i),
    customerName: `${getRandomElement(customerFirstNames)} ${getRandomElement(customerLastNames)}`,
    orderDate: generateRandomDate(),
    country: getRandomElement(countries),
    allocatedWarehouse: getRandomElement(warehouses),
    totalItems: skus.reduce((sum, sku) => sum + sku.quantity, 0),
    status: getRandomElement(statuses),
    skus
  };
});

// Warehouse data
export const warehouseData: Warehouse[] = [
  { id: 'wh-1', name: 'US East', code: 'USE', maxDailyOrders: 500, currentLoad: 72, priorityScore: 8, operatingHours: '06:00 - 22:00 EST', enabled: true },
  { id: 'wh-2', name: 'US West', code: 'USW', maxDailyOrders: 450, currentLoad: 58, priorityScore: 7, operatingHours: '06:00 - 22:00 PST', enabled: true },
  { id: 'wh-3', name: 'EU Central', code: 'EUC', maxDailyOrders: 400, currentLoad: 85, priorityScore: 9, operatingHours: '07:00 - 21:00 CET', enabled: true },
  { id: 'wh-4', name: 'APAC', code: 'APC', maxDailyOrders: 350, currentLoad: 45, priorityScore: 6, operatingHours: '08:00 - 20:00 JST', enabled: true },
  { id: 'wh-5', name: 'UK', code: 'UKW', maxDailyOrders: 300, currentLoad: 67, priorityScore: 7, operatingHours: '07:00 - 21:00 GMT', enabled: true },
];

// Country cutoff times
export const countryCutoffs: CountryCutoff[] = [
  { id: 'cc-1', country: 'United States', countryCode: 'US', cutoffTime: '18:00', timezone: 'EST', priority: 1, enabled: true },
  { id: 'cc-2', country: 'United Kingdom', countryCode: 'UK', cutoffTime: '17:00', timezone: 'GMT', priority: 2, enabled: true },
  { id: 'cc-3', country: 'Germany', countryCode: 'DE', cutoffTime: '16:00', timezone: 'CET', priority: 3, enabled: true },
  { id: 'cc-4', country: 'France', countryCode: 'FR', cutoffTime: '16:00', timezone: 'CET', priority: 4, enabled: true },
  { id: 'cc-5', country: 'Canada', countryCode: 'CA', cutoffTime: '17:00', timezone: 'EST', priority: 5, enabled: true },
  { id: 'cc-6', country: 'Australia', countryCode: 'AU', cutoffTime: '15:00', timezone: 'AEST', priority: 6, enabled: true },
  { id: 'cc-7', country: 'Japan', countryCode: 'JP', cutoffTime: '14:00', timezone: 'JST', priority: 7, enabled: true },
  { id: 'cc-8', country: 'Netherlands', countryCode: 'NL', cutoffTime: '16:00', timezone: 'CET', priority: 8, enabled: true },
  { id: 'cc-9', country: 'Spain', countryCode: 'ES', cutoffTime: '15:00', timezone: 'CET', priority: 9, enabled: true },
  { id: 'cc-10', country: 'Italy', countryCode: 'IT', cutoffTime: '15:00', timezone: 'CET', priority: 10, enabled: true },
];

// Allocation rules
export const allocationRules: AllocationRule[] = [
  { id: 'ar-1', name: 'Geographic Proximity', description: 'Prioritize warehouses closest to delivery address', order: 1 },
  { id: 'ar-2', name: 'Stock Availability', description: 'Ensure all items are in stock at selected warehouse', order: 2 },
  { id: 'ar-3', name: 'Cost Efficiency', description: 'Minimize shipping and handling costs', order: 3 },
  { id: 'ar-4', name: 'Delivery Speed', description: 'Optimize for fastest possible delivery', order: 4 },
  { id: 'ar-5', name: 'Customer Priority Level', description: 'Give preference based on customer tier', order: 5 },
];

// Shipping preferences
export const shippingPreferences: ShippingPreference[] = [
  { id: 'sp-1', country: 'United States', carrier: 'FedEx', costTier: 'Standard', enabled: true },
  { id: 'sp-2', country: 'United States', carrier: 'UPS', costTier: 'Express', enabled: true },
  { id: 'sp-3', country: 'United Kingdom', carrier: 'Royal Mail', costTier: 'Standard', enabled: true },
  { id: 'sp-4', country: 'United Kingdom', carrier: 'DHL', costTier: 'Premium', enabled: true },
  { id: 'sp-5', country: 'Germany', carrier: 'DHL', costTier: 'Standard', enabled: true },
  { id: 'sp-6', country: 'France', carrier: 'La Poste', costTier: 'Economy', enabled: true },
  { id: 'sp-7', country: 'Canada', carrier: 'Canada Post', costTier: 'Standard', enabled: true },
  { id: 'sp-8', country: 'Australia', carrier: 'Australia Post', costTier: 'Standard', enabled: true },
  { id: 'sp-9', country: 'Japan', carrier: 'Japan Post', costTier: 'Express', enabled: true },
  { id: 'sp-10', country: 'Netherlands', carrier: 'PostNL', costTier: 'Economy', enabled: true },
];

// Holiday dates
export const holidayDates: HolidayDate[] = [
  { id: 'hd-1', date: '2025-12-25', warehouse: 'All', type: 'Closed', description: 'Christmas Day' },
  { id: 'hd-2', date: '2025-12-26', warehouse: 'UK', type: 'Closed', description: 'Boxing Day' },
  { id: 'hd-3', date: '2025-01-01', warehouse: 'All', type: 'Closed', description: 'New Year\'s Day' },
  { id: 'hd-4', date: '2025-07-04', warehouse: 'US East', type: 'Closed', description: 'Independence Day' },
  { id: 'hd-5', date: '2025-07-04', warehouse: 'US West', type: 'Closed', description: 'Independence Day' },
  { id: 'hd-6', date: '2025-11-28', warehouse: 'US East', type: 'Reduced', description: 'Thanksgiving (50% capacity)' },
  { id: 'hd-7', date: '2025-11-28', warehouse: 'US West', type: 'Reduced', description: 'Thanksgiving (50% capacity)' },
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
  const eventTypes = ['Validated', 'Processing', 'Allocated', 'Complete'];
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
  const movementTypes = ['Inbound', 'Outbound', 'Transfer'];
  const sku = getRandomElement(sampleSKUs);
  const fromLocations = ['Receiving', 'US East', 'US West', 'EU Central', 'APAC', 'UK', 'Vendor'];
  const toLocations = ['US East', 'US West', 'EU Central', 'APAC', 'UK', 'Shipping', 'Returns'];
  
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
