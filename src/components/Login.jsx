import { Button, Stack, TextField , Snackbar } from "@mui/material"
import { useState } from "react"
import AddressList from "./AddressList"
import { REST_URL } from "../constants"
import axios from "axios"

function Login (props){
  const [user, setUser] = useState({username:'', password:''})
  const changeHandler = e =>{
    setUser({...user, [e.target.name]:e.target.value})
    // console.log('user',user)
  }
  const loginHandler =() =>{

// fetch(REST_URL+'login',{  
//   method: 'POST',
//   headers: {'Content-Type':'application/json'},
//   body:JSON.stringify(user)
// })
axios.post(REST_URL+'login', user) // axios jsobj json 변환 필요없음 ,Content-Type':'application/json도 기본값으로 되어있음

.then(resObj => {
  console.log(resObj)
  // const jwt = resObj.headers.get('Authorization')// fetch 방식일때
  const jwt = resObj.headers['authorization'] // axios 방식일때
  console.log(`jwt ${jwt}`)
  if(jwt != null){
    sessionStorage.setItem('jwt', jwt)
    props.onSetAuth(true)
  }else{
    setOpen(true)
  }
})
.catch(err => {
  console.error('에러', err)
  setOpen(true)
})
  }
  const [open, setOpen] =useState(false)

  if(props.onAuth){
    return <AddressList onUsername={user.username}/>
  }else{
    return (<div>
      <Stack spacing={2} mt={2} alignItems="center">
        <TextField label="아이디" name="username" autoFocus onChange={changeHandler}/>
        <TextField label="비밀번호" type="password" name="password" onChange={changeHandler}/>
        <Button color="primary" variant="outlined" onClick={loginHandler}>로그인</Button>
      </Stack>
      <Snackbar open={open} 
        autoHideDuration={1000}
        onClose={()=> setOpen(false)}
        message="로그인"/>
    </div>)
  }
}
export default Login