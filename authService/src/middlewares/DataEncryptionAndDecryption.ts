import express from "express";
import crypto, { createDecipheriv, randomBytes } from 'crypto';
import fs from "fs";
import moment from "moment";
import nconf from 'nconf';

export const encrypt = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const environment = nconf.get("env")
    const body = req.body
    const userData = {
        uid: body.email,
        bid: body._id,
        createdAt: moment().unix(),
        expiryAt: moment().unix() + 28800
    }
    const iv = fs.readFileSync(`encryptedkeys/iv${environment}`);
    const key = fs.readFileSync(`encryptedkeys/key${environment}`);
    let cipher = crypto.createCipheriv("aes256", key, iv);
    let encrypted = cipher.update(JSON.stringify(userData), 'utf8', 'hex') + cipher.final('hex');
    req.body = encrypted
    next()
}

export const decrypt = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const hash = req.body.hash
    const environment = nconf.get("env")
    const iv = fs.readFileSync(`encryptedkeys/iv${environment}`)
    const key = fs.readFileSync(`encryptedkeys/key${environment}`)
    let decipher = createDecipheriv('aes256', key, iv);
    let decryptedMessage: any
    try {
        decryptedMessage = decipher.update(hash, 'hex', 'utf-8') + decipher.final('utf8');
    } catch (error) {
        res.sendStatus(401)
    }
    let cTimestamp = JSON.parse(decryptedMessage)
    cTimestamp = cTimestamp.createdAt + 30 * 24 * 60 * 60 //hours or minutes in secoonds
    const exTimestamp = moment().unix()
    if (cTimestamp < exTimestamp) {
        res.sendStatus(401)
    } else {
        req.body.decryptedmessage = decryptedMessage
        next()
    }
}

