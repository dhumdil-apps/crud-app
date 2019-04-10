import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  size: number;
  user: any;
  users: any;

  constructor(
    private appService: AppService
  ) {
    this.user = {};
    this.users = [];
    this.size = 0;
  }

  ngOnInit() {
    this.countUsers();
  }

  ngAfterViewInit() {
    this.listUsers();
  }

  private countUsers(): void {

    this.appService
      .count()
      .subscribe(data => {
        console.log(data);
        this.size = data;
      });

  }

  public listUsers(): void {

    this.appService
      .list()
      .subscribe(data => {
        console.log(data);
        this.users = data;
      });

  }

}
