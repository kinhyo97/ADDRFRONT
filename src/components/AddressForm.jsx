import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { REST_URL } from "../constants"

function AddressForm(props){
  const [open, setOpen] = useState(false)
  const openHandler = () => {
    setOpen(true)
  }

  const [address, setAddress] = useState({zip:'', addr:''})
  const changeHandler = e => {
    setAddress({...address, [e.target.name]:e.target.value})
  }

  const closeHandler = () => setOpen(false)
  /*
  const saveHandler = () => {  //방법1: '백엔드 호출'을 자신에서 정의한 경우
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
    props.onFetchAddresses()
  }else{
    alert('입력실패')
  }
})
.catch(err => console.error('입력실패 err:', err))

closeHandler()
  }*/

  const saveHandler = () => {
    props.onAddAddress(address)
    closeHandler()
  }

  return(<div>
    <Button onClick={openHandler}>입력</Button>
    <Dialog open={open}>
      <DialogTitle>새 주소</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField lable="우편번호" name="zip" autoFocus variant="standard" 
            onChange={changeHandler}/><br/>
          <TextField lable="주소" name="addr" variant="standard" 
            onChange={changeHandler}/><br/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>취소</Button>
        <Button onClick={saveHandler}>저장</Button>
      </DialogActions>
    </Dialog>
  </div>)
}
export default AddressForm