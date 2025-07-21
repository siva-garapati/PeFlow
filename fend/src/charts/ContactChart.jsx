import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ContactChart = ({ data }) => {
    return (
        <>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="credited" stackId="a" strokeWidth={3} fill="#8884d8" />
                    <Bar dataKey="debited" stackId="a" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default ContactChart