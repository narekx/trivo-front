import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNotifyError, useNotifySuccess } from "@helpers";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { type RegisterResponseInterface, useRegisterApi } from "@entities";


export const RegisterFeature: React.FC = (): React.ReactNode => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const navigate = useNavigate();
  const notifyError = useNotifyError();
  const notifySuccess = useNotifySuccess();

  const { register } = useRegisterApi();

  const { mutate, isError, isPending } = useMutation({
    mutationFn: register,
    onError: (error: AppErrorInterface): void => {
      notifyError(error.message);
    },
    onSuccess: (success: AppResponseInterface<RegisterResponseInterface>): void  => {
      notifySuccess(success.message);
      navigate("/login");
    }
  });

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function onNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  function onPasswordConfirmationChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setPasswordConfirmation(e.target.value);
  }

  function onSubmit(): void {
    mutate({ email, password, name, passwordConfirmation });
  }

  return (
    <>
      <h2>Register</h2>
      <Form
        name="register"
        initialValues={{ remember: true }}
        style={{ maxWidth: 300 }}
        onFinish={onSubmit}
        disabled={isPending}
      >
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Name is required" },
            { max: 20, message: "Name cannot exceed 20 characters!" },
          ]}
        >
          <Input prefix={<UserOutlined/>} placeholder="Name" value={name} onChange={onNameChange} />
        </Form.Item>

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

        <Form.Item
          name="passwordConfirmation"
          rules={[
            { required: true, message: "Password confirmation is required" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("Passwords do not match!"));
              },
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined/>}
            placeholder="Password confirmation"
            value={passwordConfirmation}
            onChange={onPasswordConfirmationChange}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
      <Button type="link" block onClick={() => navigate("/login")}>
        Already have an account?
      </Button>
    </>
  );
};