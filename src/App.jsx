import './App.css'
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import Login from './components/Login'
import { useState } from 'react'

function App(){
  const [auth, setAuth] = useState(false)
  const logoutHandler = () => {
    sessionStorage.removeItem('jwt')
    setAuth(false)
  }
  return(<div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant='h6'>
          주소록
        </Typography>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{width:'90%'}}>
          {
            auth? <Button color="write" onClick={logoutHandler}>로그아웃</Button> : <Button color="write">로그인</Button>
          }
        </Stack>
      </Toolbar>

    </AppBar>
    <Login onAuth={auth} onSetAuth={setAuth}/>

  </div>)
}

export default App