import { Injectable } from "@angular/core";
import { Plat } from "../models/plat.model";

@Injectable()
export class PlatsService {
    private  plats: Plat[] = [];

    getPlats() {
        return this.plats.slice();
    }

    setPlats(plats: Plat[]) {
        this.plats = plats;
    }
}