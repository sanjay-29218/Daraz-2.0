import React from 'react'


const CheckOutWizard = ({activeStep=0}) => {
  return (
    <div className='flex py-4 '>
        {['User Login','Shipping Address','Payment Method','Place Order'].map((step,index)=>(
            <div key={step} className={`flex-1 border-b-2 p-3 
            ${
                index<=activeStep ? 'border-[#F57224]':'border-[#F5F5F5]'
            }`
            }>
                {step}
            </div>
        ))}
    </div>
  )
}

export default CheckOutWizard