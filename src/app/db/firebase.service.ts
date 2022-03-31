import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { child, Database, get, getDatabase, onValue, push, ref, set } from "firebase/database";
import { BehaviorSubject } from 'rxjs';
import { Content, isCode, isImage, isText } from '../blog/model/content.model';
import { PostPreview } from '../blog/model/post-preview.model';
import { Post } from '../blog/model/post.model';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6XwkQzK7wiDxZmU8BwxX7x3oulXvoUCs",
  authDomain: "self-documenting-blog.firebaseapp.com",
  databaseURL: "https://self-documenting-blog-default-rtdb.firebaseio.com",
  projectId: "self-documenting-blog",
  storageBucket: "self-documenting-blog.appspot.com",
  messagingSenderId: "464983601909",
  appId: "1:464983601909:web:b733b8ef9108cd9c5a0bbc"
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: FirebaseApp;
  database: Database;
  posts: PostPreview[] = [];
  postMap: Map<string, Post> = new Map();
  postsLoaded: BehaviorSubject<PostPreview[]> = new BehaviorSubject<PostPreview[]>([]);

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.database = getDatabase(this.app);
    this.retrievePosts();
  }

  createPost(post: Post): string {
    const postListRef = ref(this.database, 'posts');
    const newPostRef = push(postListRef);

    // create all the content keys
    let contentIds: {[key: string]: boolean} = {};
    post.content.forEach(ct => {
      const newId = this.createContent(ct);
      contentIds[newId] = true;
    });

    // add post to database
    post.id = newPostRef.key === null ? '0000': newPostRef.key;
    set(newPostRef, {
      createdDate: post.createdDate.getTime(),
      title: post.title,
      content: contentIds
    });
    return post.id;
  }

  createContent(content: Content): string {
    const contentListRef = ref(this.database, 'content');
    const newContentRef = push(contentListRef);
    content.id = newContentRef.key === null ? '0000': newContentRef.key;
    let clone;
    if(isCode(content)) {
      clone = {
        order: content.order,
        type: content.type,
        code: content.code
      };
    } else if(isText(content)) {
      clone = {
        order: content.order,
        type: content.type,
        text: content.text
      }
    } else if(isImage(content)) {
      clone = {
        order: content.order,
        type: content.type,
        url: content.url
      }
    }
    set(newContentRef, clone);
    return content.id;
  }

  retrievePosts() {
    const dbRef = ref(this.database, 'posts');
    onValue(dbRef, (snapshot) => {
      let data = snapshot.val();
      this.posts = [];
      console.log('calling onValue');
      console.log(data);
      for (let post in data) {
        console.log(post);
        let contentIds = [];
        for (let id in data[post].content) {
          contentIds.push(id);
        }
        console.log(contentIds);
        this.posts.push({
          id: post,
          title: data[post].title,
          createdDate: new Date(data[post].createdDate),
          contentIds
        });
      }
      console.log(this.posts);
      this.postsLoaded.next(this.posts);
    });
  }

  getPosts(): PostPreview[] {
    return this.posts;
  }

  getPostContent(postPreview: PostPreview): Post {
    const dbRef = ref(this.database, `content`);
    let content: Content[] = [];
    postPreview.contentIds.forEach(async (id) => {
      const snapshot = await get(child(dbRef, `${id}`));
      const raw = snapshot.val();
      content.push({
        ...raw,
        id
      });
    });
    return {
      id: postPreview.id, 
      title: postPreview.title, 
      createdDate: postPreview.createdDate, 
      content
    };
  }
}
