import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {setCookie, useNotifyError, useNotifySuccess} from "@helpers";
import { LoginResponseInterface, useLoginApi, useSetAuthUser} from "@entities";



export const LoginFeature: React.FC = (): React.ReactNode => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const notifySuccess = useNotifySuccess();
  const notifyError = useNotifyError();

  const { login } = useLoginApi();

  const setAuthUser = useSetAuthUser();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onError: (error: AppErrorInterface): void => {
      notifyError(error.message);
    },
    onSuccess: (success: AppResponseInterface<LoginResponseInterface>)  => {
      setCookie("accessToken", success.data.token, 7);
      setAuthUser(success.data.user);
      notifySuccess(success.message);
      navigate("/");
    }
  });

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function onSubmit(): void {
    mutate({ email, password });
  }

  return (
    <>
      <h2>Login</h2>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 300 }}
        onFinish={onSubmit}
        disabled={isPending}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email address" },
          ]}
        >
          <Input prefix={<UserOutlined/>} placeholder="Email" value={email} onChange={onEmailChange} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password prefix={<LockOutlined/>} placeholder="Password" value={password} onChange={onPasswordChange} />
        </Form.Item>

        {/*<Form.Item name="remember" valuePropName="checked" style={{ textAlign: "left" }}>*/}
        {/*  <Checkbox>Remember me</Checkbox>*/}
        {/*</Form.Item>*/}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Log in
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" block onClick={() => navigate("/register")}>
        Don't have an account?
      </Button>
    </>
  );
};