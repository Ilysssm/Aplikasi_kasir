// build.js - Static Single-File Bundler for Kasir POS SPA
// Eliminates ES module path resolution errors on GitHub Pages & zero-dependency environments

const fs = require('fs');
const path = require('path');

console.log('📦 Starting Kasir POS bundling process...');

const audioCode = fs.readFileSync('js/utils/audio.js', 'utf8')
  .replace(/export const sound = new SoundManager\(\);/, 'const sound = new SoundManager();');

const helpersCode = fs.readFileSync('js/utils/helpers.js', 'utf8')
  .replace(/export /g, '');

const modalCode = fs.readFileSync('js/utils/modal.js', 'utf8')
  .replace(/import { sound } from '\.\/audio\.js';/, '')
  .replace(/import { storage } from '\.\.\/storage\.js';/, '')
  .replace(/export const modal = new ModalManager\(\);/, 'const modal = new ModalManager();');

const storageCode = fs.readFileSync('js/storage.js', 'utf8')
  .replace(/export const storage = new StorageManager\(\);/, 'const storage = new StorageManager();');

const printCode = fs.readFileSync('js/utils/print.js', 'utf8')
  .replace(/import { formatRupiah, formatDateTime } from '\.\/helpers\.js';/, '')
  .replace(/import { storage } from '\.\.\/storage\.js';/, '')
  .replace(/export function printThermalReceipt/, 'function printThermalReceipt');

const receiptReaderCode = fs.readFileSync('js/modules/receiptReader.js', 'utf8')
  .replace(/import { storage } from '\.\.\/storage\.js';/, '')
  .replace(/import { formatRupiah, findBestMenuMatch } from '\.\.\/utils\/helpers\.js';/, '')
  .replace(/import { modal } from '\.\.\/utils\/modal\.js';/, '')
  .replace(/import { sound } from '\.\.\/utils\/audio\.js';/, '')
  .replace(/export class ReceiptReaderModule/, 'class ReceiptReaderModule');

const inventoryCode = fs.readFileSync('js/modules/inventory.js', 'utf8')
  .replace(/import { storage } from '\.\.\/storage\.js';/, '')
  .replace(/import { formatRupiah, formatNumber, generateId } from '\.\.\/utils\/helpers\.js';/, '')
  .replace(/import { modal } from '\.\.\/utils\/modal\.js';/, '')
  .replace(/import { sound } from '\.\.\/utils\/audio\.js';/, '')
  .replace(/export class InventoryModule/, 'class InventoryModule');

const menuCode = fs.readFileSync('js/modules/menu.js', 'utf8')
  .replace(/import { storage } from '\.\.\/storage\.js';/, '')
  .replace(/import { formatRupiah, formatNumber, generateId } from '\.\.\/utils\/helpers\.js';/, '')
  .replace(/import { modal } from '\.\.\/utils\/modal\.js';/, '')
  .replace(/import { sound } from '\.\.\/utils\/audio\.js';/, '')
  .replace(/export class MenuModule/, 'class MenuModule');

const cashierCode = fs.readFileSync('js/modules/cashier.js', 'utf8')
  .replace(/import { storage } from '\.\.\/storage\.js';/, '')
  .replace(/import { formatRupiah, formatNumber, generateId, generateOfflineOrderId, generateChecksum } from '\.\.\/utils\/helpers\.js';/, '')
  .replace(/import { modal } from '\.\.\/utils\/modal\.js';/, '')
  .replace(/import { sound } from '\.\.\/utils\/audio\.js';/, '')
  .replace(/import { printThermalReceipt } from '\.\.\/utils\/print\.js';/, '')
  .replace(/import { ReceiptReaderModule } from '\.\/receiptReader\.js';/, '')
  .replace(/export class CashierModule/, 'class CashierModule');

const reportsCode = fs.readFileSync('js/modules/reports.js', 'utf8')
  .replace(/import { storage } from '\.\.\/storage\.js';/, '')
  .replace(/import { formatRupiah, formatNumber, formatDateTime } from '\.\.\/utils\/helpers\.js';/, '')
  .replace(/import { modal } from '\.\.\/utils\/modal\.js';/, '')
  .replace(/import { sound } from '\.\.\/utils\/audio\.js';/, '')
  .replace(/import { printThermalReceipt } from '\.\.\/utils\/print\.js';/, '')
  .replace(/export class ReportsModule/, 'class ReportsModule');

const settingsCode = fs.readFileSync('js/modules/settings.js', 'utf8')
  .replace(/import { storage } from '\.\.\/storage\.js';/, '')
  .replace(/import { modal } from '\.\.\/utils\/modal\.js';/, '')
  .replace(/import { sound } from '\.\.\/utils\/audio\.js';/, '')
  .replace(/import { formatRupiah, formatNumber, formatDateTime, formatByteSize } from '\.\.\/utils\/helpers\.js';/, '')
  .replace(/export class SettingsModule/, 'class SettingsModule');

const appCode = fs.readFileSync('js/app.js', 'utf8')
  .replace(/import { InventoryModule } from '\.\/modules\/inventory\.js';/, '')
  .replace(/import { MenuModule } from '\.\/modules\/menu\.js';/, '')
  .replace(/import { CashierModule } from '\.\/modules\/cashier\.js';/, '')
  .replace(/import { ReportsModule } from '\.\/modules\/reports\.js';/, '')
  .replace(/import { SettingsModule } from '\.\/modules\/settings\.js';/, '')
  .replace(/import { sound } from '\.\/utils\/audio\.js';/, '')
  .replace(/import { modal } from '\.\/utils\/modal\.js';/, '');

const bundled = [
  '// Kasir POS - Single File Standalone Bundle for GitHub Pages & Offline Use',
  audioCode,
  helpersCode,
  modalCode,
  storageCode,
  printCode,
  receiptReaderCode,
  inventoryCode,
  menuCode,
  cashierCode,
  reportsCode,
  settingsCode,
  appCode
].join('\n\n');

fs.writeFileSync('bundle.js', bundled, 'utf8');
fs.writeFileSync('js/bundle.js', bundled, 'utf8');

console.log('✅ Bundle successfully created!');
console.log('   - bundle.js (' + (bundled.length / 1024).toFixed(2) + ' KB)');
console.log('   - js/bundle.js (' + (bundled.length / 1024).toFixed(2) + ' KB)');
