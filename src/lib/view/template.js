export const templatePost = (idPost, imgUser, nameUser, contentPost, imgPost, datePost, totalLike, typePrivacy, menuLista) => `<article class="box-post-user" id=${idPost}>
  <div class="post-user-info">
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

export const templateFormUpdatePost = (contentPost, urlImgPost, typePrivacy) => `${contentPost} 
<img class="img-to-post" id="" src="${urlImgPost}">
<input id="" type="file" name="img-post-new" accept="image/png, image/jpeg" class="btn btn-curve btn-icon icon-img">
<button class="btn btn-form-user icon-text" id="btn-privacy-form" data-privacy=${typePrivacy}>
  <span class="btn-icon icon-public"></span><span id="text-privacy">Publico</span>
  <span class="icon-arrow icon-arrow-bottom"></span>
 </button>
 <nav class="list-menu none">
   <ul>
     <li class="icon-text" id="btn-public"><span class="btn-icon icon-public"></span>Publico</li>
     <span class="line-horizontal"></span>
     <li class="icon-text" id="btn-private"><span class="btn-icon icon-private"></span>Solo yo</li>
   </ul>
 </nav>
 <button class="btn btn-form-user btn-publicar" id="btn-create-post">Publicar</button>`;
