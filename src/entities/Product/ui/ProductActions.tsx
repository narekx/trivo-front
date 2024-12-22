import {Modal} from "antd";
import {Actions} from "@shared:ui";
import {useNavigate} from "react-router";
import {useDeleteProductApi} from "../api";
import {useNotifyError, useNotifySuccess} from "@helpers";
import {useMutation, useQueryClient} from "@tanstack/react-query";

interface ProductActionsProps {
  id: number;
}

export const ProductActions: React.FC<ProductActionsProps> = (props: ProductActionsProps): React.ReactNode => {
  const { id } = props;
  const navigate = useNavigate();
  const notifySuccess = useNotifySuccess();
  const notifyError = useNotifyError();

  const { confirm } = Modal;

  function showModal(): void {
    confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'Once deleted, the data cannot be recovered.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Cancel',
      onOk(): void {
        mutate({id: id});
      },
    });
  }

  const { deleteProduct } = useDeleteProductApi();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteProduct,
    onError: (error: AppErrorInterface): void => {
      notifyError(error.message);
    },
    onSuccess: (data: AppResponseInterface<[]>): void => {
      notifySuccess(data.message);
      queryClient.invalidateQueries({
        queryKey: ["ProductsListPage"]
      })
    },
  });

  return (
    <Actions
      onEdit={() => navigate(`/products/edit/${id}`)}
      onView={() => navigate(`/products/${id}`)}
      onDelete={() => showModal()}
    />
  );
}