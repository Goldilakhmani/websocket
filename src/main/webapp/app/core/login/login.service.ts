import { Injectable } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { AccountService } from 'app/core/auth/account.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { JhiTrackerService } from 'app/core/tracker/tracker.service';
import { JhiEventManager } from 'ng-jhipster';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private accountService: AccountService,
    private trackerService: JhiTrackerService,
    private eventManager: JhiEventManager,
    private authServerProvider: AuthServerProvider
  ) {}

  login(credentials) {
    return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  }

  logout() {
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
    this.eventManager.broadcast({
      name: 'logoutSuccess',
      content: 'Sending Logout Success'
    });
  }
}
