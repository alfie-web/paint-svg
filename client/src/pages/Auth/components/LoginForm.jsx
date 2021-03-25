import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { observer } from 'mobx-react-lite'

import Button from '../../../components/Button'
import usersState from '../../../store/usersState'

const schema = yup.object().shape({
   email: yup.string().required().email(),
   password: yup.string().required().min(3),
})

const LoginForm = () => {
   const { register, handleSubmit, errors } = useForm({
      resolver: yupResolver(schema),
   })

   const onSubmit = (data) => {
      console.log(data)
      usersState.login(data)
   }

   return (
      <div className="Auth__form">
         <h2>Вход</h2>

         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="Input">
               <input
                  name="email"
                  placeholder="Электропочта"
                  defaultValue=""
                  ref={register({ required: true, maxLength: 20 })}
               />
               <div className="Input__error">
                  {errors.email && 'Поле обязательно'}
               </div>
            </div>

            <div className="Input">
               <input
                  name="password"
                  placeholder="Пароль"
                  defaultValue=""
                  type="password"
                  ref={register({
                     required: true,
                     maxLength: 20,
                     minLength: 3,
                  })}
               />
               <div className="Input__error">
                  {errors.password && 'Поле обязательно'}
               </div>
            </div>

            <Button
               type="submit"
               text="Войти"
               variant="red"
               disabled={usersState.isFetching}
            />
         </form>
      </div>
   )
}

export default observer(LoginForm)
