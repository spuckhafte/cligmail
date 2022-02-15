#!/usr/bin/env node
const nodemailer = require('nodemailer');
const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log('\x1b[33mPermission required (if not): \x1b[4m\x1b[36mhttps://myaccount.google.com/lesssecureapps\x1b[0m')
reader.question("\x1b[33muser gmail:\x1b[0m ", gmail => {
    reader.question("\x1b[33mpassword:\x1b[0m ", password => {
        reader.question("\x1b[33mto:\x1b[0m ", to => {
            reader.question("\x1b[33msubject:\x1b[0m ", sub => {
                reader.question("\x1b[33mmessage:\x1b[0m ", msg => {
                    sendMail(gmail, password, to, sub, msg)
                    reader.close()
                })
            })
        })
    })
})


function sendMail(user, pass, to, sub, msg) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: user,
            pass: pass
        }
    })
    const email = {
        from: user,
        to: to,
        subject: sub,
        text: msg
    }
    transporter.sendMail(email, (err, info) => {
        if (err) {
            console.log('\x1b[31m' + err + '\x1b[0m')
        } else {
            console.log(`\x1b[32mMail sent: \x1b[35m${user} \x1b[33m-> \x1b[35m${to}\x1b[0m`)
        }
    })
}

