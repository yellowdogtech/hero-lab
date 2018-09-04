import { Component, OnInit } from '@angular/core';
import { Owner } from '../owner';
import { OwnerService } from '../owner.service';
import { YearService} from '../services/year.service';
import { Observable } from 'rxjs';
import { importType } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  owners: Owner[] = [];
  years: any[];
  selectedYear: any;

  constructor(private ownerService: OwnerService, 
    private yearService: YearService) { }

  ngOnInit() {
    this.getSelectedYear(2018);
  }

  // getHeroes(): void {
  //   this.ownerService.getHeroes()
  //     .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  // }

  getSelectedYear(year: number): void {
    
    this.yearService.getYears()
      .subscribe(years => {
        this.selectedYear = years.filter(ele => ele.year === year)[0];
        this.selectedYear.owners.forEach(owner => {
          owner = this.calculateScores(owner);
        });

        console.log(this.selectedYear);
      });
  }

  calculateScores(owner: any): any {
      owner.wins = owner.teams.map(t => t.wins)
                .reduce((a, b) => a + b);
    
      owner.conference_wins = owner.teams.map(t => t.conference_wins)
                .reduce((a, b) => a + b);

      owner.superbowl_wins = owner.teams.map(t => t.superbowl_wins)
                .reduce((a, b) => a + b);

      owner.playoff_wins = owner.teams.map(t => t.playoff_wins)
                .reduce((a, b) => a + b);

      owner.expected_wins = owner.teams.map(t => t.vegas)
              .reduce((a, b) => a + b);      
              
      return owner;
  }

  getYears(): void {
    //this.heroService.test();
    this.yearService.getYears()
      .subscribe(years => {
        this.years = years;
      });
  }
}
