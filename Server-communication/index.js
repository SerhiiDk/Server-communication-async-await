
async function getPostData () {
    const pageParams = new URLSearchParams(location.search)
    const postPage = pageParams.get('page');
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage == null ? 1 :postPage}`)
    const result = await response.json()

    return {
        posts: result.data,
        pagination: result.meta.pagination,
    }


}

async function createPost () {
    const pagination = await getPostData ();
    const postsNav = document.querySelector('.nav__list')

    let postNav = '';
    for (let i = 1; i <= pagination.pagination.pages; i++) {
        postNav += `
            <li>
                <a href="index.html?page=${i}" class="link">Страница ${i}</a>
            </li>
        `;
    }

}

async function createPostList () {
    const posts = await getPostData();
    const postsList = document.querySelector('.post-list')

    let postItem = '';

    for (let i = 0; i < 10; i++) {
        postItem += `
            <li>
                <a class=""posts-link__link href="post.html?id=${posts.posts[i].id}">
                    Статья ${i+1}
                </a>
            </li>
        `;
        postsList.innerHTML = postItem;
    }
}

async function createPostPage() {
    const postPage = document.querySelector('.post-block')
    let postContent  = '';

    const pageParams = new URLSearchParams(location.search)
    const postId = pageParams.get('id');

    const response = await fetch(`https://gorest.co.in/public-api/posts/${postId}`)
    const result = await response.json()

    const post = result.data;

    postContent = `
        <div class="card">
                <div class="card-body">
                    <h1 class="card-title">${post.title}</h1>
                    <p class="card-text">${post.body}</p>
                </div>
        </div>
    `
    postPage.innerHTML = postContent;
}


async function createPostComments () {
    const commentBlock =  document.querySelector('.comments-block')

    let postComment = '';


    const pageParams = new URLSearchParams(location.search)
    const postId = pageParams.get('id');

    const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${postId}`)
    const result = await response.json()

    const comment = result.data
    console.log(comment)

    comment.map(item => {
        postComment = `
        <div class="card">
            <div class="card-header">
                ${item.email}
            </div>
            <div class="card-body">
                <h1 class="card-title">${item.name}</h1>
                <p class="card-text">${item.body}</p>
            </div>
        </div> `;

        commentBlock.innerHTML = postComment;

    })

}


// getPostData ();
// createPost ();
// createPostList ()

(async function() {
    const postNav = document.querySelector('.nav__list')
    const postPage = document.querySelector('.comments-container')

    if (postNav) {
        createPost ();
        createPostList ();
    }

    if (postPage) {
        createPostPage()
        createPostComments ()
    }
}())
