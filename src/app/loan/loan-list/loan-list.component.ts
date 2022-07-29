import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/client';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/pageable';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/game';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { LoanService } from '../loan.service';
import { Loan } from '../model/loan';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  loans: Loan[];
  games: Game[];
  clients: Client[];
  filterGame: Game;
  filterClient: Client;
  filterDate: Date;
  gameId: number;
  clientId: number;
  date: Date;

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'game', 'client', 'startDate', 'repaymentDate', 'action'];
  
  pageable: Pageable =  {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
    sort: [{
        property: 'id',
        direction: 'ASC'
    }]
  }

  constructor(
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPage();

    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );

    this.gameService.getGames().subscribe(
      games => this.games = games
    );

  }

  loadPage(event?: PageEvent) {

    if (event != null) {
        this.pageable.pageSize = event.pageSize
        this.pageable.pageNumber = event.pageIndex;
    }

    this.loanService.getLoans(this.gameId, this.clientId, this.date,this.pageable).subscribe(data => {
        this.dataSource.data = data.content;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
        this.totalElements = data.totalElements;
    });
}  

  onCleanFilter(): void {
    this.filterGame = null;
    this.filterClient = null;
    this.filterDate = null;

    this.onSearch();
  }

  onSearch(): void {

    this.pageable.pageNumber = 0;
    this.pageable.pageSize = 5;
    this.gameId = this.filterGame != null ? this.filterGame.id : null;
    this.clientId = this.filterClient != null ? this.filterClient.id : null;
    this.date = this.filterDate;

    this.loanService.getLoans(this.gameId, this.clientId, this.date,this.pageable).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanEditComponent, {
      data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
  });
  }

  deleteLoan(loan: Loan) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
        data: { title: "Eliminar autor", description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el autor?" }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.loanService.deleteLoan(loan.id).subscribe(result =>  {
                this.ngOnInit();
            }); 
        }
    });
}  

}
