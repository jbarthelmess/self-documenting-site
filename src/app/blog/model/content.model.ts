/* Union type, that can be added to as needed. We will use the ContentType
enum for type checking in the html. We will need a typeguard  */

import { TypeGuard } from "src/app/util/pipe/guard-type.pipe";
import { ContentType } from "./content-type";

export interface Code {
    id: string;
    order: number;
    type: ContentType.Code;
    code: string;
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

export type Content = Code | Text | Image;

export const isCode: TypeGuard<Content, Code> = (content: Content): content is Code => content.type === ContentType.Code;
export const isImage: TypeGuard<Content, Image> = (content: Content): content is Image => content.type === ContentType.Image;
export const isText: TypeGuard<Content, Text> = (content: Content): content is Text => content.type === ContentType.Text;
