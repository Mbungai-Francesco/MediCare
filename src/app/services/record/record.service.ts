import { Injectable } from '@angular/core';
import { Record } from 'src/app/types';


@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private storageKey = 'records';

  constructor() {}

  /** ✅ Get all records from local storage */
  getRecords(): Record[] {
    const records = localStorage.getItem(this.storageKey);
    return records ? JSON.parse(records) : [];
  }

  /** ✅ Add a new record */
  addRecord(record: Record): void {
    const records = this.getRecords();
    records.push(record);
    localStorage.setItem(this.storageKey, JSON.stringify(records));
  }

  /** ✅ Update an existing record */
  updateRecord(phoneNumber: number, updatedRecord: Record): boolean {
    const records = this.getRecords();
    const index = records.findIndex(r => r.phoneNumber === phoneNumber);

    if (index !== -1) {
      records[index] = updatedRecord;
      localStorage.setItem(this.storageKey, JSON.stringify(records));
      return true;
    }
    return false;
  }

  /** ✅ Delete a record by phone number */
  deleteRecord(phoneNumber: number): boolean {
    const records = this.getRecords();
    const filteredRecords = records.filter(r => r.phoneNumber !== phoneNumber);

    if (records.length !== filteredRecords.length) {
      localStorage.setItem(this.storageKey, JSON.stringify(filteredRecords));
      return true;
    }
    return false;
  }
}
