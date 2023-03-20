import Transaction from "./component/Transaction";
import FormComponent from './component/FormComponent';
import DataContext from "./data/DataContext";
import { useEffect, useState } from "react";
import ReportComponent from "./component/ReportComponent";
import './App.css'

function App(){
  const design = {color:"red",textAlign:"center",fontSize:'1.5rem'}

  
  const [items,setItems] = useState([])

  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  const onAddNewItem =(newItem)=>{
    setItems((prevItem)=>{
      return[newItem,...prevItem]
    })
}
useEffect(()=>{
  const amounts = items.map(items=>items.amount)
  const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
  const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1

  setReportIncome(income)
  setReportExpense(expense)
},[items,reportIncome,reportExpense])
{
  return (
    <DataContext.Provider value={
    {
       income : reportIncome,
        expense  : reportExpense
        }
    }>
      <div className="container">
        <h1 style={design}>รายรับ - รายจ่ายทั้งหมด</h1>
      <ReportComponent/>
     <FormComponent onAddItem={onAddNewItem}/>
        <Transaction items={items}/>
      </div>
   </DataContext.Provider>
   
  );
}}
export default App;