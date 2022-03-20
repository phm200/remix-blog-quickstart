import { Outlet, json, Link, useLoaderData, useTransition } from "remix";
import { getPosts, Post } from "~/post";
import adminStyles from "~/styles/admin.css";

export const links = () => {
  return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = async () => {
  return json(await getPosts());
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  const transition = useTransition();
  return (
    <div className="admin">
      <nav>
        <h1>Posts</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <main>
        {transition.state === "loading" ? <h1>Loading...</h1> : <Outlet />}
      </main>
    </div>
  );
}
