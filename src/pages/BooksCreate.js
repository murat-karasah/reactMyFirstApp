import React from 'react';
import { Stack,TextField,PrimaryButton } from '@fluentui/react';
import axios from 'axios';

export default function BooksCreate() {
  const [pageData,setPageData]=React.useState(
    {
      "name": "",
      "author": " ",
      "imgUrl": "",
      "about": ""
    }
  )
  const onChangeText =(e)=>{
    console.log("OnchangeText",e.target.name,e.target.value)
    setPageData({...pageData,[e.target.name]:e.target.value})

  }
  function createBook(){
    axios.post("https://api-bookseller.herokuapp.com/books",pageData).then(response=>{
      if(response.status==201)
      {
        alert("Book Created Successfully")
      }
      else
      {
        alert("Error")
      }
    })
  }
  return (
    <div style={{padding:50}}>
    <div className='context'>
      <div className='context-header'>Books Create
     
      <Stack tokens={{childrenGap:20}} style={{root:{width:700,margin:10}}}>
        <TextField label='name' name='name' value ={pageData.name} onChange={onChangeText}  placeholder='Please enter name here'/>
        <TextField label='Author' name='author' value ={pageData.author} onChange={onChangeText} placeholder='Please enter author here'/>
        <TextField label='imgUrl' name='imgUrl' value ={pageData.imgUrl} onChange={onChangeText} placeholder='Please enter imgUrl here'/>
        <TextField label='about' name='about' value ={pageData.about} onChange={onChangeText} placeholder='Please enter about here'/>
        <PrimaryButton style={{width:"100px",height:"50px",marginTop:50}} text='Create Book'
          onClick={
            ()=>createBook()
          }
        />
      </Stack>

      </div>
    </div>
    </div>
  )
}
