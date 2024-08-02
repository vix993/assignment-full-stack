import { Table } from "antd";
import { ColumnType } from "antd/lib/table";
import React from "react";
import { ProcurementRecord } from "./Api";
import ProcurementRecordPreviewModal from "./ProcurementRecordPreview";

type Props = {
  records: ProcurementRecord[];
};

function RecordsTable(props: Props) {
  const { records } = props;
  const [previewedRecord, setPreviewedRecord] = React.useState<
    ProcurementRecord | undefined
  >();

  const columns = React.useMemo<ColumnType<ProcurementRecord>[]>(() => {
    return [
      {
        title: "Published",
        render: (record: ProcurementRecord) =>
          new Date(record.publishDate).toLocaleDateString(),
      },
      {
        title: "Title",
        render: (record: ProcurementRecord) => {
          const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            setPreviewedRecord(record);
          };
          return (
            <a href="#" onClick={handleClick}>
              {record.title}
            </a>
          );
        },
      },
      {
        title: "Buyer name",
        render: (record: ProcurementRecord) => record.buyer.name,
      },
      {
        title: "Value",
        render: (record: ProcurementRecord) => {
          // format contract value
          // TODO: use currency attribute
          // limitation is legacy values in currency
          const value =
            !record.currency && !record.value
              ? "Not specified"
              : `${new Intl.NumberFormat("en-GB").format(record.value)}${
                  !!record.currency ? ` ${record.currency}` : ""
                }`;
          return value;
        },
      },
      {
        title: "Stage",
        render: (record: ProcurementRecord) => {
          // Handle logic for different procurement stage
          // TODO: potential for abstraction
          const renderStage = {
            TENDER() {
              const isOpen =
                record.closeDate === null ||
                new Date(record.closeDate!) > new Date();
              if (isOpen) {
                return `Open until ${record.closeDate}`;
              } else {
                return `Closed`;
              }
            },
            CONTRACT() {
              return `Awarded${
                record.awardDate ? ` on ${record.awardDate}` : ""
              }`;
            },
            TenderIntent() {
              return "";
            },
          };
          return record.stage ? renderStage[record.stage]?.() ?? "" : "";
        },
      },
    ];
  }, []);
  return (
    <>
      <Table
        rowKey={({ id }) => id}
        columns={columns}
        dataSource={records}
        pagination={false}
      />
      <ProcurementRecordPreviewModal
        record={previewedRecord}
        onClose={() => setPreviewedRecord(undefined)}
      />
    </>
  );
}

export default RecordsTable;
