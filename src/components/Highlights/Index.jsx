import React from 'react'
import GetImage from './GetImage';
import AddHighlight from './AddHighlight';
const Index = ({data}) => {
  return (
    <div>
        <GetImage data={data} />
        <AddHighlight restaurantId={data} />
    </div>
  )
}

export default Index