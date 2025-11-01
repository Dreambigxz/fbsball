import { Routes } from '@angular/router';
import { MainComponent  } from "./main/main.component";
import { BetinfoComponent  } from "./betinfo/betinfo.component";
import { BethistoryComponent} from "./bethistory/bethistory.component";
import { WithdrawComponent} from "./wallet/withdraw/withdraw.component";
import { DepositComponent} from "./wallet/deposit/deposit.component";
import { TransactionComponent} from "./wallet/transaction/transaction.component";
import { EarningsComponent} from "./promotion/earnings/earnings.component";
import { RewardsComponent} from "./promotion/rewards/rewards.component";
import { InactiveUsersComponent} from "./promotion/inactive-users/inactive-users.component";
import { ProfileComponent} from "./profile/profile.component";
import { MatchesComponent} from "./matches/matches.component";
import { LoginComponent} from "./auth/login/login.component";
import { RegisterComponent} from "./auth/register/register.component";
import { ResetComponent} from "./auth/reset/reset.component";

import { authGuard } from './reuseables/auth/auth.guard';

export const routes: Routes = [

    {
      path: '',
      component: MainComponent,
      title: 'Main',
      canActivate: [authGuard]
    },

    {
      path: 'betinfo/:id',
      component: BetinfoComponent,
      title: 'Bet-Info',
      canActivate: [authGuard]
    },

    {
      path: 'bethistory',
      component: BethistoryComponent,
      title: 'Bet-History',
      canActivate: [authGuard]
    },

    {
      path: 'wallet/withdraw',
      component: WithdrawComponent,
      title: 'withdraw',
      canActivate: [authGuard]
    },

    {
      path: 'wallet/deposit',
      component: DepositComponent,
      title: 'Deposit',
      canActivate: [authGuard]
    },
    {
      path: 'wallet/records',
      component: TransactionComponent,
      title: 'Records',
      canActivate: [authGuard]
    },
    {
      path: 'promotions/earnings',
      component: EarningsComponent,
      title: 'Earnings',
      canActivate: [authGuard]
    },
    {
      path: 'promotions/rewards',
      component: RewardsComponent,
      title: 'Rewards',
      canActivate: [authGuard]
    },
    {
      path: 'promotions/inactive-users',
      component: InactiveUsersComponent,
      title: 'Inactive',
      canActivate: [authGuard]
    },
    {
      path: 'account',
      component: ProfileComponent,
      title: 'Account',
      canActivate: [authGuard]
    },
    {
      path: 'matches',
      component: MatchesComponent,
      title: 'Matches',
      canActivate: [authGuard]
    },
    {
      path: 'login',
      component: LoginComponent,
      title: 'Login',
    },
    {
      path: 'register',
      component: RegisterComponent,
      title: 'Register',
    },
    {
      path: 'reset-password',
      component: ResetComponent,
      title: 'Reset',
    },

];
