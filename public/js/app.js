const frm=document.querySelector('form')
const loc=frm.querySelector('input')
const msg1=document.querySelector('#message-1')
const msg2=document.querySelector('#message-2')
const imgTag=document.querySelector('#weatherIcon')

frm.addEventListener('submit',(e)=>{
    e.preventDefault()
    msg1.textContent='Loading Weather...'
    msg2.textContent=''


    const url='/weather?address='+loc.value
    if(loc.value===''){
        msg1.textContent=''
        return msg2.textContent='You must enter a location!'
    }
    loc.value=''
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.err){
            msg1.textContent=''
            
            return msg2.textContent=data.err
        }
        msg1.textContent=data.Location
        msg2.textContent=data.forecast
        imgTag.setAttribute('src',data.icon)
    })
})

}) 
