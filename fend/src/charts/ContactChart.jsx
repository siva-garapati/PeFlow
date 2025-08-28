import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ContactChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="credited" stackId="a" strokeWidth={3} fill="#8884d8" />
                <Bar dataKey="debited" stackId="a" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ContactChart;
