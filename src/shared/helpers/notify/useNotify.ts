import { toast } from "react-toastify";
import type { Id, ToastContent, ToastOptions } from "react-toastify";

export type NotifyHookType = <T = unknown>(content: ToastContent<T>, options?: ToastOptions<T>) => Id;

export function useNotifyError(): NotifyHookType  {
  return <T = unknown>(content: ToastContent<T>, options?: ToastOptions<T>): Id => toast.error(content, options);
}

export function useNotifySuccess(): NotifyHookType  {
  return <T = unknown>(content: ToastContent<T>, options?: ToastOptions<T>): Id => toast.success(content, options);
}

export function useNotifyWarning(): NotifyHookType  {
  return <T = unknown>(content: ToastContent<T>, options?: ToastOptions<T>): Id => toast.warning(content, options);
}

export function useNotifyInfo(): NotifyHookType  {
  return <T = unknown>(content: ToastContent<T>, options?: ToastOptions<T>): Id => toast.info(content, options);
}