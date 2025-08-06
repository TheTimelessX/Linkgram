import { DatabaseSync } from "node:sqlite";
import { mkdir } from "fs/promises";
import { existsSync } from "fs";
import * as path from "path";
import { User, SensetiveUser } from "../models/user";
import { Photo } from "../models/photo";
import { Factory } from "./factory";

export class theSqlUsers {
    private sqlpath: string;
    private photoSqlPath: string;
    private photoDirPath: string;
    private dbs: DatabaseSync;
    private photoDbs: DatabaseSync;
    private factory: Factory;

    constructor(sqlpath: string, photoSqlPath: string, photoDirPath: string){
        this.sqlpath = path.join(__dirname, sqlpath);
        this.photoSqlPath = path.join(__dirname, photoSqlPath);
        this.photoDirPath = path.join(__dirname, photoDirPath);
        this.dbs = new DatabaseSync(this.sqlpath);
        this.photoDbs = new DatabaseSync(this.photoSqlPath);
        this.factory = new Factory();
        this.setup();
    }

    async setup(){
        if (!existsSync(this.photoDirPath)){
            await mkdir(this.photoDirPath, { recursive: true })
        }

        this.dbs.prepare("CREATE TABLE IF NOT EXISTS theusers (auth_token TEXT PRIMARY KEY, first_name TEXT, last_name TEXT, username TEXT, profile_photo_id TEXT, id INTEGER)");
        this.photoDbs.prepare("CREATE TABLE IF NOT EXISTS photos (id TEXT PRIMARY KEY, height INTEGER, width INTEGER, size INTEGER)");
    }

    async getAll(callback: (users: SensetiveUser[]) => void = () => {}){
        callback(this.dbs.prepare("SELECT * FROM theusers").all() as SensetiveUser[]);
    }

    async getAllPhotos(callback: (photos: Photo[]) => void = () => {}){
        callback(this.photoDbs.prepare("SELECT * FROM photos").all() as Photo[]);
    }

    async getPhotoById(id: string, callback: (photos: Photo | null) => void = () => {}){
        await this.getAllPhotos(async (photos) => {
            for (let photo of photos){
                if (photo.id == id){
                    return callback(photo);
                }
            }

            return callback(null);

        })
    }

    async getUserByAuth(auth_token: string, callback: (userData: SensetiveUser | null) => void = () => {}){
        await this.getAll(async (users) => {
            for (let user of users){
                if (user.auth_token == auth_token){
                    if (user.profile_photo_id){
                        await this.getPhotoById(user.profile_photo_id, async (photo) => {
                            if (photo){
                                user.profile_photo = photo;
                            }
                            return callback(user);
                        })
                    } else {
                        return callback(user);
                    }
                }
            }

            return callback(null);

        })
    }

    async getUserById(id: number, callback: (userData: SensetiveUser | null) => void = () => {}){
        await this.getAll(async (users) => {
            for (let user of users){
                if (user.id == id){
                    if (user.profile_photo_id){
                        await this.getPhotoById(user.profile_photo_id, async (photo) => {
                            if (photo){
                                user.profile_photo = photo;
                            }
                            return callback(user);
                        })
                    } else {
                        return callback(user);
                    }
                }
            }

            return callback(null);

        })
    }

}