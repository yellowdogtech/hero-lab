import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../owner.service';
import { Owner } from '../owner';


@Component({
  selector: 'app-heroes',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {
  owners: Owner[];

  constructor(private ownerService: OwnerService) {     
  }

  ngOnInit() {
  }


  // add(name: string): void {
  //   name = name.trim();

  //   if(!name) { return; }

  //   this.ownerService.addHero({name} as Hero)
  //     .subscribe(owner => {
  //       this.heroes.push(hero);
  //     });

  // }

  // delete(hero: Hero): void {
  //   this.heroes = this.heroes.filter(h => h !== hero);
  //   this.heroService.deleteHero(hero).subscribe();
  // }
  
 }
