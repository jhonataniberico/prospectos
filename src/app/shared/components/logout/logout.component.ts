import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services';
import { SharedConstants } from '@app/shared/shared.constants';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  ICON_CLOSE = SharedConstants.ICONS.ICON_CLOSE;
  constructor(
    private _authenticatedService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this._authenticatedService.logout();
  }

}
