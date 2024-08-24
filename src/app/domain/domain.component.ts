import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomainService } from '../domain.service'; // Import the service

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent {
  domain = {
    name: '',
    createdOn: '',
    status: 'Active',
    serverLocation: ''
  };

  constructor(private router: Router, private domainService: DomainService) { } // Inject the service

  onAddDomain() {
    if (this.validateDomain(this.domain)) {
      // Create a new domain object with a placeholder id (which will be set in the service)
      const newDomain = {
        ...this.domain,
        id: 0 // Placeholder; the service will assign the correct id
      };

      this.domainService.addDomain(newDomain); // Use the service to add the domain
      this.router.navigate(['/dashboard']); // Redirect to dashboard
    } else {
      console.error('Domain validation failed');
    }
  }

  validateDomain(domain: any): boolean {
    return domain.name && domain.createdOn && domain.serverLocation;
  }
}
