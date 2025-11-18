import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import { useState } from "react"
import { REST_URL } from "../constants"

function AddressEdit(props){
  const [address, setAddress] = useState({zip:'', addr:''})

  const [open, setOpen] = useState(false)
  const openHandler = () => {
    //console.log('props.onData: ', props.onData)
    setAddress({zip:props.onData.row.zip, addr:props.onData.row.addr})
    setOpen(true)
  }
  const closeHandler = () => { setOpen(false) }

  const changeHandler = e => {
    setAddress({...address, [e.target.name]:e.target.value})
    //console.log(address.zip: ${address.zip}, address.addr: ${address.addr})
  }

  /*
  const editHandler = () => { //방법1: '백엔드 호출'을 자신에서 정의한 경우
    const jwt = sessionStorage.getItem('jwt')

fetch(props.onData.id, {
  method: 'PUT', 
  headers: {'Content-Type': 'application/json', 'Authorization':jwt},
  body: JSON.stringify(address) 
})
.then(resObj => {
  //console.log('EDIT resObj:', resObj)
  if(resObj.ok){
    alert('수정성공')
    props.onFetchAddresses()
  }else{
    alert('수정실패')
  }
})
.catch(err => console.error('수정실패 err:', err))

closeHandler()
  }
  */
  const editHandler = () => {
    props.onEditAddress(props.onData.id, address)
    closeHandler()
  }

  return(<>
    {/* <Button onClick={openHandler}>편집</Button> */}
    <IconButton onClick={openHandler}>
      <EditIcon color='primary'/>
    </IconButton>
    <Dialog open={open}>
      <DialogTitle>주소 수정</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField lable="우편번호" name="zip" autoFocus variant="standard" 
            value={address.zip} onChange={changeHandler}/><br/>
          <TextField lable="주소" name="addr" variant="standard" 
            value={address.addr} onChange={changeHandler}/><br/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>취소</Button>
        <Button onClick={editHandler}>저장</Button>
      </DialogActions>
    </Dialog>
  </>)
}
export default AddressEdit