import {Spin} from "antd";
import {useEffect} from "react";
import { Navigate } from "react-router";
import {useMutation} from "@tanstack/react-query";
import type { AppRouterMiddlewareType } from "../model";
import {AuthUserInterface, useAuthUser, useGetAuthUserApi, useSetAuthUser} from "@entities";

export const authMiddleware: AppRouterMiddlewareType = (Component: React.ComponentType): React.FC => (): React.ReactNode => {
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

  if (!data) {
    return (<Navigate to="/login"/>);
  }

  return (<Component />);
};