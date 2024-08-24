import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../domain.service';
import { Domain } from '../models/domain.model'; // Import the Domain interface

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  domain: Domain | undefined;
  domainId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private domainService: DomainService
  ) {
    this.domainId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.domain = this.domainService.getDomains().find(domain => domain.id === this.domainId);

    if (!this.domain) {
      console.error('Domain not found!');
      this.router.navigate(['/dashboard']);
    }
  }

  onUpdateDomain() {
    if (this.domain) {
      this.domainService.updateDomain(this.domain);
      this.router.navigate(['/dashboard']);
    }
  }
}
