import {Button, Space} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";

interface ActionsPropsInterface {
  disabled?: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const Actions: React.FC<ActionsPropsInterface> = (props: ActionsPropsInterface): React.ReactNode => {
  const { disabled, onEdit, onDelete, onView } = props;

  return (
    <Space>
      {
        onView &&
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={onView}
          disabled={disabled}
        >
          View
        </Button>
      }
      {
        onEdit &&
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={onEdit}
          disabled={disabled}
        >
          Edit
        </Button>
      }
      {
        onDelete &&
        <Button
          type="link"
          icon={<DeleteOutlined />}
          danger
          onClick={onDelete}
          disabled={disabled}
        >
          Delete
        </Button>
      }
    </Space>
  );
}