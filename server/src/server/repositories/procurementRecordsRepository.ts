import { ProcurementRecord } from "../db/ProcurementRecord";
import { RecordSearchFilters } from "../models";
import sequelize from "../sequelize";

/**
 * Queries the database for procurement records according to the search filters.
 */
async function searchRecords(
  { textSearch, buyerId }: RecordSearchFilters,
  offset: number,
  limit: number
): Promise<ProcurementRecord[]> {
  let query = "SELECT * FROM procurement_records";
  let replacements: any = { offset, limit };

  // TODO: use sequelize
  if (textSearch) {
    query += " WHERE (title LIKE :textSearch OR description LIKE :textSearch)";
    replacements.textSearch = `%${textSearch}%`;
  }

  if (buyerId) {
    query += `${textSearch ? " AND" : " WHERE"} buyer_id = :buyerId`;
    replacements.buyerId = buyerId;
  }

  query += " LIMIT :limit OFFSET :offset";

  return await sequelize.query(query, {
    model: ProcurementRecord,
    replacements: replacements,
  });
}

export default { searchRecords };
