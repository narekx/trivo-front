import { Spin } from "antd";
import { Navigate } from "react-router";
import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {AuthUserInterface, useAuthUser, useGetAuthUserApi, useSetAuthUser} from "@entities";

import type { AppRouterMiddlewareType } from "../model";

export const guestMiddleware: AppRouterMiddlewareType = (Component: React.ComponentType): React.FC => (): React.ReactNode => {
  const { getAuthUser } = useGetAuthUserApi();
  const authUser = useAuthUser();
  const setAuthUser = useSetAuthUser();

  const { data, mutate, isPending, isIdle, isSuccess } = useMutation({
    mutationFn: getAuthUser,
    onSuccess: (data: AuthUserInterface | null): void => {
      setAuthUser(data);
    }
  });

  useEffect((): void => {
    mutate();
  }, []);

  if (isPending || isIdle) {
    return <Spin />;
  }

  if (data) {
    return (<Navigate to="/"/>);
  }

  return (<Component />);
};