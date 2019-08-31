export const templatePost = (idPost, imgUser, nameUser, contentPost, imgPost, datePost, totalLike, typePrivacy, menuLista) => `<article class="box-post-user">
  <div class="post-user-info" id=${idPost}>
    <img class="post-user-photo" src="${imgUser}">
    <div class="cont-post-user-info">
      <p class="post-user-name">${nameUser}</p>
      <div class="display-flex cont-post-user-date">
        <span class="post-user-date">${datePost}</span>
        <button class="btn-curve btn-icon ${typePrivacy}"></button>
      </div>
    </div>
    ${menuLista}
</div>
  <div class="post-user-cont">
    <p class="post-user-text">${contentPost}</p>
    <img class="post-user-img" src="${imgPost}">
  </div>
  <div class="post-user-nav display-flex">
    <div class="container-like display-flex">
        <span class="icon-like btn-icon" id=""></span>
        <span class="post-user-cant-like">${totalLike}</span>
    </div>
    <button class="btn btn-form-user icon-text">
        <span class="btn-icon icon-comentario"></span>Comentar
    </button>
  </div>
</article>`;
