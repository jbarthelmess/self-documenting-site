/* Union type, that can be added to as needed. We will use the ContentType
enum for type checking in the html. We will need a typeguard  */

import { TypeGuard } from "src/app/util/pipe/guard-type.pipe";

export enum Languages {
    javascript = "javascript",
    html = "html",
}

export enum ContentType {
    Text,
    Image,
    Code,
    Heading,
    Link,
}

export interface Code {
    id: string;
    order: number;
    type: ContentType.Code;
    code: string;
    lang?: string;
}

export interface Text {
    id: string;
    order: number;
    type: ContentType.Text;
    text: string;
}

export interface Image {
    id: string;
    order: number;
    type: ContentType.Image;
    url: string;
}

export interface Heading {
    id: string,
    order: number,
    type: ContentType.Heading,
    text: string
}

export interface Link {
    id: string,
    order: number,
    type: ContentType.Link,
    url: string
}

export type Content = Code | Text | Image | Link | Heading;

export const isCode: TypeGuard<Content, Code> = (content: Content): content is Code => content.type === ContentType.Code;
export const isImage: TypeGuard<Content, Image> = (content: Content): content is Image => content.type === ContentType.Image;
export const isText: TypeGuard<Content, Text> = (content: Content): content is Text => content.type === ContentType.Text;
export const isLink: TypeGuard<Content, Link> = (content: Content): content is Link => content.type === ContentType.Link;
export const isHeading: TypeGuard<Content, Heading> = (content: Content): content is Heading => content.type === ContentType.Heading;
