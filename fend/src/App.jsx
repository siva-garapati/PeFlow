import React, { useState } from 'react'
import UploadForm from './components/UploadForm'
import './App.css'
import './styles/analytics.css'
import CDChart from './charts/CDChart'
import MonthlyChart from './charts/MonthlyChart'
import Analytics from './components/Analytics'
import ContactChart from './charts/ContactChart'
import Top5CDChart from './charts/Top5CDChart'
// import HeatmapChart from './charts/HeatMapChart'
import TransactionScatterPlot from './charts/TransactionScatterPlot'
import HeatMapChart from './charts/HeatMapChart'
import Stats from './components/Stats'
import TransactionsTable from './components/TransactionsTable'

const App = () => {

  const [data, setData] = useState('')

  let top5CD=(data, key)=>{
    return (
      data
      ?.filter((entry) => entry[key] > 0)
        .sort((a, b) => b[key] - a[key])
        .slice(0, 5)
        .map((entry, i) => ({
          id: i,
          value: entry[key],
          label: entry.name,
        })) || []
    );
  }

  return (
    <div className='main'>
      <UploadForm setData={setData} />

      {data && <>

        <div className='analytics-card transaction-stats'>
            <Stats data={data.stats}/>
        </div>
        {/* <div className='analytics-card'>
          <CDChart data={data.groupings.type} />
        </div> */}

        <div className='analytics-card'>
          <MonthlyChart data={data.groupings.month} />
        </div>

        <div className='analytics-card'>
          <ContactChart data={data.groupings.contact}/>
        </div>

        <div className='pie-cards'>
          <div className='analytics-card' style={{width:"46vw", margin:"10px 0px"}}>
            <div>
              <h3 style={{padding:"10px 40px 20px",textAlign:"left",fontSize:'24px'}}>Top 5 Creditors</h3>
              <Top5CDChart data={top5CD(data.groupings.contact, "credited")} />
            </div>
          </div>
          <div className='analytics-card' style={{ width: "46vw", margin: "10px 0px"}}>
            <div>
              <h3 style={{ padding: "10px 40px 20px", textAlign: "left", fontSize: '24px' }}>Top 5 Debitors</h3>
              <Top5CDChart data={top5CD(data.groupings.contact, "debited")} />
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <TransactionsTable data={data.groupings.contact}/>
        </div>

        {/* <div className='analytics-card'>
          <TransactionScatterPlot data={data.transactions}/>
        </div> */}

        {/* <div className='analytics-card'>
          <HeatMapChart data={data.transactions}/>
        </div> */}
      </>}
    </div>
  )
}

export default App