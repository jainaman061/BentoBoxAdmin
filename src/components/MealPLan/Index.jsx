import React from 'react'
import MealPlanForm from './MealPlanForm'
import GetMealPlan from './GetMealPlan'
const Index = ({data}) => {

  return (
    <div>
      <GetMealPlan id={data}/>
      <MealPlanForm id={data} />
    </div>
  )
}

export default Index
