import React from 'react';
import { Button } from '../Button';
import { ControlledInput } from '../ControlledInput';
import { Container } from './styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'



type formData ={
  name : string;
  email: string;
  password: string;
  password_confirm: string; 
}



const schema = yup.object({
  name:yup.string().required('Informe um Nome!'),
  email: yup.string().email('E-mail invalido').required('Informe um E-mail Valido'),
  password: yup.string().min(6, 'A senha deve ter ao menos 6 digitos!').required('Informe a senha'),
  password_confirm: yup.string().oneOf([yup.ref('password'), null], 'A Senha de confirmação não confere.').required('confirme a senha')
})

export function Form() {
  const {control, handleSubmit, formState: {errors} } = useForm<formData>({
    resolver: yupResolver(schema)
  })

  function handleUserRegister(data: formData) {
    console.log(data)
  }
  return (
    <Container>
      <ControlledInput
        icon="user"
        placeholder="Nome"
        control={control}
        name='name'
        error={errors.name}
      />
      <ControlledInput
        icon="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        control={control}
        name='email'
        error={errors.email}
      />
      <ControlledInput
        icon="lock"
        placeholder="Senha"
        secureTextEntry
        control={control}
        name='password'
        error={errors.password}
      />
      <ControlledInput
        icon="lock"
        placeholder="Confirme a senha"
        secureTextEntry
        control={control}
        name='password_confirm'
        error={errors.password_confirm}
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}