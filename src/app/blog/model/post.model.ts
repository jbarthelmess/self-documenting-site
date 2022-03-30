import { Content } from "./content.model";

export class Post {
    id: string;
    content: Content[];
    title: string;
    createdDate: Date;// will be useful later, to order them and add them to the database

    constructor(id: string, content: Content[] , title: string, created=null) {
        this.id = id;
        this.createdDate = created === null ? new Date() : created;
        this.title = title;
        this.content = content;
    }
}
