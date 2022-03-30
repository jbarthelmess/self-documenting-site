import { Component, OnInit } from '@angular/core';
import { ContentType } from '../model/content-type';
import { Code, Image, isCode, isImage, isText, Text } from '../model/content.model';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;

  isCode = isCode;
  isText = isText;
  isImage = isImage;
  constructor() {
    // for development purposes, all blog posts will look the same
    // and have the same title and content. 
    this.post = new Post(
      '0000',
      [
        {
          id: '0000', 
          order: 0,
          type: ContentType.Text,
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus urna. Enim blandit volutpat maecenas volutpat blandit aliquam etiam. Odio pellentesque diam volutpat commodo. Facilisi cras fermentum odio eu feugiat. Sit amet risus nullam eget. Molestie nunc non blandit massa enim. Cursus sit amet dictum sit. Habitant morbi tristique senectus et netus et malesuada fames. Sit amet consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur. Quis ipsum suspendisse ultrices gravida dictum. Maecenas ultricies mi eget mauris pharetra et. Lobortis elementum nibh tellus molestie nunc non. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Bibendum enim facilisis gravida neque convallis a. Condimentum id venenatis a condimentum vitae sapien.",
        } as Text,
        {
          id: '0001', 
          order: 0,
          type: ContentType.Text,
          text: "Molestie nunc non blandit massa enim nec dui nunc mattis. Bibendum at varius vel pharetra. Mollis aliquam ut porttitor leo a diam sollicitudin. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Non odio euismod lacinia at. In iaculis nunc sed augue lacus viverra. Pellentesque habitant morbi tristique senectus et netus. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Ut tristique et egestas quis ipsum suspendisse. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Ultrices neque ornare aenean euismod. Metus vulputate eu scelerisque felis imperdiet.",
        } as Text,
        {
          id: '0003',
          order: 2,
          type: ContentType.Code,
          code: "print(\"Hello World!\\n\")",
        } as Code,
        {
          id: '0004', 
          order: 0,
          type: ContentType.Text,
          text: "Suspendisse faucibus interdum posuere lorem. Enim ut sem viverra aliquet. Iaculis nunc sed augue lacus. Sodales neque sodales ut etiam. Faucibus turpis in eu mi bibendum. Nisl condimentum id venenatis a condimentum vitae. Non odio euismod lacinia at quis risus sed vulputate. Pharetra diam sit amet nisl suscipit. Sed nisi lacus sed viverra tellus. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Et leo duis ut diam. Id aliquet risus feugiat in ante metus dictum at. Sodales ut eu sem integer vitae. Tellus integer feugiat scelerisque varius morbi enim. Pellentesque nec nam aliquam sem et tortor consequat id porta. Mus mauris vitae ultricies leo integer. Vel eros donec ac odio tempor orci dapibus ultrices in. Tortor condimentum lacinia quis vel eros donec ac odio tempor. In pellentesque massa placerat duis ultricies lacus sed turpis.",
        } as Text,
        {
          id: '0005', 
          order: 0,
          type: ContentType.Text,
          text: "Vitae suscipit tellus mauris a diam maecenas. Sagittis orci a scelerisque purus semper eget. Amet luctus venenatis lectus magna fringilla. Non arcu risus quis varius quam quisque id diam vel. Velit euismod in pellentesque massa. Dapibus ultrices in iaculis nunc sed augue. Et netus et malesuada fames. Adipiscing enim eu turpis egestas pretium aenean. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Bibendum ut tristique et egestas quis ipsum suspendisse. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Arcu risus quis varius quam quisque id.",
        } as Text,
        {
          id: '0006',
          order: 5,
          type: ContentType.Image,
          url: "https://www.akc.org/wp-content/uploads/2016/10/Fotolia_934271_S-800x589.jpg",
        } as Image,
        {
          id: '0007', 
          order: 0,
          type: ContentType.Text,
          text: "Nec sagittis aliquam malesuada bibendum arcu vitae. Purus non enim praesent elementum. Tellus in metus vulputate eu scelerisque. Semper viverra nam libero justo laoreet. Duis ut diam quam nulla. Volutpat lacus laoreet non curabitur gravida. Consequat ac felis donec et odio pellentesque diam volutpat commodo. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Mattis nunc sed blandit libero volutpat sed cras ornare arcu. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Ullamcorper eget nulla facilisi etiam dignissim. Condimentum lacinia quis vel eros donec ac odio.",
        } as Text,
      ],
      "Title of the Blog Post"
    );
  }

  ngOnInit(): void {
    /* Eventually, this function will make a call to the database 
    where all the blog posts will be stored. This will be done when
    I deploy the app to firebase and I figure out how to setup a 
    document database of some kind. */
  }

}
