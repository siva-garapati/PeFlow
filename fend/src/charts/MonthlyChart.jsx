import React from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const MonthlyCharts = ({ data }) => {
    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                >
                    <defs>
                        <linearGradient id="creditColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2ecf34ff" stopOpacity={0.8} /> {/* Green */}
                            <stop offset="95%" stopColor="#2ecf34ff" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="debitColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f44336" stopOpacity={0.8} /> {/* Red */}
                            <stop offset="95%" stopColor="#f44336" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis
                        dataKey="month"
                    />

                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Area
                        type="monotone"
                        dataKey="credited"
                        stroke="#4caf50"
                        fill="url(#creditColor)"
                        fillOpacity={1}
                        strokeWidth={2.5}
                        
                    />
                    <Area
                        type="monotone"
                        dataKey="debited"
                        stroke="#f44336"
                        fill="url(#debitColor)"
                        fillOpacity={1}
                        strokeWidth={2.5}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </>
    )
}

export default MonthlyCharts