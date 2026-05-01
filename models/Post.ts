import { Schema, models, model, ObjectId, Model } from "mongoose";

// title, content, slug, tags, thumbnail, meta, author, date
export interface PostModelSchema {
  _id: ObjectId;
  title: string;
  slug: string;
  meta: string;
  content: string;
  category: string;
  tags: string[];
  thumbnail?: { url: string; public_id?: string | null };
  author: ObjectId;
  isDraft: boolean;
  isFeatured?: boolean;
  featuredOrder?: number; // Thứ tự hiển thị trong section nổi bật (1-4)
  isDirectPost?: boolean; // Bài viết hiển thị ở URL 2 cấp: trangchu/slug (thay vì trangchu/bai-viet/slug)
  deletedAt?: Date | null;
  createdAt: Date;
}

const PostSchema = new Schema<PostModelSchema>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
  },
    meta: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    tags: {
      type: [String],
    },
    thumbnail: {
      type: Object,
      url: String,
      public_id: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    featuredOrder: {
      type: Number,
      default: null,
    },
    isDirectPost: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Post = models?.Post || model("Post", PostSchema);

export default Post as Model<PostModelSchema>;
