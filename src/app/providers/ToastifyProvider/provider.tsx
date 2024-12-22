import { ToastContainer } from "react-toastify";

import type {ReactNode} from "react";

export function provide(app: ReactNode): ReactNode {
  return (<>{app}<ToastContainer /></>);
}