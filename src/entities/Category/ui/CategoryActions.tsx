import {Modal} from "antd";
import {Actions} from "@shared:ui";
import {useNavigate} from "react-router";
import {useDeleteCategoryApi} from "../api";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNotifyError, useNotifySuccess} from "@helpers";

interface CategoryActionsProps {
  id: number;
}

export const CategoryActions: React.FC<CategoryActionsProps> = (props: CategoryActionsProps): React.ReactNode => {
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

  const { deleteCategory } = useDeleteCategoryApi();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onError: (error: AppErrorInterface): void => {
      notifyError(error.message);
    },
    onSuccess: (data: AppResponseInterface<[]>): void => {
      notifySuccess(data.message);
      queryClient.invalidateQueries({
        queryKey: ["CategoriesListPage"]
      })
    },
  });

  return (
    <Actions
      onEdit={() => navigate(`/categories/edit/${id}`)}
      onView={() => navigate(`/categories/${id}`)}
      onDelete={() => showModal()}
    />
  );
}