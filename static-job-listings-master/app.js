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
        <div class="job-tag" data-value="${index.role}"><p>${index.role}</p></div>
        <div class="job-tag" data-value="${index.level}"><p>${index.level}</p></div>
        ${index.languages.map(index=>{
            return `<div class="job-tag" data-value="${index}"><p>${index}</p></div>`
        }).join('')}
        ${index.tools.map(index=>{
            return `<div class="job-tag" data-value="${index}"><p>${index}</p></div>`
        }).join('')}
        </div>
    </div>`)
}))
//create filter tag
const createFilterBox = (tag)=>{
    document.querySelector('.filter-lists').insertAdjacentHTML("beforeend",`
        <div class="filter-list-box" data-value="${tag}" >
        <div class="filter-tag" ><p>${tag}</p></div>
        <div class="filter-remove-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
            <path fill="#fff" fill-rule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"/>
            </svg>
        </div>
        </div>
    `)
}
//job list bar
window.addEventListener('click', (e)=>{
    const container = e.target.closest('.job-listing-wrapper');
    
    //filter bar removal
    // filterLists.forEach(index=>{
    //     if(e.target.closest('.filter-list-box').dataset.value == 'Frontend'){
    //         if('Frontend'.indexOf(index.dataset.value) == 0 ){
    //             index.remove()
    //         }
    //     }
    // })
    //add tag to filter list
    if(e.target.closest('.job-tag')){
        const filterLists = document.querySelectorAll('.filter-list-box');
        // const getValue = filterLists.forEach(index=> console.log(index.dataset.value ))
        console.log(filterLists)
        if(filterLists.length == 0 || filterLists.forEach(index=> index.dataset.value != e.target.textContent)){
            createFilterBox(e.target.textContent);
        } 
    }
    //job list bar click
    const jobTags = document.querySelectorAll('.job-tag-box')
    jobTags.forEach(index=>{
        index.querySelectorAll('.job-tag').forEach(tags=>{
            
            if(e.target.textContent.indexOf(tags.dataset.value) == 0){
                tags.closest('.job-listing-wrapper').classList.add("mark");
            }
        })
        if(!index.closest('.job-listing-wrapper').classList.contains('mark')){
            index.closest('.job-listing-wrapper').style.display = 'none';
        }
    })
})

