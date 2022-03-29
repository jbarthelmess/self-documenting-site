export class PostPreview {
    id: number;
    title: string;
    createdDate: Date;

    constructor(id: number, title: string, createdDate: Date) {
        this.id = id;
        this.title = title;
        this.createdDate = createdDate;
    }
}
