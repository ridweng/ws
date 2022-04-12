const fs = require('fs')

exports.ws =  (ws ,req) => {
    try{
        const mess = `connection from: ${req.params.id} in ${req._remoteAddress} at ${req._startTime}.\n`
        const initialMess =`Started ${mess}`
        const file = './access.log'
        console.log(initialMess)
        let writer = fs.createWriteStream(file, { flags: 'a' }) 
        writer.write(initialMess);

        ws.send('Connected at: ' + new Date())
        
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            ws.send('message from client at: ' + new Date());
        });
    
        ws.on('close', () => {
            const finalMess = `Stopped ${mess}`
            let writer = fs.createWriteStream(file, { flags: 'a' }) 
            writer.write(finalMess);
            console.log(finalMess)
        })
    }catch(err){
        console.log(err)
    }

}