import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/client';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/game';
import { LoanService } from '../loan.service';
import { Loan } from '../model/loan';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss']
})
export class LoanEditComponent implements OnInit {

  loan: Loan;
  games: Game[];
  clients: Client[];

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService
    ) { }

  ngOnInit(): void {
    this.loan = new Loan();

    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );

    this.gameService.getGames().subscribe(
      games => this.games = games
    );
  }

  onSave() {
    this.loanService.saveLoan(this.loan).subscribe(result =>  {
        this.dialogRef.close();
    }); 
  }  

  onClose() {
      this.dialogRef.close();
  }

}
