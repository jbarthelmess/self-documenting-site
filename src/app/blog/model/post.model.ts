import { Content } from "./content.model";

export class Post {
    content: Content[];
    title: string;
    created: Date;// will be useful later, to order them and add them to the database

    constructor(content: Content[] , title: string, created=null) {
        this.created = created === null ? new Date() : created;
        this.title = title;
        this.content = content;
    }
}
