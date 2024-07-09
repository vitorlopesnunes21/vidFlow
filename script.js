const conatainerVideos = document.querySelector(".videos__container");


async function buscarEMostrarVideos() {
    try {
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();

        videos.forEach((video) => {
            if (video.categoria == "") {
                throw new Error('Vídeo Não tem categoria')
            }
            conatainerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem} alt="logo do canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `;
        })
    } catch (error) {
        conatainerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`
    }
}

buscarEMostrarVideos();


const barraDePesquisa = document.querySelector(".pesquisar__input");


barraDePesquisa.addEventListener("input", filtrarPesuisa);

function filtrarPesuisa() {
    const videos = document.querySelectorAll(".videos__item")

    if (barraDePesquisa.value != "") {
        for (let video of videos) {
            let titulo = video.querySelector(".titulo-video").textContent.toLocaleLowerCase();
            let valorFiltro = barraDePesquisa.value.toLocaleLowerCase();

            if (!titulo.includes(valorFiltro)) {
                video.style.display = "none";
            } else {
                video.style.display = "block"
            }

        }
    } else {
        video.style.display = "block"
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name")
    botao.addEventListener("click", () => filtrarPorCategorai(nomeCategoria));  
})

function filtrarPorCategorai(filtro) {
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos){
        let categorai = video.querySelector(".categoria").textContent.toLocaleLowerCase();
        let valorFiltro = filtro.toLocaleLowerCase();

        if (!categorai.includes(valorFiltro) && valorFiltro != 'tudo') {
            video.style.display = "none"
        } else {
            video.style.display = "block"
        }
    }
}