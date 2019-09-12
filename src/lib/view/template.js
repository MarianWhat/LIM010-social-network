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

export const templateFormUpdatePost = (contentPost, urlImgPost) => `${contentPost}
<div class="img-loading-container">
       <span class="none remove-img btn-icon icon-img" id="btn-remove-img" title="Quitar imagen"></span>
       <input id="btn-upload-img" type="file" name="img-post-new" accept="image/png, image/jpeg" class="btn-upload-img">
       <img class="img-to-post" id="img-to-post" src="${urlImgPost}">
       <div class="container-more-percentage">
       <span class="icon-more btn-icon icon-img"></span><br>
       <span class="load-percentage">Agrega una imagen</span>
       </div>
   </div>
<button class="btn btn-form-user icon-text btn-privacy-update" data-privacy='0'>
<span class="btn-icon icon-public"></span><span id="text-privacy">Publico</span>
  <span class="icon-arrow icon-arrow-bottom"></span>
 </button>
 <nav class="list-menu none">
   <ul>
     <li class="icon-text btn-public-update"><span class="btn-icon icon-public" ></span>Publico</li>
     <span class="line-horizontal"></span>
     <li class="icon-text btn-private-update"><span class="btn-icon icon-private" ></span>Solo yo</li>
   </ul>
           </nav>
 <button class="btn btn-form-user btn-publicar" id="btn-create-post">Cancelar</button>
           
 <button class="btn btn-form-user btn-publicar" id="btn-update-post">Actualizar</button>`;
