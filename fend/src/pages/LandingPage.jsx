import React, { useState } from 'react'
import UploadForm from '../components/UploadForm'
import HowItWorks from '../components/HowItWorks'
import Privacy from '../components/Privacy'

const LandingPage = ({ setData }) => {

  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? <div>
        Loading...
      </div> : <>
        <UploadForm setData={setData} setLoading={setLoading}/>
        <HowItWorks />
        <Privacy />
      </>}

    </>
  )
}

export default LandingPage