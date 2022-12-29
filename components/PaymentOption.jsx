import React from 'react';
import Select from 'react-select';
const IconOption = (props) => (

    <Option {... props}>
      <div>
        <img src={props.data.image} />
      </div>
    </Option>
  );
  
const PaymentOption = () => {
    return (
        <Select
          classNamePrefix="react-select"
          placeholder={"Search..."}
          onChange={this.handleChange}
          components={{ DropdownIndicator: () => null, Option: IconOption }}
          options={this.state.options}
          openMenuOnClick={false}
          styles={customStyle}
        />
      );
}
export default PaymentOption;