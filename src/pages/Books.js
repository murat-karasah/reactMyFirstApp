import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {DetailsList,SelectionMode,Stack,PrimaryButton} from "@fluentui/react"
const columnProps={
  tokens:{childrenGap:20},
  styles:{root:{width:100}},
}
export default function Books() {
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
      key:"about",
      name:"ABOUT",
      fieldName:"about",
      minWidth: 900,
      maxWidth: 950,
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
          <PrimaryButton text='Add +' onClick={()=>{addToCart(item)}}/>
          <PrimaryButton text='Edit' onClick={()=>{alert("Düzenlendi")}}/>
          <PrimaryButton text='Delete' onClick={async ()=> await deleteBook(item.id)}/>
        </Stack>
      )
    }
  ]

  function addToCart(cartItem){
    axios.post("https://api-bookseller.herokuapp.com/carts",cartItem).then(response=>{console.log(response.data)});
  }
  async function deleteBook(bookID){
    await axios.delete(`https://api-bookseller.herokuapp.com/books/${bookID}`).then(response=>{console.log(response.data)});
    getBook();
  }
function getBook()
{
  axios.get("https://api-bookseller.herokuapp.com/books").then(response=>setBooks(response.data));
}
  const [books,setBooks] = useState([]);
 /*  useEffect(()=>{
    fetch("https://api-bookseller.herokuapp.com/books").then(response => response.json()).then(res => console.table(res));
  }) */
  useEffect(()=>{
 getBook();
  });
  return (
    <div>
<div className='content'>
  <div className='content-header'>Books</div>
  <DetailsList items={books} columns={columns} selectionMode={SelectionMode.none}/>
</div>
 </div>
  )
}
