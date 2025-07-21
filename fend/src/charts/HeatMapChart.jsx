import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
// import "./HeatMapStyles.css"; // Custom styles

const HeatMapChart = ({ data: transactions }) => {
    const [selectedYear, setSelectedYear] = useState(() => {
        const dates = transactions.map((tx) => new Date(tx.date));
        const latestYear = Math.max(...dates.map((d) => d.getFullYear()));
        return latestYear;
    });

    // Prepare year list for dropdown
    const years = Array.from(
        new Set(transactions.map((tx) => new Date(tx.date).getFullYear()))
    ).sort((a, b) => b - a);

    // Prepare heatmap data for selected year
    // Build transaction counts per day only for the selected year
    const countsByDate = {};
    transactions.forEach((tx) => {
        const txDate = new Date(tx.date);
        const year = txDate.getFullYear();
        if (year === selectedYear) {
            const iso = txDate.toISOString().split("T")[0];
            if (countsByDate[iso]) {
                countsByDate[iso]++;
            } else {
                countsByDate[iso] = 1;
            }
        }
    });


    const heatmapData = [];
    const startDate = new Date(`${selectedYear}-01-01`);
    const endDate = new Date(`${selectedYear}-12-31`);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const iso = d.toISOString().split("T")[0];
        heatmapData.push({
            date: iso,
            count: countsByDate[iso] || 0,
        });
    }


    return (
        <div>
            <h2 className="text-xl mb-2">📅 Yearly Transaction Activity</h2>
            <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="mb-4 p-1 rounded border"
            >
                {years.map((y) => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>

            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={heatmapData}
                classForValue={(value) => {
                    if (!value) return "color-empty";
                    if (value.count === 0) return "color-empty";
                    if (value.count < 2) return "color-scale-1";
                    if (value.count < 4) return "color-scale-2";
                    return "color-scale-3";
                }}
                showWeekdayLabels={false}
                gutterSize={3}
                tooltipDataAttrs={(value) => ({
                    "data-tooltip-id": "calendar-tooltip",
                    "data-tooltip-content": `${value.date}: ${value.count} transactions`,
                })}
            />
            <Tooltip id="calendar-tooltip" />
        </div>
    );
};

export default HeatMapChart;
