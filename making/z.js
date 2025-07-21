let fs=require('fs')

let text = fs.readFileSync('php.txt', 'utf-8')

// console.log(text)

const pattern = /[A-Z][a-z]{2} \d{1,2}, \d{4}[\s\S]*?(?:Paid by|Credited to)\s+\w+/g;

const matches = [...text.matchAll(pattern)];

console.log("🧾 Total matched blocks:", matches.length);

const transactions = matches.map(m => parseTransactionBlock(m[0]));

// matches.forEach((m, i) => {
//     console.log(`\n🧾 Transaction ${i + 1}:\n${m[0]}`);
// });

console.log(parseTransactionBlock(matches[329][0]))

// Convert to CSV
const headers = ['date', 'time', 'type', 'amount', 'action', 'name'];
const csv = [
    headers.join(','), // header line
    ...transactions.map(tx =>
        headers.map(h => `"${(tx[h] || '').replace(/"/g, '""')}"`).join(',')
    )
].join('\n');

// Write to CSV file
// fs.writeFileSync('transactions.csv', csv, 'utf-8');

function parseTransactionBlock(block) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    const date = lines[0] || '';
    const time = lines[1] || '';
    const merged = lines.slice(2).join(' ');

    // This pattern matches everything properly in one go
    const match = merged.match(
        /^(DEBIT|CREDIT)₹([\d,\.]+)\s*([A-Za-z]+(?:\s+[A-Za-z]+)?)\s*(.*?)\s*Transaction ID/
    );

    return {
        date,
        time,
        type: match?.[1] || '',
        amount: match?.[2]?.replace(/,/g, '') || '',
        action: match?.[3] || '',
        name: match?.[4]?.trim() || ''
    };
}
  