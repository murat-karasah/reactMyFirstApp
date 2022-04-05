import { DetailsList,Stack,PrimaryButton,SelectionMode } from '@fluentui/react';
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import ToolBar from '../component/ToolBar';
const columnProps={
  tokens:{childrenGap:20},
  styles:{root:{width:100}},
}
export default function Carts() {
  const columns = 
  [
    {
      key:"id",
      name:"ID",
      fieldName:"id",
      minWidth: 10,
      maxWidth: 50,
      isRowHeader: true
    },
    {
      key:"imgUrl",
      name:"IMAGE",
      fieldName:"imgUrl",
      minWidth: 200,
      maxWidth: 250,
      isRowHeader: true,
      onRender:(item)=>(
        <img 
        src={item.imgUrl} 
        style={{width:"200px",height:"250px"}} 
        alt={`${item.name} - ${item.author}`}/>
      )
    },
    {
      key:"author",
      name:"AUTHOR",
      fieldName:"author",
      minWidth: 100,
      maxWidth: 200,
      isRowHeader: true
    },
    {
      key:"name",
      name:"NAME",
      fieldName:"name",
      minWidth: 100,
      maxWidth: 150,
      isRowHeader: true
    },
    {
      key:"about",
      name:"ABOUT",
      fieldName:"about",
      minWidth: 300,
      maxWidth: 500,
      isRowHeader: true
    },
    {
      key:"process",
      name:"Actions",
      fieldName:"process",
      minWidth:100,
      maxWidth:150,
      isRowHeader:true,
      onRender:(item)=>(
        <Stack horizontal {...columnProps}>
          <PrimaryButton text='Delete' onClick={()=>{deleteCart(item.id)}}/>
        </Stack>
      )
    }
  ]
  async function deleteCart(cartID){
  const response = await axios.delete(`https://api-bookseller.herokuapp.com/carts/${cartID}`);
  if(response.status == 200){
    alert("Kart silindi");
  }
    getCart();
  }
  function getCart()
  {
    axios.get("https://api-bookseller.herokuapp.com/carts").then(response=>setCarts(response.data));
  }
  const [carts,setCarts] = useState([]);
  useEffect(()=>{
  getCart();
  },[])
  return (
<div>
  
  <div className='content'>
    <div className='content-header'>{carts.length>0? "Carts" : "Cart is Empty"}</div>
    {carts.length > 0 &&<DetailsList items={carts} columns={columns} selectionMode = {SelectionMode.none}/>}
  </div>
</div>
  )
}
