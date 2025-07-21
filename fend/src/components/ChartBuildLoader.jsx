
const ChartBuildLoader = () => {
    return (
        <div className="chart-build-loader">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="block" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
        </div>
    );
};

export default ChartBuildLoader;