import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    if (!localStorage.getItem('authorization_token')) {
      localStorage.setItem('authorization_token', 'c3RyaWNvemV0YzpURVNUX1BBU1NXT1JE');
    }
  }
}
