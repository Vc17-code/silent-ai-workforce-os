import { generateRegistrationKey, listKeys } from './services/registrationKeys.js';

const note = process.argv.slice(2).join(' ').trim() || undefined;
const key = generateRegistrationKey(note);

console.log('\nRegistration key generated (one-time use):\n');
console.log(`  ${key}`);
if (note) console.log(`  Note: ${note}`);
console.log('\nShare this key with the customer. It can only be used once.\n');

const keys = listKeys();
const unused = keys.filter((k) => !k.used_by_user_id).length;
console.log(`Total keys: ${keys.length} (${unused} unused)\n`);
