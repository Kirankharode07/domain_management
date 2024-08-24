import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomainService } from '../domain.service'; // Import the service

interface Domain {
  id: number;
  name: string;
  createdOn: string;
  status: string;
  serverLocation: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchText: string = '';
  domains: Domain[] = [];
  filterStatus: string = 'All';

  constructor(private router: Router, private domainService: DomainService) { } // Inject the service

  ngOnInit() {
    this.domains = this.domainService.getDomains(); // Get the domains from the service
  }

  getFilteredDomains() {
    return this.domains.filter(domain =>
      (this.filterStatus === 'All' || domain.status === this.filterStatus) &&
      (domain.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      domain.status.toLowerCase().includes(this.searchText.toLowerCase()) ||
      domain.serverLocation.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

  onAddDomain() {
    this.router.navigate(['/add-domain']);
  }

  onEditDomain(id: number) {
    this.router.navigate(['/manage-domain', id]);
  }

  onDeleteDomain(id: number) {
    this.domainService.deleteDomain(id); // Use the service to delete the domain
    this.domains = this.domainService.getDomains(); // Refresh the domains list
  }

  filterDomains(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterStatus = input.value;
  }
}
