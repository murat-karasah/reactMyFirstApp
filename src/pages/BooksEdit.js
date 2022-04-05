import React, { useEffect } from 'react';
import { Stack,TextField,PrimaryButton } from '@fluentui/react';
import axios from 'axios';




export default function BooksEdit() {
  const [pageData,setPageData]=React.useState(
    {
      "name": "",
      "author": " ",
      "imgUrl": "",
      "about": ""
    })
    const onChangeText =(e)=>{
      console.log("OnchangeText",e.target.name,e.target.value)
      setPageData({...pageData,[e.target.name]:e.target.value})
    }
    function editBook(){
      console.log("EditBook")
    }
    function fetchBookById(){
      axios.get("https://api-bookseller.herokuapp.com/books/1").then(response=>setPageData(response.data))
    }
    useEffect(()=>{
      fetchBookById()
    },[])  
  return (
   
    
    <div style={{padding:50}}>
    <div className='context'>
      <div className='context-header'>Books Edit
     
      <Stack tokens={{childrenGap:20}} style={{root:{width:700,margin:10}}}>
        <TextField label='name' name='name' value ={pageData.name} onChange={onChangeText}  placeholder='Please enter name here'/>
        <TextField label='Author' name='author' value ={pageData.author} onChange={onChangeText} placeholder='Please enter author here'/>
        <TextField label='imgUrl' name='imgUrl' value ={pageData.imgUrl} onChange={onChangeText} placeholder='Please enter imgUrl here'/>
        <TextField label='about' name='about' value ={pageData.about} onChange={onChangeText} placeholder='Please enter about here'/>
        <PrimaryButton style={{width:"100px",height:"50px",marginTop:50}} text='Create Book'
          onClick={
            ()=>editBook()
          }
        />
      </Stack>

      </div>
    </div>
    </div>  )
}
