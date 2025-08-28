import React from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const TransactionScatterPlot = ({ data }) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const parseTime = (timeStr) => {
        // Example: "04:22 pm"
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if (modifier.toLowerCase() === 'pm' && hours !== 12) {
            hours += 12;
        } else if (modifier.toLowerCase() === 'am' && hours === 12) {
            hours = 0;
        }

        return { hours, minutes };
    };

    const chartData = (data || []).map((tx, index) => {
        const { hours, minutes } = parseTime(tx.time);
        const fullDate = new Date(tx.date);
        const day = fullDate.getDay(); // 0 (Sun) to 6 (Sat)

        return {
            id: index,
            hour: hours + minutes / 60, // fractional hour for better plotting
            day,
            ...tx,
        };
    });

    return (
        <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 30 }}>
                    {/* <CartesianGrid /> */}
                    <XAxis
                        type="number"
                        dataKey="hour"
                        domain={[0, 23]}
                        tickCount={24}
                        label={{ value: 'Hour of Day', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis
                        type="number"
                        dataKey="day"
                        domain={[0, 6]}
                        ticks={[0, 1, 2, 3, 4, 5, 6]}
                        tickFormatter={(val) => days[val]}
                        label={{ value: 'Day of Week', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const tx = payload[0].payload;
                                return (
                                    <div style={{ backgroundColor: '#fff', padding: 10, border: '1px solid #ccc' }}>
                                        <strong>{tx.action} {tx.name}</strong>
                                        <br />
                                        Type: {tx.type}
                                        <br />
                                        Amount: ₹{tx.amount}
                                        <br />
                                        Time: {tx.time}
                                        <br />
                                        Date: {tx.date}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Scatter name="Transactions" data={chartData} fill="#00bcd4" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionScatterPlot;