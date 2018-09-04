import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { OwnerService } from '../owner.service';
import { YearService } from '../services/year.service';
import { Owner } from '../owner';
import { IfStmt } from '../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css']
})
export class OwnerDetailComponent implements OnInit {

  @Input() owner: Owner;
  weeks: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

  constructor(
    private route: ActivatedRoute,
    private yearService: YearService,
    private location: Location) { }

  ngOnInit() {
    this.getOwner();
  }

  getOwner(): void {
     const id = +this.route.snapshot.paramMap.get('id');
    
    this.yearService.getYears()
      .subscribe(years => {
        let selectedYear = years.filter(ele => ele.year === 2018)[0];
        this.owner = selectedYear.owners.filter(o => {
          return o.id === id;
        })[0];
      });
  }

  getWeeksFavored(team: any) : number {
    return team.weeks.map(function(week) {
      if(week.line === 0) {
        return .5
      } else if (week.line < 0) {
        return 1;
      } else {
        return 0;
      }
    }).reduce((favored, val) => favored + val);  
  }

  isFavored(team: any, selectedWeek: number) : string {
    var match = team.weeks.map(w => {
      if(w.week === selectedWeek) {
        return w.line;
      }
    });

    if(!match[0]) { return "-"; }
  
    return match[0] + "";
  }

  goBack(): void {
    this.location.back();
  }

}
