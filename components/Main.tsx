import React from 'react'
import DarazMall from './DarazMall';
import FlashSale from './FlashSale';
import JustForYout from './JustForYout';
import Categories from './Categories';
type Props = {}

const Main = (props: Props) => {
  return (
    <div>
        {/* Flash sale */}
        <FlashSale/>
        {/* Categories */}
        <Categories value={false} />
        {/* just for you */}
        <JustForYout/>
    </div>
  )
}
export default  Main;