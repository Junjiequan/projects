const mainContainer = document.querySelector('.main-container');
const jobTagBox = mainContainer.querySelector('.job-tag-box');
const jobTitle = mainContainer.querySelector('.job-title');
//fetch data from local json file
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
        ${index.languages.map(language=>{
            return `<div class="job-tag" data-value="${language}"><p> ${language}</p></div>`
        }).join('')}
        ${index.tools.map(tool=>{
            return `<div class="job-tag" data-value="${tool}"><p> ${tool}</p></div>`
        }).join('')}
        </div>
    </div>`)
}))
//create tag on filter bar
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
//remove tag from filter bar
const removeFilterBox = (tag)=>{
    document.querySelectorAll('.filter-list-box').forEach(index=>{
        if(index.getAttribute('data-value') == tag){
            index.remove();
        }
    })
}
//open and close effect
function openFilterbox(){
    document.querySelector('.filter-wrapper').style.transform = "translateY(-3.5rem) scaleY(1)"
}
function closeFilterbox(){
    document.querySelector('.filter-wrapper').style.transform = "translateY(-3.5rem) scaleY(0)"
}

//storage
let store = [];     // <<<<<<< filter list storage

//job list bar
window.addEventListener('click', (e)=>{
    const joblistingWrapperAll = document.querySelectorAll('.job-listing-wrapper');
    const jobTagsGroup = document.querySelectorAll('.job-tag-box');
    const filterTag = e.target.closest('.filter-list-box');
    const tagText = e.target.textContent.trim()
    //push tag to  <<<<< store >>>>>  which is filter list
    if(e.target.closest('.job-tag')){
        openFilterbox();
        if(store.indexOf(tagText) == -1){
            createFilterBox(tagText)                  
            store.push(tagText)
        }else {
            removeFilterBox(tagText);                  
            const storeIndex = store.indexOf(tagText)  
            store.splice(storeIndex,1)
        }
    }
    //tag removal for filter box
    if(filterTag){
        removeFilterBox(filterTag.childNodes[1].textContent);
        const storeIndex = store.indexOf(filterTag.childNodes[1].textContent)
        store.splice(storeIndex,1)
    }
    ////////////////////////////////////////////////////////////////
                //the logic of this method need to be improved 
    ////////////////////////////////////////////////////////////////
    
    //collect all job-tag-boxes << each of them has list of tags
    jobTagsGroup.forEach(index=>{   
        const jobListingWrapper = index.closest('.job-listing-wrapper')
        jobListingWrapper.style.display = "none";

        //convert tags list into readable string arrays
        const tagArrays = index.textContent.replace(/\s+/g, ' ').trim().split(' ') 
        // store can be found on the first 'if condition' inside eventlistener
        store.forEach(each=>{       
            const checkValue = tagArrays.includes(each);
            if(checkValue){
                if(store.length <= tagArrays.length - store.length){      // <<<<<<<<<<< this logic is definitely deficient
                    jobListingWrapper.classList.add('marked')
                };
            }else if(jobListingWrapper.classList.contains('marked')){
                jobListingWrapper.classList.remove('marked')
            }
        })
        if(jobListingWrapper.classList.contains('marked')){
            jobListingWrapper.style.display = "flex";
        }
    })
    ////////////////////////////////////////////////////////////////
                //above method ends here
    ////////////////////////////////////////////////////////////////

    //clearAll button on filter bar
    if(e.target.closest('.filter-wrapper')){
        const filterLists = document.querySelectorAll('.filter-list-box');
        if(e.target.textContent == 'Clear'){
            filterLists.forEach(index => index.remove());
            store = [];
            joblistingWrapperAll.forEach(index=> index.classList.remove('marked'))
            joblistingWrapperAll.forEach(index=> index.style.display = 'flex')
        }
    }
    //check if filter box is empty;
    if(store.length == 0){
        joblistingWrapperAll.forEach(index=> index.classList.remove('marked'))
        joblistingWrapperAll.forEach(index=> index.style.display = 'flex')
        closeFilterbox();
    }
    if(e.target.classList[0] == 'color-switcher'){        
        if(document.querySelector('body').classList == 'light'){
            document.querySelector('body').classList.remove('light')
            document.querySelector('body').classList.add('dark')
            document.querySelector('.head-container').style.backgroundImage  = "url('images/bg-header-desktop2.svg')"
        } else {
            document.querySelector('body').classList.remove('dark')
            document.querySelector('body').classList.add('light')
            document.querySelector('.head-container').style.backgroundImage  = "url('images/bg-header-desktop.svg')"
        }
    }
})

