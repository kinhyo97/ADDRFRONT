import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { REST_URL } from "../constants"
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Snackbar, Stack } from "@mui/material"
import AddressForm from "./AddressForm"
import axios from "axios"
import AddressEdit from "./AddressEdit"

function AddressList(props){
  //const [addresses, setAddresses] = useState([{zip:'00000', addr:'금천구', rdate:'2025', udate:'2025'}])
  const [addresses, setAddresses] = useState([])

  useEffect(() => fetchAddresses(), []) //렌더링될때 1회만 자동호출 됨
  const fetchAddresses = () => {
    const jwt = sessionStorage.getItem('jwt')

    fetch(REST_URL+'api/readdresses', {headers:{'Authorization':jwt}})
    .then(resObj => resObj.json())
    .then(jsObj => {
      //console.log('jsObj', jsObj)
      console.log('readdresses:', jsObj._embedded.readdresses)
      setAddresses(jsObj._embedded.readdresses)
    })
    .catch(err => console.error('err:', err))
  }

  const columns = [
    {field:'zip', headerName:'우편번호', width:250}, 
    {field:'addr', headerName:'주소', width:250},
    {field:'rdate', headerName:'등록날짜', width:250},
    {field:'udate', headerName:'수정날짜', width:250}, 
    {
      field:'_links.self.href', 
      headerName: '', 
      sortable: false,
      filterable: false,
      renderCell: row => <IconButton onClick={() => delAddress(row.id)}>
                            <DeleteIcon color='error'/>
                          </IconButton>
    },
    {
      field:'_links.readdress.href', //field명이 겹치지 않도록
      headerName: '', 
      sortable: false,
      filterable: false,
      //renderCell: row => <AddressEdit onData={row} onFetchAddresses={fetchAddresses}/> //for방법1
      renderCell: row => <AddressEdit onData={row} onEditAddress={editAddress}/> //for방법2

    }
  ]

  const [open, setOpen] = useState(false)
  const delAddress = (url) => {
    url = url.replace('http://', 'https://')
    if(window.confirm('정말 삭제할까요?')){
      const jwt = sessionStorage.getItem('jwt')

  fetch(url, {method:'DELETE', headers:{'Authorization':jwt}})
  .then(resObj => {
    //console.log('DELETE resObj', resObj)
    if(resObj.ok){
      fetchAddresses()
      setOpen(true)
    }else{
      alert('삭제실패! 뭔가가 잘못되었어요ㅠㅠ')
    }
  })
}
  }

  /*
  const addAddress = (address) => { //방법2-1: 백엔드 호출'을 부모에서 정의한 경우(fetch) 
    const jwt = sessionStorage.getItem('jwt')

fetch(REST_URL+'api/readdresses', {
  method: 'POST', 
  headers: {'Content-Type': 'application/json', 'Authorization':jwt},
  body: JSON.stringify(address)
})
.then(resObj => {
  //console.log('SAVE resObj:', resObj)
  if(resObj.ok){
    alert('입력성공')
    fetchAddresses()
  }else{
    alert('입력실패')
  }
})
.catch(err => console.error('입력실패 err:', err))
  }*/
  const addAddress = (address) => { //방법2-2: 백엔드 호출'을 부모에서 정의한 경우(axios)
    const jwt = sessionStorage.getItem('jwt')
    address.username = props.onUsername
    //axios.post(REST_URL+'api/readdresses', address, {headers:{'Authorization':jwt}})
    axios.post(REST_URL+'addrs', address, {headers:{'Authorization':jwt}})
    .then(() => fetchAddresses())
    .catch(err => console.error('입력실패 err:', err))
  }

  // const editAddress = (url, address) => { //방법2-1: 백엔드 호출'을 부모에서 정의한 경우(fetch) 
    // const jwt = sessionStorage.getItem('jwt')
/*
fetch(url, {
  method: 'PUT', 
  headers: {'Content-Type': 'application/json', 'Authorization':jwt},
  body: JSON.stringify(address) 
})
.then(resObj => {
  //console.log('EDIT resObj:', resObj)
  if(resObj.ok){
    alert('수정성공^^')
    fetchAddresses()
  }else{
    alert('수정실패^^')
  }
})
.catch(err => console.error('수정실패 err:', err))
  }
  */
  const editAddress = (url, address) => { //방법2-2: 백엔드 호출'을 부모에서 정의한 경우(axios) 
    url = url.replace('http://', 'https://')
    const jwt = sessionStorage.getItem('jwt')

    axios.put(url,address, {headers:{'Authorization':jwt}})
    .then(() => fetchAddresses())
    .catch(err => console.error('수정 실패 err:' , err))
  }
  return(<>
    <Stack mt={2} mb={2}>
      <AddressForm onFetchAddresses={fetchAddresses} onAddAddress={addAddress}/>
    </Stack> 
    <DataGrid rows={addresses} columns={columns} 
      getRowId={row=>row._links.self.href} disableRowSelectionOnClick={false} />
    <Snackbar
      autoHideDuration={1000}
      message="삭제성공"
      open={open}
      onClose={() => setOpen(false)} />
  </>)
}
export default AddressList