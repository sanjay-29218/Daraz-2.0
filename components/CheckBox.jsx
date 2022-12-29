import React, { useState } from 'react'



const CheckBox = (props) => {
    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
        setChecked(e.target.checked);
    }
  return (
    <div className='hidden md:block'>
        <input
                type="checkbox"
                name="store"
                id=""
                className="hidden md:block"
                onChange=''
              />
    </div>
  )
}

export default CheckBox