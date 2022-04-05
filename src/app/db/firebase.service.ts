import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { child, Database, get, getDatabase, onValue, push, ref, set } from "firebase/database";
import { getAuth, Auth, User, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Content, isCode, isHeading, isImage, isLink, isText } from '../blog/model/content.model';
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
  posts: Map<string, PostPreview> = new Map();
  postMap: Map<string, Post> = new Map();
  postsLoaded: BehaviorSubject<PostPreview[]> = new BehaviorSubject<PostPreview[]>([]);
  auth: Auth;
  user: User | null = null;
  googleAccessToken = '';

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.database = getDatabase(this.app);
    this.auth = getAuth();
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
    } else if(isText(content) || isHeading(content)) {
      clone = {
        order: content.order,
        type: content.type,
        text: content.text
      }
    } else if(isImage(content) || isLink(content)) {
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
      this.posts.clear();
      for (let post in data) {
        let contentIds = [];
        for (let id in data[post].content) {
          contentIds.push(id);
        }
        this.posts.set(post, {
          id: post,
          title: data[post].title,
          createdDate: new Date(data[post].createdDate),
          contentIds
        });
      }
      this.postsLoaded.next([...this.posts.values()]);
    });
  }

  getPosts(): PostPreview[] {
    return [...this.posts.values()];
  }

  getNeighboringPosts(viewPost: PostPreview): PostPreview[] {
    let previous = null;
    let next = null;
    const ret = [];
    for(let post of this.posts.values()) {
      if(post.createdDate < viewPost.createdDate) { // previous
        if(!previous || (previous && previous.createdDate < post.createdDate)) {
          previous = post;
        }
      } else if(post.createdDate > viewPost.createdDate) { // next
        if(!next || (next && next.createdDate > post.createdDate)) {
          next = post;
        }
      }
    }
    if(previous) {
      ret.push(previous);
    }
    if(next) {
      ret.push(next);
    }
    return ret;
  }

  getPost(id: string): PostPreview | undefined {
    return this.posts.get(id);
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

  // ------------------- AUTHENTICATION ----------------------------
  /* We're going to use google sign authentication to authenticate, and 
  to start, we're just going to use it check whether it is me, or someone
  else trying to access the create-post page and redirect to the homepage if
  they are not Josh Barthelmess. After that, we'll add rules to the actual 
  database to protect that as well. */

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider).then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.user = result.user;
      if (credential) {
        if (credential.accessToken) {
          this.googleAccessToken = credential.accessToken;
        }
      }
    });
  }

  getUser(): User | null {
    return this.user;
  }
}
