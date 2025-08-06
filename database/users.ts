import { DatabaseSync } from "node:sqlite";
import { User, SensetiveUser } from "../models/user";

export class theSqlUsers {
    private sqlpath: string;
    private dbs: DatabaseSync;

    constructor(sqlpath: string){
        this.sqlpath = sqlpath;
        this.dbs = new DatabaseSync(this.sqlpath);
        this.setup();
    }

    setup(){
        let setrt = this.dbs.prepare("CREATE TABLE IF NOT EXISTS theusers (auth_token TEXT PRIMARY KEY, first_name TEXT, last_name TEXT, username TEXT, profile_photo_id TEXT, id INTEGER)")
    }

    async getAll(callback: (users: SensetiveUser[]) => void = () => {}){
        let prp = this.dbs.prepare("SELECT")
    }

}