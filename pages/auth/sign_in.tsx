import type { NextPage } from 'next'
import styles from '../../styles/SignIn.module.css'
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import {TypeLoginResponse} from "../../types";
import {api, setAccessToken} from "../../utils/api";
import {useRouter} from "next/router";
type TypeForm = {
  login: string;
  password: string;
}

const SignIn: NextPage = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm<TypeForm>({
    defaultValues: {
      login: '',
      password: ''
    }
  });
  const onSubmit = (data: TypeForm) => {
    api.post<TypeLoginResponse>('/users/login', {
      email: data.login,
      password: data.password
    })
      .then((res) => {
        if (res.status < 300) {
          setAccessToken(res.data.token.token)
          return router.push('/notes')
        }
      })
      .catch(err => {
        console.log(err)
      })
  };
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

        <FormControl variant="standard">
          <InputLabel htmlFor="login">Login</InputLabel>
          <Controller
            name="login"
            control={control}
            render={({ field }) =>
              <Input
                {...field}
                id="login"
                type={'text'}
              />
            }
          />
        </FormControl>

        <FormControl variant="standard">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) =>
              <Input
                {...field}
                id="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            }
          />
        </FormControl>

        <Button type={'submit'} variant="contained">Submit</Button>
      </form>
    </div>
  )
}

export default SignIn
