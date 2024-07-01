//part 1
// grab the elements
const submitForm = document.getElementById('github-form');
const submitButton= submitForm.children[1];
const submitInputTxt= submitForm.children[0].textContent;
const userContainer= document.getElementById('github-container');
const userList= userContainer.querySelector('#user-list');
const repoList= userContainer.querySelector('#repos-list');

//Event listeners
submitButton.addEventListener('click', getUserNames)




//rendering functions
function renderUserName(user){
    
    //grabbing form elements

    const userName= document.createElement('li');  //creating and adding listeners li elements
    userName.addEventListener('click', getRepoList); // part 2

    userName.textContent = user.login; //giving the value to the name li
    const userAvatar= document.createElement('img');
    userAvatar.src= user.avatar_url;
    userAvatar.width= 40;    
    const profileUrl= document.createElement('a');
    profileUrl.textContent= user.html_url;
    profileUrl.href= user.html_url;    
    const listDiv= document.createElement('ul');
    listDiv.id= "users"; 


    listDiv.appendChild(userName);
    listDiv.appendChild(userAvatar);
    listDiv.appendChild(profileUrl);
    
    userList.appendChild(listDiv);  //appending to dom
        
}


//event handlers
function getUserNames(event){
    event.preventDefault();

    const inputName = document.getElementById('search').value;
    console.log(event.target.parentNode.children[0].value);

    fetchingNames(inputName);
    
}


//fetching requests
 function fetchingNames(name){
    console.log(name)
    fetch(`https://api.github.com/search/users?q=${name}`,{
       
        headers:{
            Accept: "application/vnd.github.v3+json" 
        }

    })
 
    .then((res)=> {return res.json()})
    .then((data)=> {
        data.items.forEach((user)=>{
            renderUserName(user) 
        })  
    })
}



//part 2
//grabbing repo elements 



//event listener function
function getRepoList(event){
    event.preventDefault();

    let repoUser = event.target.textContent;
    console.log('click123')
    console.log(repoUser)
    fetchingRepos(repoUser);
    

}


//fetch functions
function fetchingRepos(name){
    fetch(`https://api.github.com/users/${name}/repos`,{
       
        headers:{
            Accept: "application/vnd.github.v3+json" 
        }

    })
 
    .then((res)=> {return res.json()})
    .then((data)=> {
        console.log(data)
        const inputName = document.getElementById('search').value;
        const listName= document.createElement('h3');
        listName.textContent= inputName;
        repoList.appendChild(listName);
        data.forEach((repo)=>{
            renderRepoList(repo);
        })
        /* for(const items in data){
            } 
           for(const item in data){
                const listName=document.createElement('h3');
                const repoTitle= document.createElement('li');  //creating and adding listeners li elements
                    
                listName.textContent= name;
                repoTitle.textContent = data.name; //giving the value to the name li
                
                repoList.appendChild(listName);
                repoList.appendChild(repoTitle);
        
            }
        
        //})*/        
        
    })  
    
}

//render function
function renderRepoList(repo){
    
    
    
    const repoName= document.createElement('li');  //creating and adding listeners li elements

    

    repoName.textContent = repo.name; //giving the value to the name li

    
    repoList.appendChild(repoName);
    console.log(repoList)
}

