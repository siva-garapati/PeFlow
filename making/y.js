let block = `Jul 21, 2024
03:09 pm
CREDIT₹300Received from Vamsi Ptp 
Transaction ID T2407211509091340891634
UTR No. 456978237995
Credited to
XXXXXXXXXXX0311`

let lines = block.split('\n').map(l => l.trim()).filter(Boolean);

console.log(lines)