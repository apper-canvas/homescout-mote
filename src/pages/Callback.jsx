import React, { useEffect } from 'react'

const Callback = () => {
  useEffect(() => {
    const { ApperUI } = window.ApperSDK;
    ApperUI.showSSOVerify("#authentication-callback");
  }, []);
  
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center">
      <div id="authentication-callback" className="w-full max-w-md"></div>
    </div>
  )
}

export default Callback