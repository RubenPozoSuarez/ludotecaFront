import { Client } from "src/app/client/model/client";
import { Game } from "src/app/game/model/game";

export class Loan {
    id: number;
    game: Game;
    client: Client;
    startDate: Date;
    repaymentDate: Date;
}
