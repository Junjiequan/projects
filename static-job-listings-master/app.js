const mainContainer = document.querySelector('.main-container');
const jobTagBox = mainContainer.querySelector('.job-tag-box');
const jobTitle = mainContainer.querySelector('.job-title');
fetch('./data.json')
.then(resp => resp.json())
.then(data => data.map(index=>{
    mainContainer.insertAdjacentHTML('beforeend', `
    <div class="job-listing-wrapper ${index.new + index.featured + 'hot'}" id=${index.id}>
        <div class="job-info-box">
        <div class="job-logo"><img src="${index.logo}" alt="photo"></div>
        <section class="job-desc">
            <div class="job-title">
            <p>${index.company}</p>
            <div class="${index.new}"></div>
            <div class="${index.featured}"></div>
            </div>
            <h3>${index.position}</h3>
            <div class="job-info">
            <p>${index.postedAt}</p>
            <p>${index.contract}</p>
            <p>${index.location}</p>
            </div>
        </section>
        </div>
        <div class="job-tag-box">
        <div class="job-tag"><p>${index.role}</p></div>
        <div class="job-tag"><p>${index.level}</p></div>
        ${index.languages.map(index=>{
            return `<div class="job-tag"><p>${index}</p></div>`
        }).join('')}
        ${index.tools.map(index=>{
            return `<div class="job-tag"><p>${index}</p></div>`
        }).join('')}
        </div>
    </div>`)
}))
            

window.addEventListener('click', (e)=>{
    const container = e.target.closest('.main-container');
})

