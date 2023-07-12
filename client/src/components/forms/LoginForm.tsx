import { useLoginMutation } from '@/queries';
import { loginSchema, LoginType } from '@/schema/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Input from '../atom/Input';
import Button from '../atom/Button';
import LoadingSpinner from '../atom/LoadingSpinner';
import useToast from '@/hooks/useToast';

const LoginForm = () => {
  const toast = useToast();
  const loginMutation = useLoginMutation();
  const loginForm = useForm<LoginType>({ resolver: zodResolver(loginSchema) });
  const onSubmit: SubmitHandler<LoginType> = (data) => {
    loginMutation.mutateAsync(data).catch((error) => {
      console.log('요건 온서브밋', error);
    });
  };
  const onClick = () => {
    const password = loginForm.getValues('password');
    const username = loginForm.getValues('username');
    const data = { password, username };
    if (!loginSchema.safeParse(data).success) {
      toast({ content: '이메일 혹은 비밀번호를 다시 확인해주세요', type: 'warning' });
    }
  };

  return (
    <form className=" flex w-[460px] flex-col gap-y-7" onSubmit={loginForm.handleSubmit(onSubmit)}>
      <Input placeholder="이메일을 입력해 주세요." {...loginForm.register('username')} />
      <Input
        placeholder="비밀번호를 입력해 주세요."
        type={'password'}
        {...loginForm.register('password')}
      />
      <Button
        variant={'primary'}
        className=" flex gap-4"
        type="submit"
        size="lg"
        onClick={() => onClick()}
      >
        {loginMutation.status === 'loading' ? <LoadingSpinner /> : null}
        <span>login</span>
      </Button>
    </form>
  );
};

export default LoginForm;
