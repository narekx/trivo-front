import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import {removeCookie, useNotifyError, useNotifySuccess} from "@helpers";
import {
  useLogoutApi,
  useRemoveAuthUser,
  type LogoutResponseInterface,
} from "@entities";

export const LogoutFeature: React.FC = (): React.ReactNode => {
  const navigate = useNavigate();
  const notifySuccess = useNotifySuccess();
  const notifyError = useNotifyError();

  const { logout } = useLogoutApi();

  const removeAuthUser = useRemoveAuthUser();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onError: (error: AppErrorInterface): void => {
      notifyError(error.message);
    },
    onSuccess: (success: AppResponseInterface<LogoutResponseInterface>): void  => {
      removeCookie("accessToken");
      removeAuthUser();
      notifySuccess(success.message);
      navigate("/login");
    }
  });

  function onSubmit(): void {
    mutate();
  }

  return (
    <Button type="link" style={{width: 'auto'}} block onClick={onSubmit} disabled={isPending}>
      Logout
    </Button>
  );
};