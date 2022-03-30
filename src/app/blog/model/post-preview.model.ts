export class PostPreview {
    id: string;
    title: string;
    createdDate: Date;
    contentIds: string[]
    constructor(id: string, title: string, createdDate: Date, contentIds: string[]) {
        this.id = id;
        this.title = title;
        this.createdDate = createdDate;
        this.contentIds = contentIds;
    }
}
