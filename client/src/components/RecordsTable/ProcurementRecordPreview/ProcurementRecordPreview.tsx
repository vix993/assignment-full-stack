import { Modal } from "antd";
import { ProcurementRecord } from "../../../Api";

type Props = {
  record?: ProcurementRecord;
  onClose: () => void;
};

function ProcurementRecordPreviewModal({ record, onClose }: Props) {
  if (!record) return null;
  return (
    <Modal
      title={record.title}
      visible={!!record}
      onOk={onClose}
      onCancel={onClose}
      cancelButtonProps={{ style: { display: "none" } }}
      maskClosable
      width="30vw"
    >
      <p>
        <strong>{record.buyer.name}</strong>
      </p>
      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
        {record.description}
      </pre>
    </Modal>
  );
}

export default ProcurementRecordPreviewModal;
