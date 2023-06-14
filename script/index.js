function main() {
    const showcase = document.querySelector('#showcase')
    const media = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvTNRxAKdj1QyM_mpJdf0fUxxrvimMB-ADAQ", 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx-rKfA5hRAz7OznF1Z8flH5MjjC-J-3T4EA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOcnk1WCwGDFJfYbS-lEjm3dieSiZ_3vpTQ&usqp=CAU']

    function createEntry(obj) {
        const name = obj.name
        const height = obj.height
        const gender = obj.gender
        let character = document.createElement('div')
        let trigger = document.createElement('button')
        trigger.classList += 'triggers'
        let characterDetails = document.createElement('div')
        characterDetails.classList += 'cDetails'
        characterDetails.style.display = 'none'
        trigger.addEventListener('click', function(e){
            console.log(e)
            showDetail(e.target)
        })
        var cImage = document.createElement('img')
        if (gender == 'male') {
            cImage.src = media[0]
        } else if (gender == 'female') {
            cImage.src = media[1]
        } else {
            cImage.src = media[2]
        }
        trigger.append(name)
        character.append(trigger)
        character.prepend(cImage)
        let cName, cGender, cHeight;
        cName = document.createElement('p')
        cGender = document.createElement('p')
        cHeight = document.createElement('p')
        cName.append(`Name: ${name}`)
        cGender.append(`Gender: ${gender}`)
        cHeight.append(`Height: ${height}cm`)
        characterDetails.style.padding = '10px'
        characterDetails.style.color = '#fff'
        characterDetails.append(cName)
        characterDetails.append(cGender)
        characterDetails.append(cHeight)
        character.append(characterDetails)
        showcase.append(character)
    }

    async function renderCharacters() {
        let getApi = new Request('https://swapi.dev/api/people/')
        let response = await fetch(getApi)
        let data = await response.json()
        let characterObjects = data.results
        characterObjects.forEach(element => {

            createEntry(element)
            
        })
        console.log(data.results)
        while (data.next) {
            getApi = new Request(data.next)
            response = await fetch(getApi)
            data = await response.json()
            characterObjects = data.results
            characterObjects.forEach(element => {
                createEntry(element)
            })
            console.log(data.results)
        }

    }
    renderCharacters()
    function showDetail(hit){
        let btn = document.querySelectorAll('.triggers')
        let details = document.querySelectorAll('.cDetails')
        details.forEach(element => element.style.display = 'none')
        for(i = 0; i < btn.length; i++){
            if(hit == btn[i]){
                if(details[i].classList.contains('open')){
                    details[i].classList.remove('open')
                    details.forEach(element => element.classList.contains('open')? element.classList.remove('open'): null)
                    details.forEach(element => element.style.display = 'none')
                    details[i].style.display = 'none'
                
                }else{
                    details.forEach(element => element.classList.contains('open')? element.classList.remove('open'): null)
                    details[i].style.display = 'block'
                    details[i].classList.add('open')
                }
                
            }

        }
    }

}


main();
module.exports = { main }
