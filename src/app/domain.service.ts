import { Injectable } from '@angular/core';
import { Domain } from './models/domain.model';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  private domains: Domain[] = [
    { id: 1, name: 'loremvallis.com', createdOn: '2013-04-10', status: 'Active', serverLocation: 'Buenos Aires' },
    { id: 2, name: 'quisquamut.net', createdOn: '2014-05-08', status: 'Inactive', serverLocation: 'Australia' },
    { id: 3, name: 'convallissed.com', createdOn: '2015-11-05', status: 'Active', serverLocation: 'United Kingdom' },
    { id: 4, name: 'phasellissed.org', createdOn: '2016-06-09', status: 'Expired', serverLocation: 'Romania' },
    { id: 5, name: 'facilisleo.com', createdOn: '2017-12-08', status: 'Inactive', serverLocation: 'Germany' },
  ];

  getDomains(): Domain[] {
    return this.domains;
  }

  addDomain(domain: Domain): void {
    const maxId = this.domains.length > 0 ? Math.max(...this.domains.map(d => d.id)) : 0;
    domain.id = maxId + 1; // Auto-increment ID
    this.domains.push(domain);
  }

  deleteDomain(id: number): void {
    const initialLength = this.domains.length;
    this.domains = this.domains.filter(domain => domain.id !== id);
    if (this.domains.length === initialLength) {
      console.error(`Domain with id ${id} not found`);
    }
  }

  updateDomain(updatedDomain: Domain): void {
    const index = this.domains.findIndex(domain => domain.id === updatedDomain.id);
    if (index !== -1) {
      this.domains[index] = { ...updatedDomain };
    } else {
      console.error(`Domain with id ${updatedDomain.id} not found`);
    }
  }
}
