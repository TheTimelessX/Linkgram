import * as crypto from "crypto";
import * as uuid from "uuid";

export class Factory {
    get bNumber(){
        return parseInt(uuid.v4().replace(/-/g, '').slice(0, 10), 16);
    }

    get bHash(){
        return uuid.v4();
    }

    get bMultiHash(){
        let hsh = "";
        for (let i = 0;i<5;i++){
            hsh += uuid.v4();
        }
        return hsh;
    }

}