import { Buyer } from "../db/Buyer";
import { ProcurementRecord } from "../db/ProcurementRecord";
import { ProcurementRecordDto } from "../models/api_types";
import buyersRepository from "../repositories/buyersRepository";

/**
 * Converts a DB-style ProcurementRecord object to an API type.
 * Assumes that all related objects (buyers) are prefetched upfront and passed in the `buyersById` map
 */
function serializeProcurementRecord(
  record: ProcurementRecord,
  buyersById: Map<string, Buyer>
): ProcurementRecordDto {
  const buyer = buyersById.get(record.buyer_id);
  if (!buyer) {
    throw new Error(
      `Buyer ${record.buyer_id} was not pre-fetched when loading record ${record.id}.`
    );
  }

  return {
    id: record.id,
    title: record.title,
    description: record.description,
    publishDate: record.publish_date,
    value: record.value,
    stage: record.stage,
    currency: record.currency,
    closeDate: record.close_date,
    awardDate: record.award_date,
    buyer: {
      id: buyer.id,
      name: buyer.name,
    },
  };
}

/**
 * Converts an array of DB-style procurement record object into API types.
 * Prefetches all the required relations.
 */
async function serializeProcurementRecords(
  records: ProcurementRecord[]
): Promise<ProcurementRecordDto[]> {
  // Fetch the buyer data in one query
  const buyers = await buyersRepository.getUniqueBuyerIds(records);

  const buyersById = new Map(buyers.map((b) => [b.id, b]));
  return records.map((r) => serializeProcurementRecord(r, buyersById));
}

export default { serializeProcurementRecord, serializeProcurementRecords };
