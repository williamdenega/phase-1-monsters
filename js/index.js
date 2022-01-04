let count = 1

document.addEventListener('DOMContentLoaded',init)


function init(){
    console.log('hello')
    addMonster()
    fetchMonsters()
    handlePages()

}
function handlePages(){
    document.querySelector("#forward").addEventListener('click', function(){
        
        count = count + 1
        fetchMonsters()
    })
    document.querySelector('#back').addEventListener('click', function(){
        if (count <= 1){
            alert('Cant go back any further')
        }else{
            count = count - 1
            fetchMonsters() 

        }
      

    })

}


function addMonster(){
    let createMonster = document.createElement("form")
    createMonster.id = "monster-form"
    createMonster.innerHTML = 
    `
    <input id="name" placeholder="name..." />
    <input id="age" type="number" placeholder="age..."/>
    <input id="description" placeholder="description...">
    <input type='submit' name='submit' value="create">
    `
    document.querySelector('#create-monster').appendChild(createMonster)
    document.querySelector('#monster-form').addEventListener('submit', handleSubmit)

}

function fetchMonsters(){
    document.querySelector('#monster-container').innerHTML= ''
    fetch(`http://localhost:3000/monsters/?_limit=20&_page=${count}`)
    .then(res => res.json())
    .then(arry => arry.forEach(monster => displayMonster(monster)))
}


function displayMonster(monster){
    let card = document.createElement('div')
    card.className = 'cards'
    card.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}
    <p> <span style="font-weight:normal">Bio: ${monster.description} </span></p>
    
    `
    document.querySelector('#monster-container').appendChild(card)
}


function handleSubmit(e){
    e.preventDefault()
    let monsterObj = {
        name:e.target.name.value,
        age: e.target.age.value,
        description:e.target.description.value
    }
    //displayMonster(monsterObj)
    sendMonster(monsterObj)

    e.target.reset()



    }

function sendMonster(monster){
    fetch('http://localhost:3000/monsters',{
        method: 'POST',
        headers:{
            'Content-Type': "application/json",
            Accept:'application/json'
        },
        body:JSON.stringify(monster)
    })
        .then(res => res.json())
        .then(mnstr => displayMonster(mnstr))


}